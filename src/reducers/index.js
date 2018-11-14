import { combineReducers } from 'redux';
import { dataReducer } from './data';
import { authReducer } from './auth';
import { savedListReducer } from './savedList';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer,
    savedList: savedListReducer,
    modal: modalReducer
})