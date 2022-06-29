import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

import { myNfts } from '../../core/api';

import Subheader from "../components/Subheader";
import Footer from "../components/footer";
import ColumnNewApi from "../components/ColumnNewApi";

const MyNfts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/

  const [address, setAddress] = useState(searchParams.get('address'))
  const [searching, setSearching] = useState(false)
  const [chances, setChances] = useState(null)
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    if (WALLET_REGEX.test(address) || EMAIL_REGEX.test(address)) {
      search()
    }
  }, [])

  const search = async () => {
    try {
      setSearching(true)
      if (WALLET_REGEX.test(address)) {
        const result = await myNfts(address, null)
        setNfts(result)
      } else if (EMAIL_REGEX.test(address)) {
        const result = await myNfts(null, address)
        setChances(result)
      } else {
        toast.info(t('messages.validWalletEmail'))
      } 
    } catch (error) {
      const errorData = error.response?.data
      if (error.toString().indexOf("429") >= 0) {
        toast.info(t('messages.mustWait'))
      }
      if (errorData && errorData.message) {
        toast.info(t(errorData.message))
      }
    } finally {
      setSearching(false)
    }
  }

  return (
    <div>
      <Subheader title="myNfts" />
      <div className="container">
      <div className="centered">
        <form id="form_quick_search" className="mt-4 mb-4">
          <div>
            <input 
              className="form-control"
              placeholder={t('form.addressEmail')}
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button id="btn-submit" disabled={searching} onClick={search}>
              <i className="fa fa-search bg-color-secondary"></i>
            </button>
            <div className="clearfix"></div>
          </div>
        </form>
        {chances &&
          <div className="text-center p-4">
            <h2>{t('chancesText', {chances})}</h2>
            <img src="https://static.tricknfts.com/news/1650227005_fuego.jpeg" className="img-fluid w-50" alt="El Fuego de D10S" />
            <br/>
            <small className="pt-2">(La cantidad de chances pueden demorar en actualizarse)</small>
          </div>
        }
        {!chances &&
          <ColumnNewApi showLoadMore={false} nftsApi={nfts} loading={searching} />
        }
      </div>
    </div>
      <Footer />
    </div>
  )
}

export default MyNfts
