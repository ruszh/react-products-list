import { map, mergeMap, catchError, delay, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { combineEpics } from 'redux-observable';

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
import { push as navigate } from 'connected-react-router';

const signinEpic = (action$, state$) =>
    action$.pipe(
        ofType(SIGNIN.request),
        mergeMap(action => {
            const { email, password } = state$.value.form.login.values;
            return from(AuthService.signin({ email, password })).pipe(
                switchMap(response => {
                    if (response.success) {
                        const signinUser = {
                            _id: response.data._id,
                            email: response.data.email,
                            name: response.data.name
                        };
                        localStorage.setItem('token', response.token);
                        return [
                            createAction(SIGNIN.success)(signinUser),
                            navigate('/dashboard')
                        ];
                    }
                    return [
                        createAction(SIGNIN.error)(response.error),
                        createAction(ALERT_ERROR.request)(response.error)
                    ];
                }),
                catchError(err =>
                    of(createAction(SIGNIN.error)(err))
                )
            );
        })
    );

const alertEpic = action$ =>
    action$.pipe(
        ofType(ALERT_ERROR.request),
        map(() => createAction(ALERT_ERROR.success)()),
        delay(2000)
    );
const alertSuccessEpic = action$ =>
    action$.pipe(
        ofType(ALERT_SUCCESS.request),
        map(() => createAction(ALERT_SUCCESS.success)()),
        delay(2000)
    );

const verifyEpic = (action$, state$) =>
    action$.pipe(
        ofType(VERIFICATION.request),
        mergeMap(action =>
            from(AuthService.verification()).pipe(
                switchMap(response => {
                    if (response.error) {
                        return [
                            createAction(VERIFICATION.error)(response.error),
                            createAction(ALERT_ERROR.request)(response.error),
                            navigate('/')
                        ];
                    }

                    const actions = [
                        createAction(VERIFICATION.success)(response.user)
                    ];
                    const location = state$.value.router.location.pathname;
                    const rootLocation = location === '/';

                    if (rootLocation) actions.push(navigate('/dashboard'));

                    return actions;
                }),
                catchError(err => of(createAction(VERIFICATION.error)(err)))
            )
        )
    );

const logoutEpic = action$ =>
    action$.pipe(
        ofType(LOGOUT.request),
        switchMap(action => {
            localStorage.removeItem('token');
            return [createAction(LOGOUT.success)(), navigate('/')];
        })
    );

const signupEpic = (action$, state$) =>
    action$.pipe(
        ofType(SIGNUP.request),
        mergeMap(action => {
            const {
                email,
                password,
                name
            } = state$.value.form.registration.values;
            return from(
                AuthService.signup({
                    email: email.toLowerCase(),
                    password,
                    name
                })
            ).pipe(
                switchMap(response => {
                    if (response.success) {
                        return [
                            createAction(SIGNUP.success)(response.success),
                            createAction(ALERT_SUCCESS.request)(response.success)
                        ];
                    }
                    return [
                        createAction(SIGNUP.error)(response.error),
                        createAction(ALERT_ERROR.request)(response.error)
                    ];
                }),
                catchError(err => of(createAction(SIGNUP.error)(err)))
            );
        })
    );

export const authEpics = combineEpics(
    signinEpic,
    verifyEpic,
    logoutEpic,
    signupEpic,
    alertEpic,
    alertSuccessEpic
);
