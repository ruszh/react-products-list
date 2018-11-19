export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const CHECK_UNCHECK_ALL_PRODUCTS = 'CHECK_UNCHECK_ALL_PRODUCTS';

export const selectProduct = (id) => ({ type: SELECT_PRODUCT, payload: id });
export const checkUncheckAllProducts = (value) => ({ type: CHECK_UNCHECK_ALL_PRODUCTS, payload: value });
