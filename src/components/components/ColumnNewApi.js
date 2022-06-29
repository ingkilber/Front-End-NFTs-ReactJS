import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

import { shuffleArray } from '../../store/utils';

import { getUser } from '../../core/user';

import NftLoading from './NftLoading';
import Paginator from './Paginator';
import NftCard from './NftCard';

//react functional component
const ColumnNewApi = ({
  showLoadMore = true,
  shuffle = false,
  loading = true,
  notFound = false,
  nftsApi = null
}) => {

  const { t } = useTranslation();
  const nfts = nftsApi ? shuffle ? shuffleArray(nftsApi) : nftsApi : [];

  const [nftsPaginated, setNftsPaginated] = useState([])
  const [height, setHeight] = useState(0);
  const [user, setUser] = useState({})

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const jwtUser = await getUser()
      setUser(jwtUser)
    }
    fetchUser()
  }, []);

  return (
    <div className='row'>
      <Paginator collection={nfts} setCollectionPaginated={setNftsPaginated} collectionPaginated={nftsPaginated} />
      <div className="spacer-single"></div>
      {loading && nfts.length === 0 && <NftLoading />}
      {nftsPaginated && nftsPaginated.map((nft, index) => (
        <NftCard nft={nft} key={index} onImgLoad={onImgLoad} user={user} />
      ))}
      {showLoadMore && nfts.length > 4 &&
        <div className='col-lg-12'>
          <div className="spacer-single"></div>
          <span onClick={()=> window.open("/Explore", "_self")} className="btn-main lead m-auto">{t('action.seeMore')}</span>
        </div>
      }

      <div className="spacer-single"></div>
      <Paginator collection={nfts} setCollectionPaginated={setNftsPaginated} />
      <div className="spacer-single"></div>
    </div>
  );
};

export default memo(ColumnNewApi);
