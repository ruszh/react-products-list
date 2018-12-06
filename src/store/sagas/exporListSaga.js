import { put, select, takeEvery } from 'redux-saga/effects';
import { createAction } from '../../utilities';

import { EXPORT_LIST } from '../../constants';

//filter selected products to arr;
//create function selectShops(product.id), that check, in what shops this product is
//(function returns string with shops);
//

const selectShops = (prodId, shops) => {
    const result = shops.reduce((acc, shop) => {
        if (shop.productsids.includes(prodId)) {
            acc.push(shop.name);
        }
        return acc;
    }, []);
    return result.join(', ');
};

function* createDataToExport(action) {
    const selectedProductsIds = action.payload;
    const lists = yield select(state => state.data.lists);
    const selectedProducts = lists.products.filter(el =>
        selectedProductsIds.includes(el.id)
    );

    const dataToExport = selectedProducts.reduce((acc, prod) => {
        const prodArr = [prod.name];
        prodArr.push(selectShops(prod.id, lists.shops));
        acc.push(prodArr);

        return acc;
    }, [['Products', 'Shops']]);

    yield put(createAction(EXPORT_LIST.success)(dataToExport));
}
export function* watchExportSaga() {
    yield takeEvery(EXPORT_LIST.request, createDataToExport);
}
