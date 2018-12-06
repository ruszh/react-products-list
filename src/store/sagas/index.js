import { all } from 'redux-saga/effects';
import { watchFetchData } from './fetchDataSaga';
//import { watchAuth } from './authSaga';
import { watchSavedList } from './savedListSaga';
import { watchDataSaga } from './dataSaga';
import { watchExportSaga } from './exporListSaga';

export default function* rootSaga() {
    yield all([
        watchFetchData(),
        //watchAuth(),
        watchSavedList(),
        watchDataSaga(),
        watchExportSaga()
    ])
}
