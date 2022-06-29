import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  get: initEntityState(null)
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getUser.request):
      return { ...state, get: entityLoadingStarted(state.get, action.payload) };
    case getType(actions.getUser.success):
      return { ...state, get: entityLoadingSucceeded(state.get, action.payload) };
    case getType(actions.getUser.failure):
      return { ...state, get: entityLoadingFailed(state.get) };    
    default:
      return state;
  }
};

export default states;
