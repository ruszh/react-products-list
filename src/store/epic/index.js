import { combineEpics } from 'redux-observable';
import { authEpics } from './authEpic';

export const rootEpic = combineEpics(authEpics);
