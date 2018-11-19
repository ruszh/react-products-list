export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';


export const SIGNIN = {
    REQUEST: 'SIGNIN_REQUEST'
}


export const VERIFICATION_REQUEST = 'VERIFICATION_REQUEST';
export const VERIFICATION_SUCCESS = 'VERIFICATION_SUCCESS';
export const VERIFICATION_ERROR = 'VERIFICATION_ERROR';

export const LOGOUT = 'LOGOUT';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';


export const signinRequest = (user) => ({ type: SIGNIN_REQUEST, payload: user });
export const verificationRequest = () => ({ type: VERIFICATION_REQUEST });
export const signupRequest = (user) => ({ type: SIGNUP_REQUEST, payload: user});


export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT
    }
}