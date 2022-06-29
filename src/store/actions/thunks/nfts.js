import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const fetchNftsBreakdown = () => async (dispatch) => {
  
  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    const { data } = await Axios.get("/nft/new", {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftBreakdown.success(data.tokens));
  } catch (err) {
    dispatch(actions.getNftBreakdown.failure(err));
  }
};

export const fetchAllNfts = () => async (dispatch) => {
  
  dispatch(actions.getAllNft.request(Canceler.cancel));

  try {
    const { data } = await Axios.get("/nft/all", {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getAllNft.success(data.tokens));
  } catch (err) {
    dispatch(actions.getAllNft.failure(err));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {

  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get("/nft/slider", {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftShowcase.success(data.tokens));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

export const fetchNftDetail = (id) => async (dispatch) => {

  dispatch(actions.getNftDetail.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`/nft/${id}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftDetail.success(data.detail));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};

export const fetchUserNfts = (id, type) => async (dispatch) => {
  
  dispatch(actions.getUserNfts.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`/nft/user/${id}/${type}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getUserNfts.success(data.tokens));
  } catch (err) {
    dispatch(actions.getUserNfts.failure(err));
  }
};