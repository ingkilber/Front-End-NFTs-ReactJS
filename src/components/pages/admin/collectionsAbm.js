import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../../components/footer';
import Subheader from '../../components/Subheader';
import { Message } from '../../../core/message';
import { getCollections } from '../../../core/api';
import CollectionsAbmModal from '../../components/NewsAbmModal';

const CollectionsAbm = () => {
  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const [collectionsPaginated, setCollectionsPaginated] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [pages, setPages] = useState(0)
  const [collections, setCollections] = useState([])
  const [page, setPage] = useState(1)
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
    async function loadCollections() {
      getCollections().then(response => {
        const col = response.collections
        setCollections(col)
        if (col > 6) {
          setPages(col / 6)
        }
        setCollectionsPaginated(col.slice(0, 6))
      }).catch(error => {
        //Message('messages.news', 'error')
      })
    }
    loadCollections()
  }, [])

  const changePage = (number) => {
    if (number > 1 && number < pages) {
      setPage(number)
      setCollectionsPaginated(collections.slice(number-1 * 6, number+1 * 6))
    }
  }

  const drawPaginationSelector = () => {
    for(var i = 0; i < pages; i++) {
      var currentPage = i+1
      return <li className={currentPage === page ? 'active' : ''} onClick={() => changePage(currentPage)}><span className='a'>{currentPage}</span></li> 
    }
  }

  const editCollection = (collection) => {
    setCollections(collection)
    setShowModal(true)
  }

  return (
    <div>
      <Subheader title="collections" />
      <section className='container'>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {collectionsPaginated && collectionsPaginated.map(collectionItem => {
              return <tr>
                <td>{english ? collectionItem.title_en : collectionItem.title_es}</td>
                <td>{english ? collectionItem.description_en : collectionItem.description_es}</td>
                <td>{collectionItem.author.username}</td>
                <td>
                  <img alt="" src={`/${collectionItem.preview}`} className="lazy" style={{width:128}} />
                </td>
                <td>
                  <span onClick={() => editCollection(collectionItem)}>
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

      {false && showModal &&
        <CollectionsAbmModal
          showModal={showModal}
          setShowModal={setShowModal}
          collection={collections}
        />
      }
      <Footer />
    </div>
  )
};

export default CollectionsAbm;