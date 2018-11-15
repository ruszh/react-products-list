import {
    LOAD_LISTS,
    LOAD_LISTS_ERROR,
    SAVE_LIST,
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
        case SAVE_LIST:
            return {
                ...state,
                success: action.payload
            }
        case SAVE_LIST_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LOAD_LISTS:
            return {
                ...state,
                current: action.payload.current,
                pages: action.payload.pages,
                listsArr: action.payload.lists,
                sort: action.payload.sort
            }
        case LOAD_LISTS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}