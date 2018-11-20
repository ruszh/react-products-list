import { put, select, takeEvery } from 'redux-saga/effects';
import { createAction } from '../../utilities';

import {
    CHECK_UNCHECK_ALL_SHOPS,
    CHECK_UNCHECK_ALL_PRODUCTS,
    SELECT_PRODUCT,
    SELECT_SHOP } from '../../constants'

function* checkUncheckShops(action) {
    const store = yield select();
    const shops = [ ...store.data.lists.shops ];

    const checkedShops = shops.map(el => {
        const shop = { ...el };
        if(action.payload === 'check') {
          return { ...shop, selected: true }
        }
        return { ...shop, selected: false}
      });
    yield put(createAction(CHECK_UNCHECK_ALL_SHOPS.success)(checkedShops))
}

function* checkUncheckProducts(action) {
    const store = yield select();
    const products = [ ...store.data.lists.products ];
    const checkedProducts = products.map(el => {
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
      });
    yield put(createAction(CHECK_UNCHECK_ALL_PRODUCTS.success)(checkedProducts));
}

function* selectProduct(action) {
    const store = yield select();
    const products = [ ...store.data.lists.products ];
    const selectedProducts = products.map(el => {
        const product = { ...el }
      if(el.id === Number(action.payload)) {
        return { ...product, selected: !el.selected }
      }
      return product;
    });
    yield put(createAction(SELECT_PRODUCT.success)(selectedProducts));
}

function* selectShop(action) {
    const store = yield select();
    const shops = [ ...store.data.lists.shops ];
    const selectedShops = shops.map(el => {
        const shop = { ...el }
        if(el.id === Number(action.payload)) {
          return { ...shop, selected: !el.selected }
        }
        return shop;
    });

    yield put(createAction(SELECT_SHOP.success)(selectedShops))
}

export function* watchDataSaga() {
    yield takeEvery(CHECK_UNCHECK_ALL_SHOPS.request, checkUncheckShops);
    yield takeEvery(CHECK_UNCHECK_ALL_PRODUCTS.request, checkUncheckProducts);
    yield takeEvery(SELECT_PRODUCT.request, selectProduct);
    yield takeEvery(SELECT_SHOP.request, selectShop);
}