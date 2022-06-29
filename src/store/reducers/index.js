import { combineReducers } from 'redux';
import nftReducer from './nfts';
import blockchainReducer from './blockchain';
import userReducer from './user';
import hotCollectionsReducer from './hotCollections';
import authorListReducer from './authorList';
import filterReducer from './filters';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  BLOCKCHAIN: blockchainReducer,
  USER: userReducer,
  hotCollection: hotCollectionsReducer,
  authors: authorListReducer,
  filters: filterReducer
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;