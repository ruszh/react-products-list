
import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

import {
    SIGNIN,
    VERIFICATION,
    SIGNUP,
    LOGOUT,
    ALERT_ERROR,
    ALERT_SUCCESS
} from '../../constants';
import { createAction } from '../../utilities';
import AuthService from '../../services/AuthService';

// import type { Action } from '../../utilities/types';
// type Result = {
//     success: string,
//     data: { _id: string, email: string, name: string },
//     user: Object,
//     error: any,
//     token: string
// };

function* signin(action) {
    try {
        const response = yield call(AuthService.signin, action.payload);
        if (response.success) {
            const signinUser = {
                _id: response.data._id,
                email: response.data.email,
                name: response.data.name
            };
            localStorage.setItem('token', response.token);
            return yield put(createAction(SIGNIN.success)(signinUser));
        }
        yield put(createAction(SIGNIN.error)(response.error));
        yield call(showAlert, { type: 'error', message: response.error });
    } catch (err) {
        yield put(createAction(SIGNIN.error)(err));
    }
}

function* showAlert(option) {
    const { type, message } = option;
    if (type === 'success') {
        yield put(createAction(ALERT_SUCCESS)(message));
        yield call(delay, 2000);
        yield put(createAction(ALERT_SUCCESS)(''));
    } else {
        yield put(createAction(ALERT_ERROR)(message));
        yield call(delay, 2000);
        yield put(createAction(ALERT_ERROR)(''));
    }
}

function* verify() {
    try {
        const response = yield call(AuthService.verification);
        if (response.error) {
            yield put(createAction(VERIFICATION.error)(response.error));
            return yield call(showAlert, {
                type: 'error',
                message: response.error
            });
        }
        yield put(createAction(VERIFICATION.success)(response.user));
    } catch (err) {
        yield put(createAction(VERIFICATION.error)(err));
    }
}

function* signup(action) {
    try {
        const result= yield call(AuthService.signup, action.payload);
        if (result.success) {
            yield put(createAction(SIGNUP.success)(result.success));
            return yield call(showAlert, {
                type: 'success',
                message: result.success
            });
        }
        yield put(createAction(SIGNUP.error)(result.error));
        yield call(showAlert, { type: 'error', message: result.error });
    } catch (err) {
        yield put(createAction(SIGNUP.error)(err));
    }
}

function* logout() {
    localStorage.removeItem('token');
    yield put(createAction(LOGOUT.success)());
}

export function* watchAuth() {
    yield takeEvery(SIGNIN.request, signin);
    yield takeEvery(VERIFICATION.request, verify);
    yield takeEvery(SIGNUP.request, signup);
    yield takeEvery(LOGOUT.request, logout);
}
