import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}></div>
    );
  }
}

export default class Responsive extends Component {
  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };
    return (
        <div className='nft'>
          <Slider {...settings}>


                      

            {/* Rakacoin imagen de nft */}

            <CustomSlide className='itm' index={6}>
              <div className="nft_coll">
                  <div className="nft_wrap">
                      <span><img src="./img/collections/RAKACOIN1.jpeg" className="lazy img-fluid" alt=""/></span>
                  </div>
                  <div className="nft_coll_pp">
                      <span onClick={()=> window.open("/Author/7", "_self")}><img className="lazy" src="https://static.tricknfts.com/profiles/1647029800_rakacoin.png" alt=""/></span>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("/Author/7", "_self")}><h4>RAKACOIN</h4></span>
                      <span></span>
                  </div>
              </div>
            </CustomSlide>

            {/* FIN Rakacoin */}


            <CustomSlide className='itm' index={7}>
              <div className="nft_coll">
                  <div className="nft_wrap">
                      <span><img src="./img/collections/SUSHI1.jpg" className="lazy img-fluid" alt=""/></span>
                  </div>
                  <div className="nft_coll_pp">
                      <span onClick={()=> window.open("/Author/7", "_self")}><img className="lazy" src="https://static.tricknfts.com/profiles/1649447553_sushiconfritas_perfil.jpg" alt=""/></span>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("/Author/7", "_self")}><h4>SUSHI CON FRITAS</h4></span>
                      <span></span>
                  </div>
              </div>
            </CustomSlide>

            <CustomSlide className='itm' index={1}>
              <div className="nft_coll">
                  <div className="nft_wrap">
                      <span><img src="./img/collections/BOCHINI1.jpg" className="lazy img-fluid" alt=""/></span>
                  </div>
                  <div className="nft_coll_pp">
                      <span onClick={()=> window.open("/Author/3", "_self")}><img className="lazy" src="https://static.tricknfts.com/profiles/1644464195_bochini.jpg" alt=""/></span>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("/Author/3", "_self")}><h4>BOCHINI</h4></span>
                      <span></span>
                  </div>
              </div>
            </CustomSlide>

            <CustomSlide className='itm' index={2}>
              <div className="nft_coll">
                  <div className="nft_wrap">
                      <span><img src="./img/collections/LGANTE1.jpg" className="lazy img-fluid" alt=""/></span>
                  </div>
                  <div className="nft_coll_pp">
                      <span onClick={()=> window.open("/Author/2", "_self")}><img className="lazy" src="https://static.tricknfts.com/profiles/1644464179_lgante.jpg" alt=""/></span>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("/Author/2", "_self")}><h4>L-GANTE</h4></span>
                      <span></span>
                  </div>
              </div>
            </CustomSlide>

            <CustomSlide className='itm' index={3}>
              <div className="nft_coll">
                  <div className="nft_wrap">
                      <span><img src="./img/collections/MARADONA1.jpg" className="lazy img-fluid" alt=""/></span>
                  </div>
                  <div className="nft_coll_pp">
                      <span onClick={()=> window.open("/Author/4", "_self")}><img className="lazy" src="https://static.tricknfts.com/profiles/1644464226_maradona.jpg" alt=""/></span>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("/Author/4", "_self")}><h4>MARADONA</h4></span>
                      <span></span>
                  </div>
              </div>
            </CustomSlide>

            {/* <CustomSlide className='itm' index={4}>
              <div className="nft_coll">
                  <div className="nft_wrap">
                      <span><img src="./img/collections/PELEA1.jpg" className="lazy img-fluid" alt=""/></span>
                  </div>
                  <div className="nft_coll_pp">
                      <span onClick={()=> window.open("/Author/5", "_self")}><img className="lazy" src="https://static.tricknfts.com/profiles/1644464167_pelea.jpg" alt=""/></span>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("/Author/5", "_self")}><h4>MAIDANA vs YAO CABRERA</h4></span>
                      <span></span>
                  </div>
              </div>
            </CustomSlide> */}

            <CustomSlide className='itm' index={5}>
              <div className="nft_coll">
                  <div className="nft_wrap">
                      <span><img src="./img/collections/PERON1.jpg" className="lazy img-fluid" alt=""/></span>
                  </div>
                  <div className="nft_coll_pp">
                      <span onClick={()=> window.open("/Author/6", "_self")}><img className="lazy" src="https://static.tricknfts.com/profiles/1644464189_peron.jpg" alt=""/></span>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("/Author/6", "_self")}><h4>PERON</h4></span>
                      <span></span>
                  </div>
              </div>
            </CustomSlide>





          </Slider>
        </div>
    );
  }
}
