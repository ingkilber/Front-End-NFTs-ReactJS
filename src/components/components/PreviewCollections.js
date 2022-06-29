import React from 'react'

export default function PreviewCollections() {
  return (
    <div className="nft__item m-0">
      <div className="nft_coll_pp">
        <span>
          <img className="lazy img-fluid" src="/img/logo-3.png" alt="" />
          <i className="fa fa-check"></i>
        </span>
      </div>
      <div className="nft__item_wrap">
        <span>
          <img src="/img/logo-trick.png" id="get_file_2" className="lazy nft__item_preview" alt="" />
        </span>
      </div>
      <div className="nft">
        <h4 className="text-center">Collection Trick</h4>
      </div>
    </div>
  )
}
