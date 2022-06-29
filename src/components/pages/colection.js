import React from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import ColumnNewRedux from "../components/ColumnNewRedux";

import * as actions from '../../store/actions/thunks';
import * as selectors from '../../store/selectors';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Colection = function () {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  return (
    <div>
      {/* <GlobalStyles /> */}

      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'/img/background/BACKGROUND-TRICK3.jpg'})`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12 text-center'>
                <h2>Nombre del usuario logueado</h2>
              {/* <h2>{user && user.username}</h2> */}
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
                  <img src="https://static.tricknfts.com/profiles/1644464226_maradona.jpg" alt="" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="profile_name">
                  <h4>
                    Abstraction
                    <div className="clearfix"></div>
                    <span id="wallet" className="profile_wallet">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                    <button id="btn_copy" title="Copy Text">Copy</button>
                  </h4>
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
              <ul className="de_nav">
                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Owned</span></li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id='zero1' className='onStep fadeIn'>
            <ColumnNewRedux
              showLoadMore={false}
              dispatchAction={actions.fetchUserNfts(1, 'sales')}
              selector={selectors.nftUserItems}
            />
          </div>
        )}
        {openMenu1 && (
          <div id='zero2' className='onStep fadeIn'>
            <ColumnNewRedux
              showLoadMore={false}
              dispatchAction={actions.fetchUserNfts(1, 'owned')}
              selector={selectors.nftUserItems}
            />
          </div>
        )}
      </section>






      <Footer />
    </div>
  );
}
export default Colection;