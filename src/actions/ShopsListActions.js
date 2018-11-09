export const SELECT_SHOP = 'SELECT_SHOP';
export const CHECK_UNCHECK_ALL_SHOPS = 'CHECK_UNCHECK_ALL_SHOPS';

export function selectShop(id) {
    return {
      type: SELECT_SHOP,
      payload: id
    }
}

export function checkUncheckAllShops(value) {
  return {
    type: CHECK_UNCHECK_ALL_SHOPS,
    payload: value
  }
}