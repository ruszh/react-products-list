import { takeEvery } from 'redux-saga/effects';

import { EXPORT_LIST } from '../../constants';

function createDataToExport(action) {
    const data = action.payload;
    const dataToConvert = data.map(function (row, index) {
        return row.map(function (element) {
          return "\"" + element + "\"";
        }).join(',');
      }).join("\n");

    let csvContent = 'data:text/csv;charset=utf-8, ' + dataToConvert;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');

    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
}
export function* watchExportSaga() {
    yield takeEvery(EXPORT_LIST.request, createDataToExport);
}
