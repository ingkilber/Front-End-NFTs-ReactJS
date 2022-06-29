import React, { useState, memo } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import NftPreview from './NftPreview';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const ProductCard = ({ product, height, onImgLoad }) => {

  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const price = Intl.NumberFormat('es-ES').format(product.price)
  const navigate = useNavigate()
  const { t } = useTranslation();

  window.addEventListener('language:es', (e) => {
    setEnglish(false)
  })
  window.addEventListener('language:en', (e) => {
    setEnglish(true)
  })

  return (
    <div className="product-card">
      <div className="nft__item m-0">
        {/*
        <div className="author_list_pp">
          <span onClick={() => navigate(`/Author/${nft.author.id}`)}>
            {nft.author && <UserImage imgClassName="lazy" avatar={nft.author.avatar} address={nft.author.address} />}
            <i className="fa fa-check"></i>
          </span>
        </div>
        */}
        <div className="nft__item_wrap" style={{ height }}>
          <Outer>
            <span>
              <NftPreview preview={product.image} className="lazy nft__item_preview" />
            </span>
          </Outer>
        </div>
        <div className="nft__item_info">
          <span onClick={() => navigate(`/ticket/${product.code}`)}>
            <h4>{english ? product.title_en : product.title_es}</h4>
          </span>
          <div className="nft__item_price">
            ${price}
          </div>
          <div className="nft__item_action mb-2">
            <span onClick={() => navigate(`/ticket/${product.code}`)}>{t('action.buy')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);