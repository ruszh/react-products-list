//@flow
import { LOAD_LIST, SAVE_LIST, DELETE_LIST, RENAME_LIST } from '../constants';
import type { Lists } from '../containers/Dashboard/types';

type State = {
    error: string,
    success: string,
    listsArr: Array<any>,
    current: number,
    pages: number,
    sort: string
};

const initState: State = {
    error: '',
    success: '',
    listsArr: [],
    current: 1,
    pages: 1,
    sort: 'listName'
};

type Payload = {
    current: number,
    pages: number,
    lists: Lists,
    sort: string
};

type Action = {
    type: string,
    payload: Payload
};

export function savedListReducer(state: State = initState, action: Action) {
    switch (action.type) {
        case SAVE_LIST.success:
            return {
                ...state,
                success: action.payload
            };
        case SAVE_LIST.error:
            return {
                ...state,
                error: action.payload
            };
        case LOAD_LIST.success:
            return {
                ...state,
                current: action.payload.current,
                pages: action.payload.pages,
                listsArr: action.payload.lists,
                sort: action.payload.sort
            };
        case LOAD_LIST.error:
            return {
                ...state,
                error: action.payload
            };
        case DELETE_LIST.success:
            return {
                ...state,
                error: '',
                success: action.payload
            };
        case DELETE_LIST.error:
            return {
                ...state,
                error: action.payload,
                success: ''
            };
        case RENAME_LIST.success:
            return {
                ...state,
                error: '',
                success: action.payload
            };
        case RENAME_LIST.error:
            return {
                ...state,
                success: '',
                error: action.payload
            };

        default:
            return state;
    }
}
