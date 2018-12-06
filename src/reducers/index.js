import { combineReducers } from 'redux';
import { dataReducer } from './data';
import { authReducer } from './auth';
import { savedListReducer } from './savedList';
import { modalReducer } from './modal';
import { alertReducer } from './alert';
import { connectRouter } from 'connected-react-router';
import { exportReducer } from './exportList';

import { reducer as formReducer } from 'redux-form';

export const rootReducer = history => combineReducers({
    router: connectRouter(history),
    data: dataReducer,
    auth: authReducer,
    savedList: savedListReducer,
    modal: modalReducer,
    form: formReducer,
    alert: alertReducer,
    export: exportReducer
})