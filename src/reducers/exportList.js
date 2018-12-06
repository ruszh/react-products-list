import { EXPORT_LIST } from '../constants';

export function exportReducer(state = { dataToExport: []}, action) {
    switch (action.type) {
        case EXPORT_LIST.success:
            return {
                dataToExport: [...action.payload]
            }
        default:
            return state;
    }
}