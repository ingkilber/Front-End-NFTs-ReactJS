import React, { memo, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { shuffleArray } from '../../store/utils';

import NftLoading from './NftLoading';
import ProductCard from "./ProductCard";

const CarouselNewApi = ({
  shuffle = false,
  loading = true,
  nftsApi = null
})=> {
  const nfts = nftsApi ? shuffle ? shuffleArray(nftsApi) : nftsApi : [];
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    console.log(nftsApi)
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  }

  var CarouselNewApi = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 5,
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
    <div className='nft ym2'>
      <Slider {...CarouselNewApi}>
        {loading && nfts.length === 4 && <NftLoading />}
        {nfts && nfts.map((nft, index) => (
          <ProductCard product={nft} key={index} onImgLoad={onImgLoad} />
        ))}
      </Slider>
    </div>
  );
}
  
export default memo(CarouselNewApi);