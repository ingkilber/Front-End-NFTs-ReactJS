import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

import { buy, getProduct, getPaymentMethods } from '../../core/api';

import QuantityButtons from '../components/QuantityButtons';
import CarouselNewApi from "../components/CarouselNewApi";
import ActionButton from '../components/ActionButton';
import NftPreview from '../components/NftPreview';
import InfoModal from '../components/InfoModal';
import ExtraBuy from "../components/ExtraBuy";
import Loading from '../components/Loading';
import Footer from '../components/footer';
import OptionButton from '../components/OptionButton';

const WITH_BUTTON_NUMBERS = false

const Buy = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const [paymentMethods, setPaymentMethods] = useState([])
  const [referido, setReferido] = useState(searchParams.get("r"))
  const [provider, setProvider] = useState('mp')
  const [buying, setBuying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalHelp, setModalHelp] = useState(false)
  const [modalBases, setModalBases] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [address, setAddress] = useState('')
  const [terms, setTerms] = useState(false)
  const [email, setEmail] = useState('')

  const [variations, setVariations] = useState([])
  const [data, setData] = useState({
    productId: null,
    variationId: null,
    name: "",
    detail: null,
    preview: "",
    price: ""
  })

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/
  const TICKET_ENDPOINT = "/ticket/"
  const PRODUCT_TICKET_FUEGO = 1

  useEffect(() => {
    getProduct(PRODUCT_TICKET_FUEGO).then(product => {
      const variation = getVariation(product)
      const name = variation.id ? product.title_en.concat(" ").concat(variation.name) : product.title_en

      setVariations(product.variations.map(variation => {
        variation.title_en = product.title_en.concat(" ").concat(variation.name)
        variation.title_es = product.title_es.concat(" ").concat(variation.name)
        return variation
      }))

      setData({
        productId: product.id,
        variationId: variation.id,
        name,
        detail: variation.id && variation.detail,
        preview: variation.id ? variation.image : "https://static.tricknfts.com/Trick_explain.mp4", /* ¿Temporal? */
        price: variation.id ? variation.price : product.price
      })
    })
    getPaymentMethods().then(paymentMethodsResponse => {
      if (paymentMethodsResponse && paymentMethodsResponse.paymentMethods.length > 1) {
        setPaymentMethods(paymentMethodsResponse.paymentMethods)
      } else {
        setProvider('mp')
      }
    })
    setAddress(localStorage.getItem('account'))
    setQuantity(data.quantity)
    localStorage.setItem('referido', referido)
    setLoading(false)
  }, [])

  const getVariation = (product) => {
    var variation = {id: null}
    if (pathname.includes(TICKET_ENDPOINT)) {
      const code = pathname.substring(TICKET_ENDPOINT.length, pathname.length)
      variation = product.variations.find(variation => variation.code.toLowerCase() === code.toLowerCase())
      if (!variation) {
        window.location.href = "/ticket"
      }
    }
    return variation
  }

  const validForm = () => {
    if (!data.variationId && (!quantity || quantity <= 0)) {
      throw t("messages.validQuantity")
    }

    if (!EMAIL_REGEX.test(email)) {
      throw t("messages.validEmail")
    }

    if (address && !WALLET_REGEX.test(address)) {
      throw t("messages.validWallet")
    }

    if (!terms) {
      throw t("messages.validTerms")
    }
  }

  const onBuyClick = async () => {
    try {
      validForm()

      setBuying(true)
      const buyParameters = {
        productId: data.productId,
        variationId: data.variationId,
        provider,
        quantity,
        address,
        email,
        referido: localStorage.getItem('referido')
      }

      buy(buyParameters).then(response => {
        setBuying(false)
        window.location.href = response.url
      }).catch(error => {
        setBuying(false)
        if (error && error.response) {
          if (error.response.status === 409) {
            const message = error.response.data.message
            toast.info(message.includes("messages") ? t(message) : message)
          } else {
            toast.info(`Debés ingresar con tu Wallet para poder comprar ${data.name}`)
          }
        }
      })
    } catch (error) {
      toast.info(error)
    }
  }

  const formattedPrice = Intl.NumberFormat('es-ES').format(data.price)
  return (
    <div>
      {loading ? <Loading /> :
      <>
        <section className='container'>
          <div className='row mt-md-5 pt-md-4'>
            <div className="col-md-6 text-center">
              <NftPreview preview={data.preview} play={true} />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2>{data.name}</h2>
                <h3 style={{color:"gray",textShadow:"1px 1px 5px black"}}>{data.detail}</h3>
                <h4 className="mb-0">{t('price')}</h4>
                <span>{`$${formattedPrice}`}</span>
                <div className="field-set mt-4">
                  <div className="row d-flex" style={{justifyContent:'space-evenly'}}>
                    {paymentMethods.length > 0 && paymentMethods.map(prov => {
                      return (
                        <div className="col-12 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center mb-4">
                          <div className={provider === prov.endpoint ? "selected-payment-provider" : "payment-provider"}>
                            <img className="img-fluid" src={prov.image} alt={prov.name} onClick={() => setProvider(prov.endpoint)} />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="row d-flex justify-content-center">
                    {!data.variationId &&
                      <>
                        <h5>{t('form.quantity')}</h5>
                        <input type="number" min="1" className="form-control" placeholder="100" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

                        {WITH_BUTTON_NUMBERS &&
                          <QuantityButtons
                            quantity={quantity}
                            setQuantity={setQuantity}
                          />
                        }
                        <div className="spacer-10"></div>
                      </>
                    }

                    <h5>{t('form.email')}</h5>
                    <input name="email" type="email" className="form-control" placeholder="user@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <div className="spacer-10"></div>

                    <h5>{t('form.address')} {t('form.optional')}</h5>
                    <input type="text" className="form-control mb-1" placeholder="0x000000000000000000000000000000000" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    {/* <input type="text" className="form-control" style={{background:'transparent',color:'gray'}} disabled placeholder="0x000000000000000000000000000000000" value={address} onChange={(e) => setAddress(e.target.value)} required /> */}
                    <small>{t('messages.validAddress')}</small>
                  </div>
                  <div className="spacer-30"></div>
                  
                  <div className='agrement'>
                    <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)}/>
                    <span className="linked" onClick={() => setModalBases(true)}>  {t('acceptConditions')}</span>
                  </div>

                  <div className="spacer-30"></div>

                  <div className="d-flex align-items-center">
                    <ActionButton
                      loading={buying}
                      text={t('action.buy')}
                      loadingText={t('messages.buying')}
                      onClick={onBuyClick}
                    />
                    <small className="btn-secondary" style={{marginLeft:10}} onClick={() => setModalHelp(true)}>{t('messages.howBuy')}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {modalHelp && <InfoModal title="¿Cómo compro?" preview="https://static.tricknfts.com/compra_nft.mp4" setModal={setModalHelp} />}
          {modalBases && <InfoModal title="Bases y condiciones" preview="https://static.tricknfts.com/assets/Bases_condiciones_trick.pdf" setModal={setModalBases} />}
        </section>

        <ExtraBuy />

        <section className='container no-bottom no-top'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className="spacer-single"></div>
                <h3 className='style-2'>También te puede interesar</h3>
              </div>
              <div className='col-lg-12 px-0'>
                <CarouselNewApi nftsApi={variations} />
              </div>
            </div>
        </section>
      </>
      }

      <Footer />
    </div>
  );
}

export default Buy;