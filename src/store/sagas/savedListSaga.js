import SavedListService from '../../services/SavedListService';
import { put, call, select, takeEvery } from 'redux-saga/effects';
import { LOAD_LIST, SAVE_LIST, GET_LIST } from '../../constants';
import { createAction } from '../../utilities';

function* loadLists(action) {
    try {
        const result = yield call(SavedListService.loadLists, action.payload);
        if(result.error) {
            yield put(createAction(LOAD_LIST.error)(result.error))
            return;
        }
        yield put(createAction(LOAD_LIST.success)(result))
    } catch (err) {
        yield put(createAction(LOAD_LIST.error)(err))
    }
}

function* saveList(action) {
    try {
        const result = yield call(SavedListService.saveList, action.payload);
        if(result.success) {
            yield put(createAction(SAVE_LIST.success)(result.success));
            return;
        }
        yield put(createAction(SAVE_LIST.error)(result.error))
    } catch (err) {
        yield put(createAction(SAVE_LIST.error)(err))
    }
}

function* getList(action) {
    try {
        const result = yield call(SavedListService.getList, action.payload);
        if(result.error) {
            yield put(createAction(GET_LIST.error)(result.error))
            return;
        }

        const store = yield select();
        const lists = { ...store.data.lists };
        const list = result.list;
        const selectedLists = {
            products: lists.products.map(el => {
                const product = { ...el };
                if(list.products.indexOf(product.id) !== -1) {
                return { ...product, selected: true }
                }
                return { ...product, selected: false }
            }),
            shops: lists.shops.map(el => {
            const shop = { ...el };
            if(list.shops.indexOf(shop.id) !== -1) {
                return { ...shop, selected: true }
            }
            return { ...shop, selected: false }
            })
        };
        yield put(createAction(GET_LIST.success)(selectedLists));
    } catch (err) {
        yield put(createAction(GET_LIST.error)(err))
    }
}
export function* watchSavedList() {
    yield takeEvery(LOAD_LIST.request, loadLists);
    yield takeEvery(SAVE_LIST.request, saveList);
    yield takeEvery(GET_LIST.request, getList);
}

