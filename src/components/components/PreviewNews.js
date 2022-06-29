import React from 'react'

export default function PreviewItem() {
  return (
    <div className="nft__item m-0">
      <div className="nft__item_wrap">
        <span>
          <img src="/img/logo-trick.png" id="get_file_2" className="lazy nft__item_preview" alt="" />
        </span>
      </div>
      <div className="nft__item_info">
        <span>
          <h4>Noticias Trick</h4>
        </span>
        <div className="spacer-10"></div>
      </div>
    </div>
  )
}
