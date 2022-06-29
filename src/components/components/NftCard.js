import React, { useState, memo } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import Clock from "./Clock";
import NftPreview from './NftPreview';
import UserImage from './UserImage';
import LikeButton from './LikeButton';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({ nft, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', clockTop = true, height, onImgLoad, user }) => {

  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const currency = process.env.REACT_APP_CURRENCY
  const price = nft.price + " " + currency
  const navigate = useNavigate()
  const { t } = useTranslation();

  window.addEventListener('language:es', (e) => {
    setEnglish(false)
  })
  window.addEventListener('language:en', (e) => {
    setEnglish(true)
  })

  const navigateButtonText = () => {
    var text = t('action.view');
    if (nft.userId !== user.userId) {
      if (nft.statusId === 3) {
        text = t('action.placeBid')
      } else if (nft.statusId === 2) {
        text = t('action.buy')
      }
    }
    return text;
  }

  return (
    <div className={className}>
      <div className="nft__item m-0">
        {nft.deadline && clockTop &&
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        }
        <div className="author_list_pp">
          <span onClick={() => navigate(`/Author/${nft.author.id}`)}>
            {nft.author && <UserImage imgClassName="lazy" avatar={nft.author.avatar} address={nft.author.address} />}
            <i className="fa fa-check"></i>
          </span>
        </div>
        <div className="nft__item_wrap" style={{ height }}>
          <Outer>
            <span onClick={() => navigate(`/Galeria/${nft.slug}`)}>
              <NftPreview preview={nft.preview} className="lazy nft__item_preview" />
            </span>
          </Outer>
        </div>
        {nft.deadline && !clockTop &&
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        }
        <div className="nft__item_info">
          <span onClick={() => navigate(`/Galeria/${nft.slug}`)}>
            <h4>{english ? nft.title_en : nft.title_es}</h4>
          </span>
          {nft.statusId === 4 ? (
            <div className="has_offers">
              <span className='through'>{nft.priceover}</span> {nft.price}
            </div>
          ) : (
            <div className="nft__item_price">
              {nft.statusId !== 1 && price}
              {nft.statusId === 3 &&
                <span>{nft.bid}</span>
              }
            </div>
          )
          }
          <div className="nft__item_action">
            <span onClick={() => navigate(`/Galeria/${nft.slug}`)}>{navigateButtonText()}</span>
          </div>
          <LikeButton
            nftId={nft.id}
            userLiked={nft.userLiked}
            likes={nft.likes}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);