import { all } from 'redux-saga/effects';
import { watchFetchData } from './fetchDataSaga';


export default function* rootSaga() {
    yield all([
        watchFetchData()
    ])
}
