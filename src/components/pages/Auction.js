import React from 'react';
import ColumnAuctionRedux from '../components/ColumnAuctionRedux';
import Footer from '../components/footer';
import { useTranslation } from "react-i18next";

const Auction = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/subheader.jpg'})`}}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>{t('liveAuction')}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <ColumnAuctionRedux/>
      </section>

      <Footer />
    </div>
  );
};

export default Auction;