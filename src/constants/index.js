import { createConstant } from '../utilities';


//-------------Authentication constants------------

export const SIGNIN = createConstant('SIGNIN');
export const VERIFICATION = createConstant('VERIFICATION');
export const SIGNUP = createConstant('SIGNUP');
export const LOGOUT = createConstant('LOGOUT');


//--------------Saved list constants---------------

export const LOAD_LIST = createConstant('LOAD_LIST');
export const SAVE_LIST = createConstant('SAVE_LIST');
export const GET_LIST = createConstant('GET_LIST');


//---------------Data constants--------------------

export const GET_DATA = createConstant('GET_DATA');


//--------------Modal constants--------------------

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


//-------------Products list constants--------------

export const SELECT_PRODUCT = createConstant('SELECT_PRODUCT');
export const CHECK_UNCHECK_ALL_PRODUCTS = createConstant('CHECK_UNCHECK_ALL_PRODUCTS');


//---------------Shop list constants---------------------

export const SELECT_SHOP = createConstant('SELECT_SHOP');
export const CHECK_UNCHECK_ALL_SHOPS = createConstant('CHECK_UNCHECK_ALL_SHOPS');
