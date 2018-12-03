//@flow
import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import SaveModal from './SaveModal';
import LoadModal from './LoadModal';

import './ModalContainer.css';

import { connect } from 'react-redux';
import { createAction } from '../../utilities';
import {
    GET_LIST,
    LOAD_LIST,
    SAVE_LIST,
    CLOSE_MODAL,
    DELETE_LIST
} from '../../constants';

import type { SavedList, List } from './types';
import type { Action } from '../Dashboard/types';
import type { State } from '../../store/types';

type Props = {
    modal: { modalIsOpen: boolean, name: string },
    userId: string,
    pages: number,
    current: number,
    savedList: SavedList,
    sort: string,
    closeModalAction: Action,
    saveListAction: Action,
    getListAction: Action,
    loadListsAction: Action,
    deleteListAction: Action,
    selectedItems: { shops: number[], products: number[] }
};

class ModalContainer extends Component<Props> {
    saveListHandler = (listName: string) => {
        if (!listName) return;

        const { userId } = this.props;
        const listObj: List = {
            userId,
            listName,
            list: this.props.selectedItems,
            date: Date.now()
        };
        this.props.saveListAction(listObj);
        this.props.closeModalAction();
    };

    sortHandler = (e: SyntheticInputEvent<>) => {
        const sort: string = e.target.value;
        const page: number = this.props.current;
        this.loadListHandler(page, sort);
    };

    loadListHandler = (page: number, sort?: string): any => {
        if (page) {
            const { userId } = this.props;
            const option: {
                userId: string,
                page: number,
                sort: string
            } = {
                userId,
                page: !page ? this.props.current : page,
                sort: !sort ? this.props.sort : sort
            };
            return this.props.loadListsAction(option);
        }
        this.props.loadListsAction();
    };

    selectHandler = (e: SyntheticEvent<HTMLElement>) => {
        this.props.getListAction(e.currentTarget.dataset.id);
        this.props.closeModalAction();
    };
    deleteHandler = (e: SyntheticEvent<HTMLElement>) => {
        e.stopPropagation();
        this.props.deleteListAction(e.currentTarget.dataset.id);
    };

    get modalBody() {
        const {
            modal,
            closeModalAction,
            savedList,
            pages,
            current
        } = this.props;

        switch (modal.name) {
            case 'save':
                return (
                    <SaveModal
                        saveListHandler={this.saveListHandler}
                        closeModal={closeModalAction}
                    />
                );
            case 'load':
                return (
                    <LoadModal
                        selectHandler={this.selectHandler}
                        listsArr={savedList.listsArr}
                        closeModal={closeModalAction}
                        loadLists={this.loadListHandler}
                        pages={pages}
                        current={current}
                        sortHandler={this.sortHandler}
                        sort={this.props.sort}
                        deleteHandler={this.deleteHandler}
                    />
                );
            default:
                return null;
        }
    }
    render() {
        const { closeModalAction, modal } = this.props;
        return (
            <Modal
                visible={modal.modalIsOpen}
                effect='fadeInUp'
                onClickAway={closeModalAction}>
                {this.modalBody}
            </Modal>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        modal: state.modal,
        userId: state.auth.user._id,
        pages: state.savedList.pages,
        current: state.savedList.current,
        savedList: state.savedList,
        sort: state.savedList.sort,
        alert: state.alert
    };
};

export default connect(
    mapStateToProps,
    {
        closeModalAction: createAction(CLOSE_MODAL),
        saveListAction: createAction(SAVE_LIST.request),
        getListAction: createAction(GET_LIST.request),
        loadListsAction: createAction(LOAD_LIST.request),
        deleteListAction: createAction(DELETE_LIST.request)
    }
)(ModalContainer);
