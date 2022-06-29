import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


class CustomSlide extends Component {
  render() {
    const { image } = this.props;
    return (
      <div className='itm'>
        <div className="nft_pic">                            
          <span>
            <span className="nft_pic_info">
              <span className="nft_pic_title"></span>
              <span className="nft_pic_by"></span>
            </span>
          </span>
          <div className="nft_pic_wrap">
            <img src={image} className="lazy img-fluid" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default class Responsive extends Component {

  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      adaptiveHeight: 300,
    };

    return (
      <div className='nft-big'>
        <Slider {...settings}>
        <span onClick={()=> window.open("/ticket", "_self")}> <CustomSlide index={1} image="https://static.tricknfts.com/assets/carousel/ELFUEGO.png" /> </span>
        <span onClick={()=> window.open("/news", "_self")}> <CustomSlide index={2} image="https://static.tricknfts.com/assets/HomeVirtuality.png" /> </span>
          <CustomSlide index={1} image="https://static.tricknfts.com/assets/carousel/EVENTOS.jpg" />
          <CustomSlide index={2} image="https://static.tricknfts.com/assets/carousel/GAMES.jpg" />
          <CustomSlide index={3} image="https://static.tricknfts.com/assets/carousel/TRICKCOIN.jpg" />
          <CustomSlide index={4} image="https://static.tricknfts.com/assets/carousel/MEMBRESIAS.jpg" />
          <CustomSlide index={5} image="https://static.tricknfts.com/assets/carousel/DEPORTES.jpg" />
        </Slider>
      </div>
    );
  }
}
