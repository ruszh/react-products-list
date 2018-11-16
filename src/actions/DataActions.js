export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';

export const dataRequest = () => {
  return {
    type: GET_DATA_REQUEST
  }
}

export const dataSuccess = (data) => {
  return {
    type: GET_DATA_SUCCESS,
    payload: data
  }
}

export const dataError = (err) => {
  return {
    type: GET_DATA_ERROR,
    payload: err
  }
}

