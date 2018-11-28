//@flow
import {
    GET_DATA,
    GET_LIST,
    SELECT_PRODUCT,
    CHECK_UNCHECK_ALL_PRODUCTS,
    SELECT_SHOP,
    CHECK_UNCHECK_ALL_SHOPS
} from '../constants';
import type { Action } from '../utilities/types';
import type { Lists } from '../containers/Dashboard/types';


type State = {
    lists: Lists,
    isLoading: boolean,
    error: string
};

const initialState: State = {
    lists: { shops: [], products: []},
    isLoading: true,
    error: ''
};

export function dataReducer(state: State = initialState, action: Action) {
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
                error: ''
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
            };
        case GET_LIST.error:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}
