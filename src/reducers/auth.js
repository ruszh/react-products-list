import {
    SIGNIN_USER,
    AUTH_ERROR,
    VERIFICATION_SUCCESS,
    VERIFICATION_ERROR,
    LOGOUT
 } from '../actions/AuthActions';

const initState = {
    user: {},
    login: false,
    error: ''
}

export function authReducer(state = initState, action) {
    switch(action.type) {
        case SIGNIN_USER:
            return {
                ...state,
                user: action.payload,
                login: true,
                error: ''
            }
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload,
                user: {},
                login: false
            }
        case VERIFICATION_SUCCESS:
            return {
                ...state,
                error: '',
                user: action.payload,
                login: true
            }
        case VERIFICATION_ERROR:
            return {
                ...state,
                error: '',
                user: {},
                login: false
            }
        case LOGOUT:
            return {
                ...state,
                error: '',
                user: {},
                login: false
            }
        default:
            return state;
    }
}