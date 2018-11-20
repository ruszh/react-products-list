import { put, call, takeEvery } from 'redux-saga/effects';

import { GET_DATA } from '../../constants';
import DataService from '../../services/DataService';

import { createAction } from '../../utilities';

function* fetchData(action) {
    try {
        const data = yield call(DataService.getData);
        yield put(createAction(GET_DATA.success)(data))
    } catch (err) {
        yield put(createAction(GET_DATA.error)(err))
    }
}

export function* watchFetchData() {
    yield takeEvery(GET_DATA.request, fetchData)
}
