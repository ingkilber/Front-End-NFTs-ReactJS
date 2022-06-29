import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import { getUser } from "../../store/actions/thunks";
import UserImage from "../components/UserImage";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

const Author = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);

  const { t } = useTranslation();
  const urlParams = useParams();

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };

  const dispatch = useDispatch();
  const userState = useSelector(selectors.userState);
  const user = userState.data ? userState.data : null;

  useEffect(() => {
    dispatch(getUser(urlParams.id));
  }, [dispatch, urlParams.id]);

  return (
    <div>
      <GlobalStyles />

      <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'/img/author_single/author_banner.jpg'})` }}>
        <div className='mainbreadcumb'>
        </div>
      </section>

      <section className='container no-bottom'>
        <div className='row'>
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  {user && <UserImage address={user.address} avatar={user.avatar} />}
                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      <span className="profile_username">{user && user.username}</span>
                      <span id="wallet" className="profile_wallet">{user && user.address}</span>
                      <button id="btn_copy" title="Copy Text">{t('action.copy')}</button>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">500 {t('followers')}</div>
                </div>
                <div className="de-flex-col">
                  <span className="btn-main">{t('action.follow')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>{t('onSale')}</span></li>
                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>{t('created')}</span></li>
                <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>{t('liked')}</span></li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id='zero1' className='onStep fadeIn'>
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
        {openMenu1 && (
          <div id='zero2' className='onStep fadeIn'>
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
        {openMenu2 && (
          <div id='zero3' className='onStep fadeIn'>
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
export default Author;