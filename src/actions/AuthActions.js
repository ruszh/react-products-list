import AuthService from '../services/AuthService';

export const SIGNIN_USER = 'SIGNIN_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const VERIFICATION_SUCCESS = 'VERIFICATION_SUCCESS';
export const VERIFICATION_ERROR = 'VERIFICATION_ERROR';
export const LOGOUT = 'LOGOUT';


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

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT,
        payload: true
    }
}