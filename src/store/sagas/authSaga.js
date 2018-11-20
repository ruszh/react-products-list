import { put, call, takeEvery } from 'redux-saga/effects';

import { SIGNIN, VERIFICATION, SIGNUP, LOGOUT } from '../../constants';
import { createAction } from '../../utilities';
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
            return yield put(createAction(SIGNIN.success)(signinUser));
        }
        yield put(createAction(SIGNIN.error)(response.error))
    } catch (err) {
        yield put(createAction(SIGNIN.error)(err))
    }
}

function* verify() {
    try {
        const response = yield call(AuthService.virification);
        if(response.error) {
            return yield put(createAction(VERIFICATION.error)(response.error));
        }
        yield put(createAction(VERIFICATION.success)(response.user))

    } catch (err) {
        yield put(createAction(VERIFICATION.error)(err))
    }
}

function* signup(action) {
    try {
        const result = yield call(AuthService.signup, action.payload);
        if(result.success) {
            return yield put(createAction(SIGNUP.success)(result.success))
        }
        yield put(createAction(SIGNUP.error)(result.error))
    } catch (err) {
        yield put(createAction(SIGNUP.error)(err))
    }
}

function* logout() {
    localStorage.removeItem('token');
    yield put(createAction(LOGOUT.success)())
}

export function* watchAuth() {
    yield takeEvery(SIGNIN.request, signin);
    yield takeEvery(VERIFICATION.request, verify);
    yield takeEvery(SIGNUP.request, signup);
    yield takeEvery(LOGOUT.request, logout);
}