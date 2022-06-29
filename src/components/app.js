import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastContainer } from 'react-toastify';

import WalletConfirmation from './pages/walletConfirmation';
import TokenRecovery from './pages/tokenRecovery';
import CreateAutores from './pages/admin/createAutores';
import AutoresAbm from './pages/admin/autoresAbm';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import AdminDashboard from './pages/admin/AdminDashboard';
import RankingRedux from './pages/RankingRedux';
import ScrollToTopBtn from './menu/ScrollToTop';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import Progressbar from './pages/progressbar';
import Helpcenter from './pages/helpcenter';
import ItemDetail from './pages/ItemDetail';
import NewsAbm from './pages/admin/newsAbm';
import CreateNew from './pages/admin/createNew';
import NftsAbm from './pages/admin/nftsAbm';
import Sorteo from './pages/sorteoMaradona';
import Colection from './pages/colection';
import Accordion from './pages/accordion';
import Explore2 from './pages/explore2';
import NewsItem from './pages/newsItem';
import Activity from './pages/activity';
import Tutorial from './pages/tutorial';
import Auction from './pages/Auction';
import Explore from './pages/explore';
import Profile from './pages/profile';
import Contact from './pages/contact';
import Payment from './pages/Payment';
import Home from './pages/homeNueva';
import Create from './pages/admin/createNft';
import Author from './pages/Author';
import MyNfts from './pages/myNfts';
import Alerts from './pages/alerts';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import Tabs from './pages/tabs';
import Buy from './pages/buy';

import { createGlobalStyle } from 'styled-components';

import Header from './menu/header';
import ProtectedRoute from './components/ProtectedRoute';
import HowWorks from './components/HowWorks';
import CollectionsAbm from './pages/admin/collectionsAbm';

/* Animaciones
https://codesandbox.io/s/react-router-animation-working-fix-9j415?fontsize=14&hidenavigation=1&theme=dark
https://codesandbox.io/s/animated-routes-demo-react-router-v6-6l1li?fontsize=14&hidenavigation=1&theme=dark
*/

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children }) => {
  const location = useLocation()
  useEffect(() => window.scrollTo(0,0), [location.pathname])
  return children
}

const AnimatedRoute = (props) => {
  const location = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes>
          {props.children}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

const App = () => (
  <div className="wraper">
    <GlobalStyles />
    <div id="routerhang">
      <Router>
        <Header />
        <ToastContainer position="top-right" autoClose="5000" />
        <ScrollTop path="*">
          <AnimatedRoute>
            <Route path="/" element={<Home />} />
            <Route path="/explore2" element={<Explore2 />} />
            <Route path="/Auction" element={<Auction />} />
            <Route path="/helpcenter" element={<Helpcenter />} />
            <Route path="/collection" element={<Colection/>} />
            <Route path="/Galeria/:id" element={<ItemDetail/>} />
            <Route path="/Author/:id" element={<Author />} />

            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/nft/create" element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            } />
            <Route path="/admin/collections" element={
              <ProtectedRoute>
                <CollectionsAbm />
              </ProtectedRoute>
            } />
            <Route path="/admin/author" element={
              <ProtectedRoute>
                <AutoresAbm />
              </ProtectedRoute>
            } />
            <Route path="/admin/author/create" element={
              <ProtectedRoute>
                <CreateAutores />
              </ProtectedRoute>
            } />
            <Route path="/admin/news" element={
              <ProtectedRoute>
                <NewsAbm />
              </ProtectedRoute>
            } />
            <Route path="/admin/news/create" element={
              <ProtectedRoute>
                <CreateNew />
              </ProtectedRoute>
            } />
            <Route path="/admin/nft" element={
              <ProtectedRoute>
                <NftsAbm />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/coin" element={<Buy />} />
            <Route path="/coin/:variation" element={<Buy />} />
            <Route path="/ticket" element={<Buy />} />
            <Route path="/ticket/:variation" element={<Buy />} />

            <Route path="/confirmation" element={<WalletConfirmation />} />
            <Route path="/tutorial/wallet" element={<Tutorial />} />
            <Route path="/recovery" element={<TokenRecovery />} />
            <Route path="/nfts" element={<MyNfts />} />
            <Route path="/payment/:action" element={<Payment />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/ranking" element={<RankingRedux />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/price" element={<Price />} />
            <Route path="/works" element={<Works />} />
            <Route path="/HowWorks" element={<HowWorks />} />
            <Route path="/news" element={<News />} />
            <Route path="/sorteo" element={<Sorteo />} />
            <Route path="/news/:id" element={<NewsItem />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/elegantIcons" element={<ElegantIcons />} />
            <Route path="/etlineIcons" element={<EtlineIcons />} />
            <Route path="/fontAwesomeIcons" element={<FontAwesomeIcons />} />
            <Route path="/accordion" element={<Accordion />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/progressbar" element={<Progressbar />} />
            <Route path="/tabs" element={<Tabs />} />
          </AnimatedRoute>
        </ScrollTop>
      </Router>
    </div>
    <ScrollToTopBtn />
  </div>
)
export default App;