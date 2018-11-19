export const LOAD_LIST_REQUEST = 'LOAD_LIST_REQUEST';
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS';
export const LOAD_LIST_ERROR = 'LOAD_LISTS_ERROR';

export const SAVE_LIST_REQUEST = 'SAVE_LIST_REQUEST';
export const SAVE_LIST_SUCCESS = 'SAVE_LIST_SUCCESS';
export const SAVE_LIST_ERROR = 'SAVE_LIST_ERROR';

export const GET_LIST_REQUEST = 'GET_LIST_REQUEST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_ERROR = 'GET_LIST_ERROR';

export const loadListsRequest = (option) => ({ type: LOAD_LIST_REQUEST, payload: option });
export const saveListRequest = (listObj) => ({ type: SAVE_LIST_REQUEST, payload: listObj});
export const getListRequest = (listId) => ({ type: GET_LIST_REQUEST, payload: listId });

