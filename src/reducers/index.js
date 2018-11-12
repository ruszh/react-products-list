import { combineReducers } from 'redux';
import { dataReducer } from './data';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer
})