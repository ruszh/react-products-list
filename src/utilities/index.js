//@flow
import type { Action, Constant } from './types';
export const sortByCheck = (a: any, b: any): number =>
    a.selected === b.selected ? 0 : b.selected ? 1 : -1;
export const sortByName = (a: any, b: any): number =>
    a.name > b.name ? 1 : -1;

export function* generateSequence(end: number): any {
    for (let i = 1; i <= end; i++) {
        yield i;
    }
}

export const createConstant = (name: string): Constant => ({
    request: `${name}_REQUEST`,
    success: `${name}_SUCCESS`,
    error: `${name}_ERROR`
});

export const createAction = (type: string) => (payload: any): Action => ({
    type,
    payload
});
