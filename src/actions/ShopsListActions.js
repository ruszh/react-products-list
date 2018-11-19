export const SELECT_SHOP = 'SELECT_SHOP';
export const CHECK_UNCHECK_ALL_SHOPS = 'CHECK_UNCHECK_ALL_SHOPS';

export const selectShop = (id) => ({ type: SELECT_SHOP, payload: id });

export const checkUncheckAllShops = (value) => ({ type: CHECK_UNCHECK_ALL_SHOPS, payload: value });
