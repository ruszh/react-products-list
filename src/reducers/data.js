import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR
} from '../actions/DataActions';

import { SELECT_PRODUCT } from '../actions/ProductsListActions';
import { SELECT_SHOP } from '../actions/ShopsListActions';


const initialState = {
  lists: [],
  isLoading: true,
  error: ''
};

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, isLoading: action.payload, error: "" };

    case GET_DATA_SUCCESS:
      return {
        ...state,
        lists: action.payload,
        isLoading: false,
        error: ""
      };

    case GET_DATA_ERROR:
      return { ...state, isLoading: false, error: action.payload };

    case SELECT_PRODUCT:
      return {
          ...state,
          lists: {
                ...state.lists,
                products: state.lists.products.map(el => {
                if(el.id === Number(action.payload)) {
                  return { ...el, selected: !el.selected }
                }
                return el;
            })
          }

      };
      case SELECT_SHOP:
      return {
          ...state,
          lists: {
                ...state.lists,
                shops: state.lists.shops.map(el => {
                if(el.id === Number(action.payload)) {
                  return { ...el, selected: !el.selected }
                }
                return el;
            })
          }

      };

    default:
      return state;
  }
}