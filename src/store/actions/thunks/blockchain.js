import * as actions from '../../actions';
import Web3Modal from 'web3modal';

export const getConnection = () => async (dispatch) => {

  dispatch(actions.getBlockchainConnection.request(''));

  try {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect()
    dispatch(actions.getBlockchainConnection.success(connection));
  } catch (err) {
    dispatch(actions.getBlockchainConnection.failure(err));
  }
};
