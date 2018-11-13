import AuthService from '../services/AuthService';

export const SIGNIN_USER = 'SIGNIN_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const VERIFICATION_SUCCESS = 'VERIFICATION_SUCCESS';
export const VERIFICATION_ERROR = 'VERIFICATION_ERROR';
export const LOGOUT = 'LOGOUT';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';


export function signin(user) {
    return async dispatch => {
        const response = await AuthService.signin(user);

        if(response.success) {
            const signinUser = {
                id: response.data._id,
                email: response.data.email
            }
            localStorage.setItem('token', response.token);
            return dispatch({
                type: SIGNIN_USER,
                payload: signinUser
            });
        }
        dispatch({
            type: AUTH_ERROR,
            payload: response.error
        })
    }
}


export function verify() {
    return async dispatch => {
        const response = await AuthService.virification();

        if(response.error) {
            return dispatch({
                type: VERIFICATION_ERROR,
                payload: response.error
            })
        }
        return dispatch({
            type: VERIFICATION_SUCCESS,
            payload: response.user
        })
    }
}

export function signup(user) {
    return async dispatch => {
        const result = await AuthService.signup(user);

        if(result.success) {
            return dispatch({
                type: SIGNUP_SUCCESS,
                payload: result.success
            });
        }
        return dispatch({
            type: SIGNUP_ERROR,
            payload: result.error
        });
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT,
        payload: true
    }
}