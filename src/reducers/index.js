import { combineReducers } from 'redux';
import { dataReducer } from './data';
import { authReducer } from './auth';
import { savedListReducer } from './savedList';
import { modalReducer } from './modal';
import { connectRouter } from 'connected-react-router';


export const rootReducer = history => combineReducers({
    router: connectRouter(history),
    data: dataReducer,
    auth: authReducer,
    savedList: savedListReducer,
    modal: modalReducer
})