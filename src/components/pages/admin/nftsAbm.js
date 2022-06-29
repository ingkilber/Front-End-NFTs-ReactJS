import React, { useEffect, useState } from 'react';

import NftsAbmModal from '../../components/NftsAbmModal';
import OptionButton from '../../components/OptionButton';
import Footer from '../../components/footer';
import TopFilterBar from '../../components/TopFilterBar';

import { Message } from '../../../core/message';
import { getNfts, getNft } from '../../../core/api';
import Paginator from '../../components/Paginator';
import Subheader from '../../components/Subheader';

const NftsAbm = () => {
  const [english, setEnglish] = useState(localStorage.getItem('language') === "en")
  const [nftsPaginated, setNftsPaginated] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [nfts, setNfts] = useState([])
  const [nft, setNft] = useState(null)

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
      }).catch(error => {
        // Message('messages.news', 'error')
      })
    }
    loadNfts()
  }, [])

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
      <Subheader title="Lista de NFTs" />

      <section className='container'>
        <OptionButton link="/admin/nft/create" title="Crear" icon="fa fa-plus" />
        <TopFilterBar />
        
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
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
        <Paginator collection={nfts} setCollectionPaginated={setNftsPaginated} />
      </section>

      {showModal &&
        <NftsAbmModal
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