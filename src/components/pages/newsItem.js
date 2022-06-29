import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CarouselNewReduxAutor from '../components/CarouselNewRedux_autor';
import Footer from '../components/footer';
import Loading from '../components/Loading';
import { Message } from '../../core/message';
import { getNewsItem, getProduct } from '../../core/api';

const PRODUCT_TICKET_FUEGO = 1

const NewsItem = () => {
  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const [variations, setVariations] = useState([])
  const [news, setNews] = useState(null)
  const { t } = useTranslation();
  const urlParams = useParams();

  window.addEventListener('language:es', (e) => {
    setEnglish(false)
  })
  window.addEventListener('language:en', (e) => {
    setEnglish(true)
  })

  const formatDate = (date) => {
    return new Date(date).toLocaleString().substring(0, 16)
  }
  
  useEffect(() => {
    async function loadNews() {
      getNewsItem(urlParams.id).then(newsResponse => {
        setNews(newsResponse)
      }).catch(error => {
        Message('messages.news', 'error')
      })

      getProduct(PRODUCT_TICKET_FUEGO).then(product => {
        setVariations(product.variations.map(variation => {
          variation.title_en = product.title_en.concat(" ").concat(variation.name)
          variation.title_es = product.title_es.concat(" ").concat(variation.name)
          return variation
        }))
      })
    }
    loadNews()
  }, [])

  return (
    news ?
      <div>
        <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'/img/background/news1.png'})`}}>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12 text-center'>
                  <h1>{english ? news.title_en : news.title_es}</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='container'>
          {formatDate(news.createdAt)} - {news.category.name}
          <div className="row">
            <div className="col-12 col-md-6">
              <img alt="" src={news.image} className="lazy" width="100%" />
            </div>
            <div className="col-12 col-md-6">
              <p style={{whiteSpace:"pre-line"}}>{english ? news.description_en : news.description_es}</p>
            </div>
          </div>
        </section>

        <div className="nft__black">
          <section className='container no-bottom no-top'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="spacer-single"></div>
                <h3 className='style-2'>También te puede interesar</h3>
                {/* <div className="small-border"></div> */}
              </div>
              <div className='col-lg-12 px-0'>
                <CarouselNewReduxAutor />
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    :
      <Loading />
  )
};

export default NewsItem;