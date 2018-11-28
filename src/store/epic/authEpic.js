import {  mapTo, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { VERIFICATION } from '../../constants';

const authEpic = action$ => action$.pipe(
    ofType(VERIFICATION.request),

)