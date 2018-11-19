import {
    LOAD_LIST_SUCCESS,
    LOAD_LIST_ERROR,
    SAVE_LIST_SUCCESS,
    SAVE_LIST_ERROR
} from '../actions/SavedListActions';

const initState = {
    error: '',
    success: '',
    listsArr: [],
    current: 1,
    pages: 1,
    sort: 'listName'
};

export function savedListReducer(state = initState, action) {
    switch(action.type) {
        case SAVE_LIST_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case SAVE_LIST_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LOAD_LIST_SUCCESS:
            return {
                ...state,
                current: action.payload.current,
                pages: action.payload.pages,
                listsArr: action.payload.lists,
                sort: action.payload.sort
            }
        case LOAD_LIST_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}