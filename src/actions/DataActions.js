import DataService from '../services/DataService';

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';

export function getData() {
  return async dispatch => {
    dispatch({
      type: GET_DATA_REQUEST,
      payload: true
    });
    try {
      const data = await DataService.getData();

      dispatch({
        type: GET_DATA_SUCCESS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: err
      });
    }
  }

}