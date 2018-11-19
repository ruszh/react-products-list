import { put, call, takeEvery } from 'redux-saga/effects';
import {
    SIGNIN_ERROR,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,

    VERIFICATION_ERROR,
    VERIFICATION_REQUEST,
    VERIFICATION_SUCCESS,

    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
} from '../../actions/AuthActions';
import AuthService from '../../services/AuthService';

function* signin(action) {
    try {
        const response = yield call(AuthService.signin, action.payload)
        if(response.success) {
            const signinUser = {
                _id: response.data._id,
                email: response.data.email
            }
            localStorage.setItem('token', response.token);
            yield put({ type: SIGNIN_SUCCESS, payload: signinUser});
            return;
        }
        yield put({ type: SIGNIN_ERROR, payload: response.error })
    } catch (err) {
        yield put({ type: SIGNIN_ERROR, payload: err})
    }
}

function* verify() {
    try {
        const response = yield call(AuthService.virification);
        if(response.error) {
            yield put({ type: VERIFICATION_ERROR, payload: response.error });
            return;
        }
        yield put({ type: VERIFICATION_SUCCESS, payload: response.user })

    } catch (err) {
        yield put({ type: VERIFICATION_ERROR, payload: err })
    }
}

function* signup(action) {
    try {
        const result = yield call(AuthService.signup, action.payload);
        if(result.success) {
            yield put({ type: SIGNUP_SUCCESS, payload: result.success })
            return;
        }
        yield put({ type: SIGNUP_ERROR, payload: result.error})
    } catch (err) {
        yield put({ type: SIGNUP_ERROR, payload: err})
    }
}


export function* watchAuth() {
    yield takeEvery(SIGNIN_REQUEST, signin);
    yield takeEvery(VERIFICATION_REQUEST, verify);
    yield takeEvery(SIGNUP_REQUEST, signup);
}