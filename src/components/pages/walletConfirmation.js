import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

import { claimNft } from '../../core/api';

import ActionButton from "../components/ActionButton";
import Footer from "../components/footer";

const WalletConfirmation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/

  const [address, setAddress] = useState(localStorage.getItem('account'))
  const [paymentId, setPaymentId] = useState(searchParams.get("pid"))
  const [token, setToken] = useState(searchParams.get("token"))
  const [redirected, setRedirected] = useState(false)
  const [claiming, setClaiming] = useState(false)


  useEffect(() => {
    if (!token || !paymentId) {
      window.location.href = "/"
    }
  }, [])

  const redireccion = () => {
    setRedirected(true)
    setTimeout(() => window.location.href = "/", 5000)
  }

  const claim = () => {
    if (WALLET_REGEX.test(address)) {
      setClaiming(true)
      claimNft(token, paymentId, address).then(result => {
        toast(t('messages.ticketsClaimed'))
        setClaiming(false)
        redireccion()
      }).catch(error => {
        setClaiming(false)
        const errorData = error.response.data
        if (errorData && errorData.message) {
          toast.info(t(errorData.message))
          redireccion()
        }
      })
    } else {
      toast.info(t('messages.validWallet'))
    }
  }

  return (
    <div>
      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>{t('messages.thanksPurchase')}</h1>
                <span className="spacer-10"></span>
                <h4>{t('messages.claimTickets')}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {redirected &&
        <section className="container text-center">
          <h4>{t('messages.redirectedHome')}</h4>
        </section>
      }

      {!redirected &&
        <section className='container'>
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-sm-6 text-center">
              <h5>{t('form.address')}</h5>
              <input type="text" className="form-control mb-1" placeholder="0x000000000000000000000000000000000" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          </div>

          <span className="spacer-10"></span>

          <div className="d-flex justify-content-center">
            <ActionButton
              onClick={claim}
              loading={claiming}
              text={t('action.claim')}
              loadingText={t('messages.claiming')}
            />
          </div>
        </section>
      }
      <Footer />
    </div>
  )
}

export default WalletConfirmation