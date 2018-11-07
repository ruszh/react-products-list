export const SELECT_PRODUCT = 'SELECT_PRODUCT';

export function selectProduct(id) {
    return {
      type: SELECT_PRODUCT,
      payload: id
    }
}