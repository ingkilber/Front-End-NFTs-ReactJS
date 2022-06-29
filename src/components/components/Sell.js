import React, { memo, useState } from "react";
import Select from 'react-select'
import { getContract, sendRelayerSignedTransaction } from '../../core/blockchain';
import { updateNft } from '../../core/api';
import { getUser } from '../../core/user';
import ActionModal from "./ActionModal";
import { useTranslation } from "react-i18next";

const Sell = (props) => {

	const [price, setPrice] = useState('')
	const [deadline, setDeadline] = useState('')
	const [statusId, setStatusId] = useState(2)
	const currency = process.env.REACT_APP_CURRENCY
	const { t } = useTranslation();

	const minDeadline = () => {
    const date = new Date()
    date.setHours(date.getHours() + 1, 0, 0, 0)
    return date.toISOString().substring(0, 19)
  }

	const operationTypeValues = [
		{value: 2, label: t('normal')},
		{value: 3, label: t('auction')}
	]

	const sellNft = async () => {
		const userAddress = localStorage.getItem('account')
		try {
			let transaction = null
			const response = getContract("market", userAddress)
			if (statusId === 2) {
				transaction = await response.contract.populateTransaction.createMarketItem(props.nft.nftContract, props.nft.id, price)
			} else if (statusId === 3) {
				transaction = await response.contract.populateTransaction.createAuction(props.nft.nftContract, props.nft.id, price, deadline)
			}
			const tx = await sendRelayerSignedTransaction(userAddress, response.address, transaction.data)
      console.log(tx)

			const user = await getUser()
			updateNft(props.nft.id, statusId, user.userId, price)
			props.setShow(false)
		} catch (error) {
			if (error.code === 4001) {
				props.setShow(false)
			} else {
				console.log("Error al vender el NFT", error)
			}
		}
	}

	const isValid = () => {
		var valid = true
		if (statusId === 3) {
			valid &= (new Date(deadline).toString() !== "Invalid Date")
		}
		return valid && (price > 0)
	}

	return (
		props.show &&
		<ActionModal
			nft={props.nft}
			action={t('action.sell')}
			buttonAction={sellNft}
			isValid={isValid()}
			setShow={props.setShow}
		>
			<div className='heading mt-3'>
				<h5>{t('operationType')}</h5>
				<div className='subtotal' style={{width:140}}>
					<Select
						defaultValue={operationTypeValues.at(0)}
						options={operationTypeValues}
						onChange={(selection) => setStatusId(selection.value)}
					/>
				</div>
			</div>
			<div className='heading mt-3'>
				<h3>{t('price')}</h3>
				<div className='subtotal'>
					<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
						<input type="number" className="form-control" style={{width:100,marginBottom:0,marginRight:10}} value={price} onChange={(event) => setPrice(event.target.value)} />
						{currency}
					</div>
				</div>
			</div>
			{statusId===3 &&
				<div className='heading mt-3'>
					<h5>{t('deadline')}</h5>
					<div className='subtotal'>
						<input id="deadline" type="datetime-local" className="form-control" min={minDeadline()} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
					</div>
				</div>
			}
		</ActionModal>
  )
}

export default memo(Sell);