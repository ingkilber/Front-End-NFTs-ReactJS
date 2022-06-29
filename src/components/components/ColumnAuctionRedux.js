import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useTranslation } from "react-i18next";

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import { getUser } from '../../core/user';
import NftCard from './NftCard';

const GlobalStyles = createGlobalStyle`
  .de_countdown{
    position: relative;
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.3);
    top: 0;
    left: 0;
    margin-bottom: 20px;
    div{
      display: flex;
      justify-content: center;
    }
    .Clock-days, .Clock-hours, .Clock-minutes{
      margin-right: 10px;
    }
  }
`;


const ColumnAuction = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nfts = useSelector(selectors.auctionedNfts);
  
  const [height, setHeight] = useState(0);
  const [user, setUser] = useState({})

  const onImgLoad = ({target:img}) => {
    let currentHeight = height;
    if(currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  }
  
  useEffect(() => {
    async function fetchUser() {
      const jwtUser = await getUser()
      setUser(jwtUser)
    }
    fetchUser()
      
    dispatch(actions.fetchNftsBreakdown());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(actions.fetchNftsBreakdown());
  }
    
  return (
    <div className='row'>
      <GlobalStyles />
      {nfts && nfts.map( (nft, index) => (
        <NftCard nft={nft} key={index} onImgLoad={onImgLoad} height={height} user={user} clockTop={false} />
      ))}
      {nfts.length <= 20 &&
        <div className='col-lg-12'>
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">{t('action.seeMore')}</span>
        </div>
      }
    </div>              
    );
}

export default memo(ColumnAuction)