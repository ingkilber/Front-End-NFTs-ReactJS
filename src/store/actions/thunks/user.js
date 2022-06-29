import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const getUser = (id) => async (dispatch) => {

  dispatch(actions.getUser.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`/user/${id}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getUser.success(data));
  } catch (err) {
    dispatch(actions.getUser.failure(err));
  }
};