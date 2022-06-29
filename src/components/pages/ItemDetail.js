import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import CarouselNewRedux from '../components/CarouselNewRedux_autor';

import NftPreview from "../components/NftPreview";
import Checkout from "../components/Checkout";
import Loading from "../components/Loading";
import BidItem from "../components/BidItem";
import Footer from '../components/footer';
import Clock from "../components/Clock";
import Sell from "../components/Sell";
import Bid from "../components/Bid";

import { fetchNftDetail } from "../../store/actions/thunks";
import * as selectors from '../../store/selectors';

import { getUser } from '../../core/user';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

const ItemDetail = () => {
  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);
  const [openBid, setOpenBid] = useState(false);
  const [user, setUser] = useState({})

  const urlParams = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nftDetailState = useSelector(selectors.nftDetailState);
  const nft = nftDetailState.data ? nftDetailState.data : null;

  window.addEventListener('language:es', (e) => {
    setEnglish(false)
  })
  window.addEventListener('language:en', (e) => {
    setEnglish(true)
  })

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const openExplorer = () => {
    window.open(`${process.env.REACT_APP_WEB3_EXPLORER}/tx/${nft.transactionHash}`, '_blank')
  }

  useEffect(() => {
    async function fetchUser() {
      const jwtUser = await getUser()
      setUser(jwtUser)
    }
    fetchUser()

    dispatch(fetchNftDetail(urlParams.id));
  }, [dispatch, urlParams.id]);

  const Auction = () => {
    return nft.deadline &&
      <>
        {t('auctionEnds')}
        <div className="de_countdown">
          <Clock deadline={nft.deadline} />
        </div>
      </>
  }

  /**
   * Renderiza el boton correspondiente dependiendo de la situacion actual del NFT
   * @returns ActionButton
   */
  const ActionButton = () => {
    if (user.userId === nft.user.id) {
      return <button className='btn-main lead mb-5' onClick={() => setOpenSell(true)}>{t('action.sell')}</button>
    } else {
      if (nft.statusId===3) {
        return <button className='btn-main lead mb-5' onClick={() => setOpenBid(true)}>{t('action.bid')}</button>
      } else if (nft.statusId===2) {
        return <button className='btn-main lead mb-5' onClick={() => setOpenCheckout(true)}>{t('action.buy')}</button>
      } else {
        return <div></div>
      }
    }
  }

  return (
    <div>
      <GlobalStyles />
      {nftDetailState.loading ?
        <Loading />
      :
      nft ?
      <section className='container'>
        <div className='row mt-md-5 pt-md-4'>
          <div className="col-md-6 text-center">
            <NftPreview preview={nft.image} play />
            {nft && nft.transactionHash &&
              <div className="d-flex justify-content-center">
                <h4 className="mt-1">
                  <span id="wallet" className="profile_wallet mt-1">{nft && nft.transactionHash}</span>
                  <button id="btn_copy" style={{position:'inherit'}} title="View on Explorer" onClick={() => openExplorer()}>{t('action.view')}</button>
                </h4>
              </div>
            }
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <Auction />
              <h2>{english ? nft.title_en : nft.title_es}</h2>
              <div className="item_info_counts">
                {nft.categories.map(category => {
                  return (
                    <div className="item_info_type" key={category.id}><i className="fa fa-image"></i>{category.name}</div>
                  )
                })}
                {false && <div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div>}
                <div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div>
              </div>
              <p>{english ? nft.description_en : nft.description_es}</p>
              <ActionButton />

              <h6>{t('creator')}</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <span>
                    <img className="lazy" src={nft.author && nft.author.avatar} alt={nft.author && nft.author.username} />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="author_list_info">
                  <span>{nft.author && nft.author.username}</span>
                </div>
              </div>

              <div className="spacer-40"></div>

              <div className="de_tab">
                {!nft.statusId!==3 && nft.bids && <h4 className="mt-4">{t('noBids')}</h4>}
                <ul className="de_nav">
                  {nft.bids &&
                    <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>{t('bids')}</span></li>
                  }
                  {nft.history &&
                    <li id='Mainbtn1' className=''><span onClick={handleBtnClick1}>{t('history')}</span></li>
                  }
                </ul>

                <div className="de_tab_content">
                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      {nft.bids && nft.bids.map((bid, index) => (
                        <BidItem bid={bid} index={index} />
                      ))}
                    </div>
                  )}

                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      {nft.history && nft.history.map((bid, index) => (
                        <BidItem bid={bid} index={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      :
      <section className='container'>
        <div className='text-center'>
          <img src="/logo192.png" alt="Trick Logo" />
          <h2>{t('notFound')}</h2>
        </div>
      </section>
      }

    {/* Carrousel de NFTS RANDOM */}
    <div className="nft__black">
      <section className='container no-bottom no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="spacer-single"></div>
              <h3 className='style-2'>También te puede interesar:</h3>
          </div>
          <div className='col-lg-12 px-0'>
            <CarouselNewRedux/>
          </div>
        </div>
      </section>
   </div>
{/* HASTA AQUI NFTS RANDOM */}


      <Footer />

      <Checkout nft={nft} show={openCheckout} setShow={(value) => setOpenCheckout(value)} />
      <Bid nft={nft} show={openBid} setShow={(value) => setOpenBid(value)} />
      <Sell nft={nft} show={openSell} setShow={(value) => setOpenSell(value)} />
    </div>
  );
}

export default memo(ItemDetail);
