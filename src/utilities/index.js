//@flow
import type { Action, Constant } from './types';
import type { ProductItem, ShopItem } from '../containers/Dashboard/types';

type Item = ProductItem | ShopItem;
export const sortByCheck = (a: Item, b: Item): number =>
    a.selected === b.selected ? 0 : b.selected ? 1 : -1;
export const sortByName = (a: Item, b: Item): number =>
    a.name > b.name ? 1 : -1;

export function* generateSequence(end: number): any {
    for (let i = 1; i <= end; i++) {
        yield i;
    }
}
export const convertDate = (date: number): string =>
    new Date(date)
        .toString()
        .split(' ')
        .slice(1, 5)
        .join(' ');
export const createConstant = (name: string): Constant => ({
    request: `${name}_REQUEST`,
    success: `${name}_SUCCESS`,
    error: `${name}_ERROR`
});

export const createAction = (type: string) => (payload: any): Action => ({
    type,
    payload
});
