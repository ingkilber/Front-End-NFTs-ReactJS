import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


class CustomSlide extends Component {
  render() {
    const { image } = this.props;
    return (
      <div className='container'>
      <div className='itm'>
        <div className="nft_banners">                            
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
      <div className='container'>
      <div className='nft'>
        <Slider {...settings}>
        <span onClick={()=> window.open("/ticket", "_self")}> <CustomSlide index={1} image="https://static.tricknfts.com/assets/Banner-Auto-Sorteo.gif" /> </span>
        <span onClick={()=> window.open("/news/VirtualityBA-Mundos-Virtuales", "_self")}> <CustomSlide index={2} image="https://static.tricknfts.com/assets/bannervirtuality.jpg" /> </span>
          {/* <CustomSlide index={1} image="./img/sorteo/Cupe01.jpeg" /> */}
          {/* <CustomSlide index={2} image="./img/sorteo/Cupe02.jpeg" />
          <CustomSlide index={3} image="./img/sorteo/Cupe03.jpeg" /> */}
        </Slider>
      </div>
      </div>
    );
  }
}
