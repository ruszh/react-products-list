//@flow
import type { Lists } from '../containers/Dashboard/types';
import type { push } from 'connected-react-router';
import type { Item } from '../containers/ModalContainer/types';

type User = {
    email: string,
    name: string,
    password: string,
    _id: string
};
type Auth = {
    error: boolean,
    formIsValid: boolean,
    isLoading: boolean,
    login: boolean,
    message: string,
    user: User
};
type Data = {
    error: string,
    isLoading: boolean,
    lists: Lists
};
type Modal = {
    modalIsOpen: boolean,
    name: string | void
};
type SavedList = {
    current: number,
    error: string,
    listsArr: Item[] | Array<any>,
    pages: number,
    sort: string,
    success: string
};
type Alert = {
    type: string,
    message: string
}

export type State = {
    auth: Auth,
    data: Data,
    modal: Modal,
    router: push,
    savedList: SavedList,
    alert: Alert
};
