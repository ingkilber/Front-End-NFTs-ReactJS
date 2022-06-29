import React from 'react'
import Clock from './Clock'

export default function PreviewItem() {
  const currency = process.env.REACT_APP_CURRENCY
  return (
    <div className="nft__item m-0">
      <div className="de_countdown">
        <Clock deadline="December, 30, 2021" />
      </div>
      <div className="author_list_pp">
        <span>
          <img className="lazy" src="./img/logo-3.png" alt="" />
          <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="nft__item_wrap">
        <span>
          <img src="./logo512.png" id="get_file_2" className="lazy nft__item_preview" alt="" />
        </span>
      </div>
      <div className="nft__item_info">
        <span >
          <h4>Trick NFT</h4>
        </span>
        <div className="nft__item_price">
          0.08 {currency}<span>1/20</span>
        </div>
        <div className="nft__item_action">
          <span>Place a bid</span>
        </div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i><span>50</span>
        </div>
      </div>
    </div>
  )
}
