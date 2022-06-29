import React, { memo } from "react";
import { getNftMarketContract } from "../../core/blockchain";

const CartCheckout = () => {

	const pepeRinola = async () => {
		const nftMarket = await getNftMarketContract()
		try {
			const marketItems = await nftMarket.createMarketItem(process.env.REACT_APP_NFT_MARKET_CONTRACT, 5, 100)
			console.log(marketItems)
		} catch (error) {
			console.log("Error al obtener los items del Market", error)
		}
	}

	return (
		<div className='maincheckout'>
			<div className='heading'>
				<h3>Items</h3>
				<div className='subtotal'>
					Subtotal
				</div>
			</div>
			<div className='detailcheckout'>
				<div className='listcheckout'>
					<div className='thumb'>
						<img src="./img/items/big-1.jpg" className="img-fluid img-rounded mb-sm-30" alt="" />
					</div>
					<div className='description'>
						<h3>Pinky Ocean</h3>
						<p>Sed ut perspiciatis unde omnis iste natus error sit</p>
					</div>
				</div>
				<div className='price'>
					0.08 ETH
				</div>
			</div>
			<div className='heading mt-3'>
				<h3>Totals</h3>
				<div className='subtotal'>
					0.08 ETH
				</div>
			</div>
			<div className='agrement'>
				<input type="checkbox" id="checlist" name="checlist" value="Nft" />
				<label htmlFor="vehicle1"> By Checking this I Agree for Terms and Services</label>
			</div>
			<button className='btn-main lead mb-5' onClick={() => pepeRinola()}>Checkout</button>
		</div>
	);
};

export default memo(CartCheckout);