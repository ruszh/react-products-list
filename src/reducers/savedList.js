import { LOAD_LIST, SAVE_LIST } from '../constants';

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
        case SAVE_LIST.success:
            return {
                ...state,
                success: action.payload
            }
        case SAVE_LIST.error:
            return {
                ...state,
                error: action.payload
            }
        case LOAD_LIST.success:
            return {
                ...state,
                current: action.payload.current,
                pages: action.payload.pages,
                listsArr: action.payload.lists,
                sort: action.payload.sort
            }
        case LOAD_LIST.error:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}