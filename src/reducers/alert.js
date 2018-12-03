//@flow
import { ALERT_ERROR, ALERT_SUCCESS } from '../constants';
import type { Action } from '../utilities/types';

type State = {
    type: string,
    message: string
};

const initialState: State = {
    type: '',
    message: ''
};

export function alertReducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case ALERT_ERROR.request:
            return {
                type: 'error',
                message: action.payload
            };
        case ALERT_ERROR.success:
            return {
                type: '',
                message: ''
            };
        case ALERT_SUCCESS.request:
            return {
                type: 'success',
                message: action.payload
            };
        case ALERT_SUCCESS.success:
            return {
                type: '',
                message: ''
            };
        default:
            return state;
    }
}
