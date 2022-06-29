import { createGlobalStyle } from 'styled-components';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from 'react-router-dom';

import { paypalIpn } from '../../core/api';

import Footer from '../components/footer';
import Loading from '../components/Loading';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Payment = function () {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const urlParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const action = urlParams.action
    switch(action) {
      case "mp-ok":
        setMessage("¡Gracias por tu compra!")
        break;
      case "mp-error":
        setMessage("Ocurrió un error al realizar el pago, intenta nuevamente mas tarde")
        break;
      case "mp-pending":
        setMessage("Tu compra esta pendiente, una vez impactado el pago acreditaremos tus tokens")
        break;
      case "pp-ok":
        setMessage("¡Gracias por tu compra!")
        setLoading(true)
        paypalIpn(searchParams.get('PayerID'), searchParams.get('paymentId')).then(response => {
          setLoading(false)
        })
        break;
      case "pp-cancel":
        setMessage("Compra cancelada, volve cuando quieras")
        break;
      default:
        navigate("/")
    }
  }, [])

  return (
    <div>
      <GlobalStyles />
      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'/img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                {loading ? <Loading /> : <h1 className='text-center'>{t(message)}</h1>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Payment;