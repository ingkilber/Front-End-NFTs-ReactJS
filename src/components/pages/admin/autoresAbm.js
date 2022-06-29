import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import AutoresAbmModal from '../../components/AutoresAbmModal';
import OptionButton from '../../components/OptionButton';
import Footer from '../../components/footer';
import TopFilterBar from '../../components/TopFilterBar';

import { Message } from '../../../core/message';
import { getNfts, getNft } from '../../../core/api';

const NftsAbm = () => {
  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const [nftsPaginated, setNftsPaginated] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [pages, setPages] = useState(0)
  const [nfts, setNfts] = useState([])
  const [nft, setNft] = useState(null)
  const [page, setPage] = useState(1)
  const { t } = useTranslation();

  window.addEventListener('language:es', (e) => {
    setEnglish(false)
  })
  window.addEventListener('language:en', (e) => {
    setEnglish(true)
  })

  useEffect(() => {
    async function loadNfts() {
      getNfts().then(nfts => {
        setNfts(nfts)
        if (nfts > 6) {
          setPages(nfts / 6)
        }
        setNftsPaginated(nfts.slice(0, 6))
      }).catch(error => {
        // Message('messages.news', 'error')
      })
    }
    loadNfts()
  }, [])

  const changePage = (number) => {
    if (number > 1 && number < pages) {
      setPage(number)
      setNftsPaginated(nfts.slice(number-1 * 6, number+1 * 6))
    }
  }

  const drawPaginationSelector = () => {
    for(var i = 0; i < pages; i++) {
      var currentPage = i+1
      return <li className={currentPage === page ? 'active' : ''} onClick={() => changePage(currentPage)}><span className='a'>{currentPage}</span></li> 
    }
  }

  const editNft = (nft) => {
    getNft(nft.id).then(response => {
      console.log(response)
      setNft(response)
      setShowModal(true)
    }).catch(error => {
      Message('Error al cargar el NFT', 'info')
    })
  }

  return (
    <div>
      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/subheader.jpg'})`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12 text-center'>
                <h1>Lista de Autores</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <OptionButton link="/admin/author/create" title="Crear" icon="fa fa-plus" />

        <TopFilterBar createCollectionAction={false} />
        
        <table className="table table-dark">
          <thead>
            <tr>
              <th>{t('author')}</th>
              <th>Image</th>
              <th>{t('form.email')} o Red social</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {nftsPaginated && nftsPaginated.map(nftItem => {
              return <tr>
                <td>{english ? nftItem.title_en : nftItem.title_es}</td>
                <td>
                  <img alt="" src={nftItem.preview} className="lazy" style={{width:128}} />
                </td>
                <td>{english ? nftItem.title_en : nftItem.title_es}</td>
                <td>
                  <span onClick={() => editNft(nftItem)}>
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
        <AutoresAbmModal
          showModal={showModal}
          setShowModal={setShowModal}
          nft={nft}
        />
      }
      <Footer />
    </div>
  )
};

export default NftsAbm;