export const SELECT_SHOP = 'SELECT_SHOP';

export function selectShop(id) {
    return {
      type: SELECT_SHOP,
      payload: id
    }
}