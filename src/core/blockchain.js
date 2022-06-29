import WalletConnectProvider from "@walletconnect/web3-provider";
import { Biconomy } from "@biconomy/mexa";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';

import TrickNFT from '../contracts/TrickNFT.json'
import TrickCoin from '../contracts/TrickCoin.json'
import NFTMarket from '../contracts/NFTMarket.json'

const configuredTokens = [
  {
    type: 'ERC20',
    options: {
      address: process.env.REACT_APP_TOKEN_CONTRACT,
      symbol: 'TRCK',
      decimals: 4
    }
  }
]

var provider = null;
var biconomy = null;

const getProvider = async () => {
  if (provider === null) {
    try {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                137: "https://rpc-mumbai.maticvigil.com/",
              },
              network: "matic",
            }
          }
        }
      });

      const web3Provider = await web3Modal.connect()

      web3Provider.on("accountsChanged", (accounts) => {
        console.log(accounts)
      })

      web3Provider.on("network", (event) => {
        console.log(event)
      })

      //console.log("WEB3 PROVIDER", web3Provider)
      provider = new ethers.providers.Web3Provider(web3Provider)

      biconomy = new Biconomy(web3Provider, {
        apiKey: process.env.REACT_APP_BICONOMY_API
      })

      //console.log("BICONOMY", biconomy);
    } catch (error) {
      console.log("Error al crear el Web3Provider", error)
    }
  }
  return provider
}

export const transfer = async (to, amount) => {
  const userAddress = localStorage.getItem('account');

  const response = await getContract("coin", userAddress)
  const { data } = await response.contract.populateTransaction.transfer(to, amount)

  const tx = await sendRelayerSignedTransaction(userAddress, response.address, data)
  return tx
}

export const mintNft = async () => {
  const userAddress = localStorage.getItem('account')

  const response = getContract("nft", userAddress)
  const { data } = await response.contract.populateTransaction.mint(1)

  const tx = await sendRelayerSignedTransaction(userAddress, response.address, data)
  return tx
}

export const getContract = (name, userAddress) => {
  var response = {};
  switch(name) {
    case "nft":
      response = {
        contract: new ethers.Contract(process.env.REACT_APP_NFT_CONTRACT, TrickNFT.abi, biconomy.getSignerByAddress(userAddress)),
        address: process.env.REACT_APP_NFT_CONTRACT
      }
      break;
    case "coin":
      response = {
        contract: new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT, TrickCoin.abi, biconomy.getSignerByAddress(userAddress)),
        address: process.env.REACT_APP_TOKEN_CONTRACT
      }
      break;
    case "market":
      response = {
        contract: new ethers.Contract(process.env.REACT_APP_NFT_MARKET_CONTRACT, NFTMarket.abi, biconomy.getSignerByAddress(userAddress)),
        address: process.env.REACT_APP_NFT_MARKET_CONTRACT
      }
      break;
    default:
      break;
  }
  return response;
}

export const sendRelayerSignedTransaction = async (from, to, data) => {
  if (biconomy.status === biconomy.READY) {
    const provider = biconomy.getEthersProvider();

    const gasLimit = await provider.estimateGas({
      to,
      from,
      data
    });
    console.log("Gas limit: ", gasLimit);
  
    const txParams = {data, to, from, gasLimit: gasLimit*2, signatureType: "EIP712_SIGN"};
    const tx = await provider.send("eth_sendTransaction", [txParams]);
    console.log("Transaction hash: ", tx);
    return await provider.waitForTransaction(tx)
  } else {
    console.log("Biconomy not ready")
  }
}

export const signMessage = async (message) => {
  const provider = await getProvider()
  return await provider.getSigner().signMessage(message)
}

export const getTokenIds = (transaction, quantity) => {
  try {
    const contractInterface = new ethers.utils.Interface(TrickNFT.abi)
    var tokenIds = []
    for (var i = 0; i < quantity; i++) {
      const log = transaction.logs[i]
      const parsedLog = contractInterface.parseLog({topics: log.topics, data: log.data})
      tokenIds.push(parsedLog.args['id'].toString())
    }
    return tokenIds 
  } catch (error) {
    console.log(transaction.logs)
    throw "Error al obtener el id de la transaccion: " + error.message
  }
}

export const getAccount = async () => {
  const provider = await getProvider()
  const isWalletConnect = provider.provider instanceof WalletConnectProvider
  var address
  if (isWalletConnect) {
    address = provider.provider.accounts
  } else {
    address = await provider.send("eth_requestAccounts", []);
  }

  const strAddress = String(address)
  const addressFirstPart = strAddress.substring(0, 5)
  const addressLastPart = strAddress.substring(strAddress.length - 6)
  const addressMin = `${addressFirstPart}...${addressLastPart}`

  localStorage.setItem('account', address[0])
  localStorage.setItem('accountMin', addressMin)
  if (localStorage.getItem('account') !== address[0]) {
    localStorage.removeItem('token')
  }

  return {
    address: address[0],
    addressMin,
    handleGetData: !isWalletConnect
  }
}

export const setNetwork = async () => {
  const provider = await getProvider()
  try {
    await provider.send('wallet_switchEthereumChain', [{ chainId: process.env.REACT_APP_WEB3_CHAIN }]);
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await provider.send('wallet_addEthereumChain', [{
          chainId: process.env.REACT_APP_WEB3_CHAIN,
          chainName: process.env.REACT_APP_WEB3_NAME,
          rpcUrls: [process.env.REACT_APP_WEB3_RPC],
          blockExplorerUrls: [process.env.REACT_APP_WEB3_EXPLORER],
          nativeCurrency: {
            name: "Polygon",
            symbol: process.env.REACT_APP_CURRENCY,
            decimals: 18
          }
        }]);
      } catch (addError) {

      }
    }
  }
}

export const setTokens = async () => {
  configuredTokens.forEach(params => {
    window.ethereum.request({method: 'wallet_watchAsset', params})
  })
}

export default getAccount