import SavedListService from '../services/SavedListService';

export const LOAD_LISTS = 'LOAD_LISTS';
export const LOAD_LISTS_ERROR = 'LOAD_LISTS_ERROR';

export const SAVE_LIST = 'SAVE_LIST';
export const SAVE_LIST_ERROR = 'SAVE_LIST_ERROR';


export function loadLists(option) {
    return async dispatch => {
        const result = await SavedListService.loadLists(option);

        if(result) {
            return dispatch({
                type: LOAD_LISTS,
                payload: result
            })
        }

        return dispatch({
            type: LOAD_LISTS_ERROR,
            payload: 'Lists not found'
        })
    }
}

export function saveList(listObj) {
    return async dispatch => {
        const result = await SavedListService.saveList(listObj);
        if(result.success) {
            return dispatch({
                type: SAVE_LIST,
                payload: result.success
            })
        }
        return dispatch({
            type: SAVE_LIST_ERROR,
            payload: result.error
        })
    }
}