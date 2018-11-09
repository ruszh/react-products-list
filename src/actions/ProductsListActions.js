export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const CHECK_UNCHECK_ALL_PRODUCTS = 'CHECK_UNCHECK_ALL_PRODUCTS';

export function selectProduct(id) {
    return {
      type: SELECT_PRODUCT,
      payload: id
    }
}

export function checkUncheckAllProducts(value) {
  return {
    type: CHECK_UNCHECK_ALL_PRODUCTS,
    payload: value
  }
}