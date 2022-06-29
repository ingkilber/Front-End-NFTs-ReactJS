import React, { memo, useState } from "react";
import { getContract, sendRelayerSignedTransaction } from '../../core/blockchain';
import { bidNft } from '../../core/api';
import ActionModal from "./ActionModal";
import { useTranslation } from "react-i18next";

const Bid = (props) => {

	const [price, setPrice] = useState('')
	const currency = process.env.REACT_APP_CURRENCY
	const { t } = useTranslation();

	const bidNftAction = async () => {
		const userAddress = localStorage.getItem('account')
		try {
			const response = getContract("market", userAddress)
			const { data } = await response.contract.populateTransaction.createBid(props.nft.nftContract, props.nft.id, price)
			const tx = await sendRelayerSignedTransaction(userAddress, response.address, data)
			console.log(tx)

			await bidNft(props.nft.id, price)
			props.setShow(false)
			document.location.reload()
		} catch (error) {
			if (error.code === 4001) {
				props.setShow(false)
			} else {
				console.log("Error al ofrecer a la subasta", error)
			}
		}
	}

	const isValid = () => {
		return price && price > 0
	}

	return (
		props.show &&
		<ActionModal
			nft={props.nft}
			action={t('action.bid')}
			buttonAction={bidNftAction}
			isValid={isValid()}
			setShow={props.setShow}
		>
			<div className='heading mt-3'>
				<h3>{t('action.bid')}</h3>
				<div className='subtotal'>
					<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
						<input type="number" className="form-control" style={{width:100,marginBottom:0,marginRight:10}} value={price} onChange={(event) => setPrice(event.target.value)} />
						{currency}
					</div>
				</div>
			</div>
		</ActionModal>
	);
};

export default memo(Bid);