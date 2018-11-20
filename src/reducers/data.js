import {
    GET_DATA,
    GET_LIST,
    SELECT_PRODUCT,
    CHECK_UNCHECK_ALL_PRODUCTS,
    SELECT_SHOP,
    CHECK_UNCHECK_ALL_SHOPS } from '../constants';

const initialState = {
  lists: [],
  isLoading: true,
  error: ''
};

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA.request:
      return {
        ...state,
        isLoading: true
      };

    case GET_DATA.success:
      return {
        ...state,
        lists: action.payload,
        isLoading: false,
        error: ""
      };

    case GET_DATA.error:
      return { ...state, isLoading: false, error: action.payload };

    case SELECT_PRODUCT.success:
      return {
          ...state,
          lists: {
                ...state.lists,
                products: action.payload
          }
      };
      case SELECT_SHOP.success:
      return {
          ...state,
          lists: {
                ...state.lists,
                shops: action.payload
          }

      };
      case CHECK_UNCHECK_ALL_PRODUCTS.success:
          return {
            ...state,
            lists: {
              ...state.lists,
              products: action.payload
            }
          };
      case CHECK_UNCHECK_ALL_SHOPS.success:
          return {
            ...state,
            lists: {
              ...state.lists,
              shops: action.payload
            }
      };
      case GET_LIST.success:
          return {
            ...state,
            lists: action.payload
          }
        case GET_LIST.error:
          return {
            ...state,
            error: action.payload
          }

    default:
      return state;
  }
}