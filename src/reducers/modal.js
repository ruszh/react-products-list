//@flow
import { CLOSE_MODAL, OPEN_MODAL } from '../constants';
import type { Action } from '../utilities/types';

type State = {
    modalIsOpen: boolean,
    name: ?string
};

const initState: State = {
    modalIsOpen: false,
    name: null
};

export function modalReducer(state: State = initState, action: Action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalIsOpen: true,
                name: action.payload
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modalIsOpen: false,
                name: null
            };
        default:
            return state;
    }
}
