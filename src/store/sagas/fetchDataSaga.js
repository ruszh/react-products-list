import { put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
} from '../../actions/DataActions';
import DataService from '../../services/DataService';

function* fetchData(action) {
    try {
        const data = yield call(DataService.getData);
        yield put({ type: GET_DATA_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: GET_DATA_ERROR, payload: err })
    }
}

export function* watchFetchData() {
    yield takeEvery(GET_DATA_REQUEST, fetchData)
}
