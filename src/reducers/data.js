import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR
} from '../actions/DataActions';

import { SELECT_PRODUCT, CHECK_UNCHECK_ALL_PRODUCTS } from '../actions/ProductsListActions';
import { SELECT_SHOP, CHECK_UNCHECK_ALL_SHOPS } from '../actions/ShopsListActions';


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
                  const product = { ...el }
                if(el.id === Number(action.payload)) {
                  return { ...product, selected: !el.selected }
                }
                return product;
            })
          }

      };
      case SELECT_SHOP:
      return {
          ...state,
          lists: {
                ...state.lists,
                shops: state.lists.shops.map(el => {
                const shop = { ...el }
                if(el.id === Number(action.payload)) {
                  return { ...shop, selected: !el.selected }
                }
                return shop;
            })
          }

      };
      case CHECK_UNCHECK_ALL_PRODUCTS:
          return {
            ...state,
            lists: {
              ...state.lists,
              products: state.lists.products.map(el => {
                const product = { ...el }
                if(action.payload.option === 'check') {
                  if(action.payload.arr.indexOf(el.id) !== -1) {
                    return { ...product, selected: true }
                  }
                  return { ...product }
                } else if(action.payload.option === 'uncheck') {
                  if(action.payload.arr.indexOf(el.id) !== -1) {
                    return { ...product, selected: false}
                  }
                  return { ...product }
                } else if(action.payload.option === 'check-all') {
                  return { ...product, selected: true }
                } else {
                  return { ...product, selected: false }
                }

              })
            }
          };
      case CHECK_UNCHECK_ALL_SHOPS:
          return {
            ...state,
            lists: {
              ...state.lists,
              shops: state.lists.shops.map(el => {
                const shop = { ...el };
                if(action.payload === 'check') {
                  return { ...shop, selected: true }
                }
                return { ...shop, selected: false}
              })
            }
      };

    default:
      return state;
  }
}