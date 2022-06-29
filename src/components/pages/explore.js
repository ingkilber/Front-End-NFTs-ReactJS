import React from 'react';
import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';
import TopFilterBar from '../components/TopFilterBar';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions/thunks';

const Explore = () => (
  <div>
    <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/news1.png'})`}}>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12'>
              <h1 className='text-center'>Explore</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <TopFilterBar />
        </div>
      </div>
      <ColumnNewRedux showLoadMore={false} dispatchAction={actions.fetchAllNfts()} selector={selectors.allNftItems} />
    </section>
    <Footer />
  </div>
);

export default Explore;