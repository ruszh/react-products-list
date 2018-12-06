import SavedListService from '../../services/SavedListService';
import { put, call, select, takeEvery } from 'redux-saga/effects';
import {
    LOAD_LIST,
    SAVE_LIST,
    GET_LIST,
    DELETE_LIST,
    ALERT_ERROR,
    RENAME_LIST,
    ALERT_SUCCESS
} from '../../constants';
import { createAction } from '../../utilities';

function* loadLists(action) {
    let option;
    if (!action.payload) {
        const store = yield select();
        const userId = store.auth.user._id;
        const { current, sort } = store.savedList;
        option = {
            userId,
            page: current,
            sort
        };
    } else {
        option = action.payload;
    }

    try {
        const result = yield call(SavedListService.loadLists, option);
        if (result.error) {
            yield put(createAction(LOAD_LIST.error)(result.error));
            return;
        }
        yield put(createAction(LOAD_LIST.success)(result));
    } catch (err) {
        yield put(createAction(LOAD_LIST.error)(err));
    }
}

function* saveList(action) {
    try {
        const result = yield call(SavedListService.saveList, action.payload);
        if (result.success) {
            yield put(createAction(SAVE_LIST.success)(result.success));
            return yield put(createAction(ALERT_SUCCESS.request)(result.success));
        }
        yield put(createAction(SAVE_LIST.error)(result.error));
        yield put(createAction(ALERT_ERROR.request)(result.error));
    } catch (err) {
        yield put(createAction(SAVE_LIST.error)(err));
    }
}

function* getList(action) {
    try {
        const result = yield call(SavedListService.getList, action.payload);
        if (result.error) {
            yield put(createAction(GET_LIST.error)(result.error));
            return;
        }

        const store = yield select();
        const lists = { ...store.data.lists };
        const list = result.list;
        const selectedLists = {
            products: lists.products.map(el => {
                const product = { ...el };
                if (list.products.indexOf(product.id) !== -1) {
                    return { ...product, selected: true };
                }
                return { ...product, selected: false };
            }),
            shops: lists.shops.map(el => {
                const shop = { ...el };
                if (list.shops.indexOf(shop.id) !== -1) {
                    return { ...shop, selected: true };
                }
                return { ...shop, selected: false };
            })
        };
        yield put(createAction(GET_LIST.success)(selectedLists));
    } catch (err) {
        yield put(createAction(GET_LIST.error)(err));
    }
}

function* deleteList(action) {
    try {
        const result = yield call(SavedListService.deleteList, action.payload);
        yield put(createAction(DELETE_LIST.success)(result.success));
        yield put(createAction(ALERT_SUCCESS.request)(result.success));
        return yield put(createAction(LOAD_LIST.request)());
    } catch (err) {
        yield put(createAction(DELETE_LIST.error)(err));
    }
}

function* renameList(action) {
    try {
        const result = yield call(SavedListService.renameList, action.payload);
        if(result.success) {
            yield put(createAction(RENAME_LIST.success)());
            yield put(createAction(ALERT_SUCCESS.request)(result.success))
            return yield put(createAction(LOAD_LIST.request)());
        }
        yield put(createAction(RENAME_LIST.error)(result.error));
        yield put(createAction(ALERT_ERROR.request)(result.error))
    } catch (err) {
        yield put(createAction(RENAME_LIST.error)(err));

    }
}

export function* watchSavedList() {
    yield takeEvery(LOAD_LIST.request, loadLists);
    yield takeEvery(SAVE_LIST.request, saveList);
    yield takeEvery(GET_LIST.request, getList);
    yield takeEvery(DELETE_LIST.request, deleteList);
    yield takeEvery(RENAME_LIST.request, renameList);
}
