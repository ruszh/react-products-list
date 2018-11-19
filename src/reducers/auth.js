import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    VERIFICATION_REQUEST,
    VERIFICATION_SUCCESS,
    VERIFICATION_ERROR,
    LOGOUT,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
 } from '../actions/AuthActions';

const initState = {
    user: {},
    login: false,
    error: '',
    message: '',
    formIsValid: true,
    isLoading: true
}

export function authReducer(state = initState, action) {
    switch(action.type) {
        case SIGNIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                login: true,
                error: '',
                isLoading: false,
                formIsValid: true
            }
        case SIGNIN_ERROR:
            return {
                ...state,
                user: {},
                login: false,
                error: action.payload,
                isLoading: false,
                formIsValid: false
            }

        case VERIFICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case VERIFICATION_SUCCESS:
            return {
                ...state,
                error: '',
                user: action.payload,
                login: true,
                isLoading: false
            }
        case VERIFICATION_ERROR:
            return {
                ...state,
                error: action.payload,
                user: {},
                login: false,
                isLoading: false
            }
        case LOGOUT:
            return {
                ...state,
                error: '',
                user: {},
                login: false
            }
        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                error: '',
                message: action.payload,
                isLoading: false
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                message: '',
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}