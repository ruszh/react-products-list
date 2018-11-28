//@flow
import {
    SIGNIN,
    VERIFICATION,
    SIGNUP,
    LOGOUT,
    ALERT_ERROR,
    ALERT_SUCCESS
} from '../constants';
import type { Action } from '../utilities/types';

type State = {
    user: Object,
    login: boolean,
    error: string,
    message: string,
    formIsValid: boolean,
    isLoading: boolean
}

const initState: State = {
    user: {},
    login: false,
    error: '',
    message: '',
    formIsValid: true,
    isLoading: true
};

export function authReducer(state: State = initState, action: Action) {
    switch (action.type) {
        case SIGNIN.request:
            return {
                ...state,
                isLoading: true
            };
        case SIGNIN.success:
            return {
                ...state,
                user: action.payload,
                login: true,
                error: '',
                isLoading: false,
                formIsValid: true
            };
        case SIGNIN.error:
            return {
                ...state,
                user: {},
                login: false,
                error: action.payload,
                isLoading: false,
                formIsValid: false
            };

        case VERIFICATION.request:
            return {
                ...state,
                isLoading: true
            };
        case VERIFICATION.success:
            return {
                ...state,
                error: '',
                user: action.payload,
                login: true,
                isLoading: false
            };
        case VERIFICATION.error:
            return {
                ...state,
                error: action.payload,
                user: {},
                login: false,
                isLoading: false
            };
        case LOGOUT.success:
            return {
                ...state,
                error: '',
                user: {},
                login: false
            };
        case SIGNUP.request:
            return {
                ...state,
                isLoading: true
            };
        case SIGNUP.success:
            return {
                ...state,
                error: '',
                isLoading: false,
                formIsValid: true
            };
        case SIGNUP.error:
            return {
                ...state,
                message: '',
                isLoading: false
            };
        case ALERT_ERROR:
            return {
                ...state,
                message: '',
                error: action.payload
            };
        case ALERT_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: ''
            };
        default:
            return state;
    }
}
