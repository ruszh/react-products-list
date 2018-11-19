import SavedListService from '../../services/SavedListService';
import { put, call, takeEvery } from 'redux-saga/effects';

import {
    LOAD_LIST_REQUEST,
    LOAD_LIST_SUCCESS,
    LOAD_LIST_ERROR,

    SAVE_LIST_REQUEST,
    SAVE_LIST_SUCCESS,
    SAVE_LIST_ERROR,

    GET_LIST_REQUEST,
    GET_LIST_SUCCESS,
    GET_LIST_ERROR
} from '../../actions/SavedListActions';

function* loadLists(action) {
    try {
        const result = yield call(SavedListService.loadLists, action.payload);
        if(result.error) {
            yield put({ type: LOAD_LIST_ERROR, payload: result.error})
            return;
        }
        yield put({ type: LOAD_LIST_SUCCESS, payload: result })
    } catch (err) {
        yield put({ type: LOAD_LIST_SUCCESS, payload: err })
    }
}

function* saveList(action) {
    try {
        const result = yield call(SavedListService.saveList, action.payload);
        if(result.success) {
            yield put({ type:SAVE_LIST_SUCCESS, payload: result.success });
            return;
        }
        yield put({ type: SAVE_LIST_ERROR, payload: result.error })
    } catch (err) {
        yield put({ type: SAVE_LIST_ERROR, payload: err })
    }
}

function* getList(action) {
    try {
        const result = yield call(SavedListService.getList, action.payload);
        if(result.error) {
            yield put({ type: GET_LIST_ERROR, payload: result.error})
            return;
        }
        yield put({ type: GET_LIST_SUCCESS, payload: result })
    } catch (err) {
        yield put({ type: GET_LIST_SUCCESS, payload: err })
    }
}
export function* watchSavedList() {
    yield takeEvery(LOAD_LIST_REQUEST, loadLists);
    yield takeEvery(SAVE_LIST_REQUEST, saveList);
    yield takeEvery(GET_LIST_REQUEST, getList);
}

