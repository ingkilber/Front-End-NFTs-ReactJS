import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import { clearNfts, clearFilter } from '../../store/actions';
import NftCard from './NftCard';
import { shuffleArray } from '../../store/utils';
import { getUser } from '../../core/user';
import NftLoading from './NftLoading';
import { useTranslation } from "react-i18next";
import Paginator from './Paginator';

//react functional component
const ColumnNewRedux = ({
  showLoadMore = true,
  shuffle = false,
  dispatchAction = actions.fetchNftsBreakdown(),
  selector = selectors.nftItems,
  loading = true,
  notFound = false,
}) => {

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const nftItems = useSelector(selector);
  const nfts = nftItems ? shuffle ? shuffleArray(nftItems) : nftItems : [];

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
    dispatch(dispatchAction);
  }, [dispatch]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    }
  }, [dispatch]);

 {/* const loadMore = () => {
    dispatch(dispatchAction);
  } */}

  return (
    <div className='row'>
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
      <Paginator collection={nfts} setCollectionPaginated={setNftsPaginated} collectionPaginated={nftsPaginated} />
      <div className="spacer-single"></div>
    </div>
  );
};

export default memo(ColumnNewRedux);
