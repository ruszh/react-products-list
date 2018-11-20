import { CLOSE_MODAL, OPEN_MODAL } from '../constants';

const initState = {
    modalIsOpen: false,
    name: null
}

export function modalReducer(state = initState, action) {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalIsOpen: true,
                name: action.payload
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modalIsOpen: false,
                name: null
            }
        default:
            return state;
    }
}