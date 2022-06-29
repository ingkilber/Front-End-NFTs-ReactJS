import React, { lazy } from 'react';
import { useTranslation } from "react-i18next";
import Footer from '../components/footer';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import HowWorks from '../components/HowWorks';
import News from './news';

const CarouselCollection = lazy(() => import('../components/CarouselCollection'));
const SliderCarousel = lazy(() => import('../components/SliderCarouselHome'));
const SliderCarouselAuto = lazy(() => import('../components/SliderCarouselNews'));
const ColumnNewRedux = lazy(() => import('../components/ColumnNewRedux'));
const FeatureBox = lazy(() => import('../components/FeatureBox'));

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section className="jumbotron no-bghome" style={{backgroundImage: `url(${'./img/background/news1.png'})`}}>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              {/* <div className="spacer-single"></div> */}
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <h6 className=""><span className="text-uppercase color">Trick Market</span></h6>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
                <h1 className="">Trick NFTs</h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
                <p className="lead">{t('text.home')}</p>
              </Reveal>
              {/* <div className="spacer-10"></div> */}
              {false &&
                <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
                  <span onClick={()=> window.open("/#", "_self")} className="btn-main lead">{t('action.seeMore')}</span>
                  <div className="mb-sm-30"></div>
                </Reveal>
              }
              {/* <div className="spacer-double"></div> */}
            </div>
            <div className='col-lg-6 px-0'>
              <SliderCarousel/>
            </div>
          </div>
        </div>
      </section>

      <span className="spacer-10"></span>
      <SliderCarouselAuto/>

      <News single />

      <section className='container no-top'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h2 className='style-2'>{t('galery')}</h2>
            </div>
          </div>
          <ColumnNewRedux showLoadMore={true}/>
        </div>
      </section>

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='style-2'>{t('collections')}</h2>
          </div>
        </div>
        <div className='container no-top'>
          <div className='row'>
            <div className='col-lg-12 px-0'>
              <CarouselCollection/>
            </div>
          </div>
        </div>
      </section>

      {/* sección para videos como funciona trick
      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='style-2'>{t('HowWorks')}</h2>
            
          </div>
        </div>
        <div className="col-lg-30 col-md-30 mb100">    
              <HowWorks/>
        </div>
      </section>
      hasta aqui sección para videos como funciona trick */}

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <h2 className='style-2'>{t('comingSoon')}</h2>
          </div>
        </div>
        <div className='container px-0'>
          <FeatureBox/>
        </div>
      </section>

      <Footer />
    </div>
  )
}
export default Home;
