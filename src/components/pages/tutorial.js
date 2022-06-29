import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Footer from "../components/footer";
import Subheader from "../components/Subheader";

const Tutorial = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const [data, setData] = useState({
    title: "",
    video: "",
    poster: ""
  })

  useEffect(() => {
    switch(pathname) {
      case "/tutorial/wallet":
        setData({
          title: "howto.wallet",
          video: "https://static.tricknfts.com/demo_billetera.mp4",
          poster: "https://static.tricknfts.com/assets/preview_tuto.png"
        })
        break;
      default:
        break;
    }
  }, [pathname])
  

  return (
    <div>
      <Subheader title={t(data.title)} />
      <section className='container'>
        <div className="row d-flex justify-content-center">
          <video src={data.video} style={{width:800}} poster={data.poster} controls></video>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Tutorial