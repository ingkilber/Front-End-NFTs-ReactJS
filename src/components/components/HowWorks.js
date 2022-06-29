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
      slidesToShow: 3,
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

{/* Cambiar CustomSlide a Lightbox para que al reproducir los videos sea en popup */}
            <CustomSlide>
              <div className="nft_coll">
                  <div className="nft_wrap">
                  <div className="nft_coll_info">
                      <span onClick={()=> window.open("https://www.youtube.com")}><img src="./img/video1.png"  className="lazy img-fluid" alt=""/></span>
                   </div>                   
                  </div>
                  <div className="nft_coll_info">
                      <p><h3>Getting Started</h3></p>
                      <p>Create a MetaMask wallet and connect it to your profile at Ethernity.io</p>
                  </div>
              </div>
            </CustomSlide>


            <CustomSlide>
              <div className="nft_coll">
                  <div className="nft_wrap">
                  <div className="nft_coll_info">
                      <span><img src="./img/video1.png" className="lazy img-fluid" alt=""/></span>
                  </div>
                  </div>
                  <div className="nft_coll_info">
                      <p><h3>Purchasing First</h3></p>
                      <p>Using ERN to purchase NFTs is simple, straightforward, and safe. licensed NFTs.</p>
                  </div>
              </div>
            </CustomSlide>


            <CustomSlide>
              <div className="nft_coll">
                  <div className="nft_wrap">
                  <div className="nft_coll_info">
                      <span><img src="./img/video1.png" className="lazy img-fluid" alt=""/></span>
                  </div>
                  </div>
                  <div className="nft_coll_info">
                      <p><h3>Buying ERN Tokens</h3></p>
                      <p>Buy ERN tokens on your favorite centralized or decentralized exchanges</p>
                  </div>
              </div>
            </CustomSlide>


          </Slider>
        </div>
    );
  }
}
