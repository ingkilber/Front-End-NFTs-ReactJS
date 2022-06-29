import React, { memo } from "react";
import { getContract, sendRelayerSignedTransaction } from '../../core/blockchain';
import { updateNft } from '../../core/api';
import { getUser } from '../../core/user';
import ActionModal from "./ActionModal";
import { useTranslation } from "react-i18next";

const Checkout = (props) => {

	const currency = process.env.REACT_APP_CURRENCY
	const { t } = useTranslation();

	const checkoutNft = async () => {
		const userAddress = localStorage.getItem('account')
		try {
			const response = getContract("market", userAddress)
			const { data } = await response.contract.populateTransaction.buyNft(props.nft.nftContract, props.nft.id)
			const tx = await sendRelayerSignedTransaction(userAddress, response.address, data)
			console.log(tx)

			const user = await getUser()
			updateNft(props.nft.id, 3, user.userId, null)
			props.setShow(false)
		} catch (error) {
			if (error.code === 4001) {
				props.setShow(false)
			} else {
				console.log("Error al comprar el NFT", error)
			}
		}
	}

	return (
		props.show &&
		<ActionModal
			nft={props.nft}
			action={t('action.buy')}
			buttonAction={checkoutNft}
			setShow={props.setShow}
			isValid
		>
			<div className='heading mt-3'>
				<h3>{t('price')}</h3>
				<div className='subtotal'>
					{props.nft.price} {currency}
				</div>
			</div>
		</ActionModal>
	);
};

export default memo(Checkout);
