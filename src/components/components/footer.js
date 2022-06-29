import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import InfoModal from "./InfoModal";

const Footer = () => {
  const [modalBases, setModalBases] = useState(false)
  const [modalPolitica, setModalPolitica] = useState(false)
  const { t } = useTranslation();
  return (
    <footer className="footer-light">
      {modalBases && <InfoModal title="Términos y Condiciones" preview="https://static.tricknfts.com/assets/Bases_condiciones_trick.pdf" setModal={setModalBases} />}
      {modalPolitica && <InfoModal title="Política de Privacidad" preview="https://static.tricknfts.com/assets/Politica_privacidad_trick.pdf" setModal={setModalPolitica} />}
      <div className="container">
          <div className="row">

          <div className="col-md-3 col-sm-6 col-xs-1">
              <div className='navbar-title navbar-item'>        
              <NavLink to="/">
                <img
                  src="/img/logo-trick.png"
                  className="footer-logo"
                  alt="#"
                />
              </NavLink>
              
              <div className="col-md-12 col-sm-11 col-xs-1">
               <div className="widget">
               <div className="spacer-10"></div>
               <ul>
                  <li><span>El primer y más grande mercado digital de Argentina 
                    para tokens no fungibles (NFT).</span></li>
                </ul>
               </div>            
              </div>
            </div>            
         </div>    

            <div className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
              <h5>Información Legal</h5>
              <ul>
                  <li><span className="linked" onClick={() => setModalBases(true)}>Configuración de cookies</span></li>
                  <li><span className="linked" onClick={() => setModalBases(true)}>{t('agreeTerms')}</span></li>
                  <li><span className="linked" onClick={() => setModalPolitica(true)}>{t('privacyPolicy')}</span></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
              <h5>Trick NFTs</h5>
              <ul>
                  <li><h7 className="linked" onClick={()=> window.open("https://www.facebook.com/tricknfts/about_details", "_blank")}>Acerca de Trick</h7></li>
                  <li><span className="linked" onClick={() => window.open("https://www.facebook.com/tricknfts", "_blank")}>Comunidad</span></li>
                  <li><span className="linked" onClick={() => window.open("/news", "_self")}>Blog de Trick</span></li>
                  <li><span className="linked" onClick={() => window.open("/Contact", "_self")}>Contáctanos</span></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
                <h5>Newsletter</h5>
                <p>{t('messages.newsletter')}</p>
                <form action="https://tricknfts.us20.list-manage.com/subscribe/post?u=4a726ca8223c9001cd93bf6f4&amp;id=c3df3a6b83" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe" target="_blank" noValidate>
                  <div className="col text-center">
                    <input className="form-control" id="txt_subscribe" name="MAIL" placeholder={t('messages.emailEnter')} type="text" /> 
                    <NavLink to="" id="btn-subscribe" onClick={() => document.getElementById('form_subscribe').submit()}>
                      <i className="arrow_right bg-color-secondary"></i>
                    </NavLink>
                    <div className="clearfix"></div>
                  </div>
                  <div style={{position:'absolute',left:-5000}} aria-hidden="true">
                    <input type="text" name="b_4a726ca8223c9001cd93bf6f4_c3df3a6b83" tabIndex="-1" value="" readOnly />
                  </div>
                </form>
                <div className="spacer-10"></div>
                <small>{t('messages.emailSafe')}</small>
              </div>
            </div>
            
            {false &&
              <>
                <div className="col-md-3 col-sm-6 col-xs-1">
                  <div className="widget">
                    <h5>Marketplace</h5>
                    <ul>
                      <li><NavLink to="">All NFTs</NavLink></li>
                      <li><NavLink to="">Art</NavLink></li>
                      <li><NavLink to="">Music</NavLink></li>
                      <li><NavLink to="">Domain Names</NavLink></li>
                      <li><NavLink to="">Virtual World</NavLink></li>
                      <li><NavLink to="">Collectibles</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-1">
                  <div className="widget">
                    <h5>Resources</h5>
                    <ul>
                      <li><NavLink to="">Help Center</NavLink></li>
                      <li><NavLink to="">Partners</NavLink></li>
                      <li><NavLink to="">Suggestions</NavLink></li>
                      <li><NavLink to="">Discord</NavLink></li>
                      <li><NavLink to="">Docs</NavLink></li>
                      <li><NavLink to="">Newsletter</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-1">
                  <div className="widget">
                    <h5>Community</h5>
                    <ul>
                      <li><NavLink to="">Community</NavLink></li>
                      <li><NavLink to="">Documentation</NavLink></li>
                      <li><NavLink to="">Brand Assets</NavLink></li>
                      <li><NavLink to="">Blog</NavLink></li>
                      <li><NavLink to="">Forum</NavLink></li>
                      <li><NavLink to="">Mailing List</NavLink></li>
                    </ul>
                  </div>
                </div>
              </>
            }
          </div>
      </div>
      <div className="subfooter">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="de-flex">
                          <div className="de-flex-col">
                              <span onClick={()=> window.open("", "_self")}>
                                  <span className="copy">&copy; Copyright 2022 - Grupo Tilda.</span>
                              </span>
                          </div>
                          <div className="de-flex-col">

          <div className="footer-logo">       
              <NavLink to="/">
                <img
                  src="/img/seguinos.png"
                  className="img-fluid d-block"
                  alt="#"
                />
              </NavLink>          
         </div> 
                              <div className="social-icons">
                              <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                                  <span onClick={()=> window.open("https://www.facebook.com/tricknfts", "_blank")}><i className="fa fa-facebook fa-lg"></i></span>
                                  <span onClick={()=> window.open("https://twitter.com/tricknfts", "_blank")}><i className="fa fa-twitter fa-lg"></i></span>
                                  <span onClick={()=> window.open("https://www.instagram.com/trick.nfts/", "_blank")}><i className="fa fa-instagram fa-lg"></i></span>
                                  {/* <span onClick={()=> window.open("", "_self")}><i class=" fa-discord"></i></span> */}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  )
};

export default Footer;
