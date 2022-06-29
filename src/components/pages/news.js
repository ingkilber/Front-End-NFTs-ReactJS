import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../components/footer';
import { Message } from '../../core/message';
import { getNews } from '../../core/api';
import Paginator from '../components/Paginator';
import Subheader from '../components/Subheader';

const News = ({ single = false }) => {
  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const [newsPaginated, setNewsPaginated] = useState([])
  const [news, setNews] = useState([])
  const { t } = useTranslation();

  window.addEventListener('language:es', (e) => {
    setEnglish(false)
  })
  window.addEventListener('language:en', (e) => {
    setEnglish(true)
  })

  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }

  useEffect(() => {
    const loadNews = async () => {
      getNews().then(news => {
        setNews(news)
      }).catch(error => {
        // Message('messages.news', 'error')
      })
    }
    loadNews()
  }, [])

  const openNewsUrl = (news) => {
    const url = news.url ? news.url : `/news/${news.slug}`
    window.open(url, '_self')
  }

  return (
    <div>
      {!single && <Subheader title="news" />}
      <section className='container'>
        <div className="row">
          {newsPaginated && newsPaginated.map(newsItem => (
            <div key={newsItem.id} className="col-lg-4 col-md-6 mb30">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <span onClick={() => openNewsUrl(newsItem)}>
                      <img alt={english ? newsItem.title_en : newsItem.title_es} src={newsItem.image} className="lazy"/>
                    </span>
                  </div>
                  <div className="post-text">
                    <span onClick={() => openNewsUrl(newsItem)} className="p-tagline">{newsItem.category.name}</span>
                    <span className="p-date">{formatDate(newsItem.createdAt)}</span>
                    <h4>{english ? newsItem.title_en : newsItem.title_es}</h4>
                    {/* <p>{english ? newsItem.description_en : newsItem.description_es}</p> */}
                    <span className="btn-main" onClick={() => openNewsUrl(newsItem)}>{t('action.readMore')}</span>
                  </div>
                </div>
              </div>
            </div>))
          }
          
          <div className="spacer-single"></div>

          <div className={single ? 'd-none' : ''}>
            <Paginator collection={news} setCollectionPaginated={setNewsPaginated} elements={single ? 3 : 3} />
          </div>
        </div>
      </section>

      {!single && <Footer />}
    </div>
  )
};

export default News;