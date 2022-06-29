import React, { useEffect, useState } from 'react';

import { Message } from '../../../core/message';
import { getNews } from '../../../core/api';

import OptionButton from '../../components/OptionButton';
import TopFilterBar from '../../components/TopFilterBar';
import Subheader from '../../components/Subheader';
import Footer from '../../components/footer';
import ModalWrapper from '../../components/ModalWrapper';
import CreateNew from './createNew';

const NewsAbm = () => {
  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const [newsPaginated, setNewsPaginated] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [pages, setPages] = useState(0)
  const [news, setNews] = useState([])
  const [page, setPage] = useState(1)

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
    async function loadNews() {
      getNews().then(news => {
        setNews(news)
        if (news > 6) {
          setPages(news / 6)
        }
        setNewsPaginated(news.slice(0, 6))
      }).catch(error => {
        Message('messages.news', 'error')
      })
    }
    loadNews()
  }, [])

  const changePage = (number) => {
    if (number > 1 && number < pages) {
      setPage(number)
      setNewsPaginated(news.slice(number-1 * 6, number+1 * 6))
    }
  }

  const drawPaginationSelector = () => {
    for(var i = 0; i < pages; i++) {
      var currentPage = i+1
      return <li className={currentPage === page ? 'active' : ''} onClick={() => changePage(currentPage)}><span className='a'>{currentPage}</span></li> 
    }
  }

  const editNews = (news) => {
    setNews(news)
    setShowModal(true)
  }

  return (
    <div>
      <Subheader title="news" imageUrl="./img/background/subheader.jpg" />

      <section className='container'>
        <OptionButton link="/admin/news/create" title="Crear" icon="fa fa-plus" />

        <TopFilterBar />

        <table className="table table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Category</th>
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {newsPaginated && newsPaginated.map(newsItem => {
              return <tr>
                <td>{english ? newsItem.title_en : newsItem.title_es}</td>
                <td>{english ? newsItem.description_en : newsItem.description_es}</td>
                <td>{formatDate(newsItem.createdAt)}</td>
                <td>{newsItem.category.name}</td>
                <td>
                  <img alt="" src={newsItem.image} className="lazy" style={{width:128}} />
                </td>
                <td>
                  <span onClick={() => editNews(newsItem)}>
                    <i className="fa fa-fw"></i>
                  </span>
                </td>
              </tr>
            })}
          </tbody>
        </table>

        <div className="spacer-single"></div>
        <div>
          {page > 1 &&
            <ul className="pagination">
              <li><span className='a' onClick={() => changePage(page-1)}>Prev</span></li>
              {drawPaginationSelector()}
              <li><span className='a' onClick={() => changePage(page+1)}>Next</span></li>
            </ul>
          }
        </div>
      </section>

      {showModal &&
        <ModalWrapper title="Edit News" setShowModal={setShowModal}>
          <CreateNew news={news} mode={2} />
        </ModalWrapper>
      }
      <Footer />
    </div>
  )
};

export default NewsAbm;