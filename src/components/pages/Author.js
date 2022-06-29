import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ColumnNewRedux from '../components/ColumnNewRedux';
import CarouselNewRedux from '../components/CarouselNewRedux_autor';
import Footer from '../components/footer';
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/thunks';
import * as selectors from '../../store/selectors';
import { getUser } from "../../store/actions/thunks";
import UserImage from "../components/UserImage";

const Author = () => {
  const [openMenu, setOpenMenu] = useState(true);

  const { t } = useTranslation();
  const urlParams = useParams();

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    document.getElementById("Mainbtn").classList.add("active");
  };

  const dispatch = useDispatch();
  const userState = useSelector(selectors.userState);
  const user = userState.data ? userState.data : null;

  useEffect(() => {
    dispatch(getUser(urlParams.id));
  }, [dispatch, urlParams.id]);

  return (
    <div>
      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'/img/background/news1.png'})`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12 text-center'>
              <h2>{user && user.username}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='container d_coll no-top no-bottom'>
        <div className='row'>
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="d_profile_img">
                {user && <UserImage address={user.address} avatar={user.avatar} />}
                  <i className="fa fa-check"></i>
                </div>
                <div className="profile_name">
                <h4>
                      <span className="profile_username">{user && user.username}</span>
                      {/* <span id="wallet" className="profile_wallet">{user && user.address}</span>
                      <button id="btn_copy" title="Copy Text">{t('action.copy')}</button> */}
                    </h4>
                  </div>
                </div>
              </div>
              {/* <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">500 {t('followers')}</div>
                </div>
                <div className="de-flex-col">
                  <span className="btn-main">{t('action.follow')}</span>
                </div>
              </div> */}
          </div>
        </div>
      </section>
  
      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>{t('published')}</span></li>
                <li id='Mainbtn1' className='dropdownSelect one'><span>Colecciones:</span></li>


              </ul>
            </div>
          </div>
        </div>
        <div id='zero1' className='onStep fadeIn'>
          {user &&
            <ColumnNewRedux
              showLoadMore={false}
              notFound
              dispatchAction={actions.fetchUserNfts(user.id, 'owned')}
              selector={selectors.nftUserItems}
            />
          }
        </div>
      </section>

            {/* NFTS RANDOM */}
            {/* <div class="nft__black">
            <section className='nft__item m-0'>
            
        <div className='container'>
          
            
              <h2 className='style-2'>También te puede interesar:</h2>
            
          
              <div className='col-lg-12'>
          
          <CarouselNewRedux/>
        </div>
          
        </div>
      </section>
      </div> */}

        {/* Carrousel de NFTS RANDOM */}
    <div class="nft__black">
      <section className='container no-bottom no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="spacer-single"></div>
              <h3 className='style-2'>También te puede interesar:</h3>
              {/* <div className="small-border"></div> */}
          </div>
          <div className='col-lg-12 px-0'>
            <CarouselNewRedux/>
          </div>
        </div>
      </section>
   </div>
{/* HASTA AQUI NFTS RANDOM */}

      <Footer />
    </div>
  );
}
export default Author;