import { put, call, takeEvery } from 'redux-saga/effects';
import { dataSuccess, dataError, GET_DATA_REQUEST } from '../../actions/DataActions';
import DataService from '../../services/DataService';

function* fetchData(action) {
    try {
        const data = yield call(DataService.getData);
        yield put(dataSuccess(data))
    } catch (err) {
        yield put(dataError(err))
    }
}

export function* watchFetchData() {
    yield takeEvery(GET_DATA_REQUEST, fetchData)
}
