import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  blockchainConnection: initEntityState(null)
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getBlockchainConnection.request):
      return { ...state, blockchainConnection: entityLoadingStarted(state.blockchainConnection, action.payload) };
    case getType(actions.getBlockchainConnection.success):
      return { ...state, blockchainConnection: entityLoadingSucceeded(state.blockchainConnection, action.payload) };
    case getType(actions.getBlockchainConnection.failure):
      return { ...state, blockchainConnection: entityLoadingFailed(state.blockchainConnection) };    
    default:
      return state;
  }
};

export default states;
