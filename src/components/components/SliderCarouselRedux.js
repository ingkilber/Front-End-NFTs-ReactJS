import React, { memo, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from './constants';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import { fetchNftShowcase } from "../../store/actions/thunks";
import { useNavigate } from 'react-router-dom';
import NftPreview from "./NftPreview";

const SliderCarouselRedux = () => {

  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftShowcaseState);
  const nfts = nftsState.data ? nftsState.data : [];
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchNftShowcase());
  }, [dispatch]);

  return (
    <div className='nft-big'>
      <Slider {...settings}>
      {nfts && nfts.map((nft, index) => (
        <div onClick={() => navigate(`/Galeria/${nft.slug}`)} className='itm' index={index+1} key={index}>
          <div className="nft_pic">                            
            <span>
              <span className="nft_pic_info">
                <span className="nft_pic_title">{nft.title}</span>
                <span className="nft_pic_by">{nft.user.username}</span>
              </span>
            </span>
            <div className="nft_pic_wrap">
              <NftPreview preview={nft.preview} />
            </div>
          </div>
        </div>
      ))}
      </Slider>
    </div>
  );
}

export default memo(SliderCarouselRedux);
