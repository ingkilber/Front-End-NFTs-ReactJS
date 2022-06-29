import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { clearNfts, clearFilter } from '../../store/actions';
import NftCard from './NftCard';
import { shuffleArray } from '../../store/utils';
import { getUser } from '../../core/user';
import NftLoading from './NftLoading';
import { useTranslation } from "react-i18next";



const CarouselNewRedux_autor = ({
    showLoadMore = false,
  shuffle = false,
  dispatchAction = actions.fetchNftsBreakdown(),
  selector = selectors.nftItems,
  loading = true,
  notFound = false
})=> {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const nftItems = useSelector(selector);
    const nfts = nftItems ? shuffle ? shuffleArray(nftItems) : nftItems : [];
    const [height, setHeight] = useState(0);
    const [user, setUser] = useState({})


    const onImgLoad = ({ target: img }) => {
        let currentHeight = height;
        if (currentHeight < img.offsetHeight) {
          setHeight(img.offsetHeight);
        }
      }
    
      useEffect(() => {
        async function fetchUser() {
          const jwtUser = await getUser()
          setUser(jwtUser)
        }
        fetchUser()
        
        dispatch(dispatchAction);
      }, [dispatch]);
    
      //will run when component unmounted
      useEffect(() => {
        return () => {
          dispatch(clearFilter());
          dispatch(clearNfts());
        }
      }, [dispatch]);

      var CarouselNewRedux_autor = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
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
              slidesToShow: 1,
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
            
          <Slider {...CarouselNewRedux_autor}>
              


              
          {loading && nfts.length === 4 && <NftLoading />}
      {nfts && nfts.map((nft, index) => (
          
        //   <div className='col-lg-3 '>
        <div className='col-lg-12 px-0'>
        <NftCard nft={nft} key={index} onImgLoad={onImgLoad} user={user} className='product-card' />
        </div>
      ))}
    {/* {showLoadMore && nfts.length > 4 &&
        <div className='col-lg-12'>
          <div className="spacer-single"></div>
          <span onClick={()=> window.open("/Explore", "_self")} className="btn-main lead m-auto">{t('action.seeMore')}</span>
        </div>
      } */}
          
          </Slider>
       </div>
       
    );
  }
  
export default memo(CarouselNewRedux_autor);
