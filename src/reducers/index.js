import { combineReducers } from 'redux';
import { dataReducer } from './data';
import { authReducer } from './auth';
import { savedListReducer } from './savedList';

export const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer,
    savedList: savedListReducer
})