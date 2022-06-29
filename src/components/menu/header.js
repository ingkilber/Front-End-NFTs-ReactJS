import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import useOnclickOutside from "react-cool-onclickoutside";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { getAccount, setNetwork, signMessage } from '../../core/blockchain';
import { getToken } from '../../core/api';
import i18n from '../../i18n';

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const Header = function () {
  const { t } = useTranslation();
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [showmenu, btn_icon] = useState(false)

  const [wallet, setWallet] = useState(t('header.connectWallet'))
  const [connected, setConnected] = useState(false)

  const disconnect = async () => {
    if (connected) {
      localStorage.removeItem('connected')
      localStorage.removeItem('token')
      localStorage.removeItem('account')
      localStorage.removeItem('accountMin')

      setWallet(t('header.connectWallet'))
      setConnected(false)
    }
  }

  const connectWallet = async () => {
    if (!connected) {
      btn_icon(false)
      try {
        const {address, addressMin, handleGetData} = await getAccount()
        setWallet(addressMin)

        if (handleGetData) {
          await setNetwork()
        }

        const uuid = uuidv4();
        const message = t("messages.welcome", {uuid})
        const signature = await signMessage(message)
        await getToken(address, signature, message)

        setConnected(true)
        localStorage.setItem('connected', true)
        window.location.href = "/"

      } catch (error) {
        console.log(error)
        toast.error(t(error.toString()), {hideProgressBar: true});
        setWallet(t('header.connectWallet'))
        setConnected(false)
      }
    }
  }

  const setSiteLanguage = (language) => {
    const actual = localStorage.getItem('language')
    if (actual !== language) {
      localStorage.setItem('language', language)
      i18n.changeLanguage(language)
      window.dispatchEvent(new Event(`language:${language}`))
    }
  }

  const handleLanguage = () => {
    setOpenLanguage(!openLanguage);
  };
  const handleWallet = () => {
    setOpenWallet(!openWallet);
  };
  const closeLanguage = () => {
    setOpenLanguage(false);
  }
  const closeWallet = () => {
    setOpenWallet(false);
  }
  const ref3 = useOnclickOutside(() => {
    closeLanguage();
  });
  const ref4 = useOnclickOutside(() => {
    closeWallet();
  });

  useEffect(() => {
    const header = document.getElementById("myHeader")
    const totop = document.getElementById("scroll-to-top")
    const sticky = header.offsetTop

    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false)
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky")
        totop.classList.add("show")
      } else {
        header.classList.remove("sticky")
        totop.classList.remove("show")
      }
    });

    async function validateConnection() {
      const connected = localStorage.getItem('connected');
      setConnected(connected)
  
      if (connected) {
        try {
          const {addressMin} = await getAccount()
          setWallet(addressMin) 
        } catch (error) {
          disconnect()
        }
      }
    }
    validateConnection()

    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  });

  return (
    <header id="myHeader" className='navbar white'>
     <div className='container'>
       <div className='row w-100-nav'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                <img
                  src="/img/logo-trick.png"
                  className="img-fluid d-block"
                  alt="#"
                />
                <img
                  src="/img/logo-trick.png"
                  className="img-fluid d-3"
                  alt="#"
                />
                <img
                  src="/img/logo-trick.png"
                  className="img-fluid d-none"
                  alt="#"
                />
              </NavLink>
            </div>
          </div>

          <div className='search d-none'>
            <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu &&
                <div className='menu'>
                  <div className='navbar-item'>
                    <NavLink to="/" onClick={() => btn_icon(!showmenu)}>{t('header.home')}</NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/news">{t('header.noticias')}</NavLink>
                  </div>
                  <div className='navbar-item'>
                  <NavLink to="/explore">{t('header.market')}</NavLink>
                </div>
                  <div className='navbar-item'>
                    <NavLink to="/nfts">{t('myNfts')}</NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/Contact">{t('contactUs')}</NavLink>
                  </div>
                  <div className='navbar-item'>
                    <div ref={ref3}>
                      <div className="dropdown-custom dropdown-toggle btn" onClick={handleLanguage}>
                        {t('header.language')}
                      </div>
                      {openLanguage && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeLanguage}>
                            <a onClick={() => setSiteLanguage('en')}>{t('header.english')}</a>
                            <a onClick={() => setSiteLanguage('es')}>{t('header.spanish')}</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref4}>
                      <div className='dropdown' onClick={() => connected ? handleWallet() : connectWallet()}>
                        <button id="wallet-connect-btn" className="btn-main btn-toggle">{wallet}</button>
                        {openWallet && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeWallet}>
                              <NavLink to="/Profile">{t('header.profile')}</NavLink>
                              <NavLink to="/Collection">{t('header.collection')}</NavLink>
                              <NavLink to={window.location.pathname} onClick={() => disconnect()}>{t('header.disconnect')}</NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </Breakpoint>

            <Breakpoint xl>
              <div className='menu'>
                <div className='navbar-item'>
                  <NavLink to="/">{t('header.home')}</NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/news">{t('header.noticias')}</NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/explore">{t('header.market')}</NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/nfts">{t('myNfts')}</NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/Contact">{t('contactUs')}</NavLink>
                </div>
                <div className='navbar-item'>
                  <div ref={ref3}>
                    <div className="dropdown-custom dropdown-toggle btn" onMouseEnter={handleLanguage} onMouseLeave={closeLanguage}>
                      {t('header.language')}
                      <span className='lines'></span>
                      {openLanguage && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeLanguage}>
                            <a onClick={() => setSiteLanguage('en')}>{t('header.english')}</a>
                            <a onClick={() => setSiteLanguage('es')}>{t('header.spanish')}</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <div ref={ref4} className='mainside'>
                    <div className='dropdown' onClick={() => connected ? handleWallet() : connectWallet()}>
                      <button id="wallet-connect-btn" className="btn-main btn-toggle">{wallet}</button>
                      {openWallet && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeWallet}>
                            <NavLink to="/Profile">{t('header.profile')}</NavLink>
                            <NavLink to="/Collection">{t('header.collection')}</NavLink>
                            <NavLink to={window.location.pathname} onClick={() => disconnect()}>{t('header.disconnect')}</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
}
export default Header;
