import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import SaveModal from './SaveModal';
import LoadModal from './LoadModal';
import PropTypes from 'prop-types';

import './ModalContainer.css';

import { connect } from 'react-redux';
import { createAction } from '../../utilities';
import { GET_LIST, LOAD_LIST, SAVE_LIST, CLOSE_MODAL, DELETE_LIST } from '../../constants';

class ModalContainer extends Component {
    saveListHandler = (e) => {
      e.preventDefault();

      const listName = e.target.elements['listName'].value;
      if(!listName) return;

      const { userId } = this.props;
      const listObj = {
          userId,
          listName,
          list: this.props.selectedItems,
          date: Date.now()
      };
      this.props.saveListAction(listObj);
      this.props.closeModalAction();
    }

    sortHandler = (e) => {
      const sort = e.target.value;
      const page = this.props.current;
      this.loadListHandler(page, sort);
    }

    loadListHandler = (page, sort) => {
        if(page) {
          const { userId } = this.props;
          const option = {
              userId,
              page: !page ? this.props.current : page,
              sort: !sort ? this.props.sort : sort };
          return this.props.loadListsAction(option);
        }
        this.props.loadListsAction();
    }

    selectHandler = (e) => {
      this.props.getListAction(e.target.dataset.id);
      this.props.closeModalAction();
    }
    deleteHandler = (e) => {
        e.stopPropagation();
        this.props.deleteListAction(e.target.dataset.id);
    }

    get modalBody() {
      const { modal, closeModalAction, savedList, pages, current } = this.props;

      switch(modal.name) {
          case 'save':
              return  <SaveModal
                          saveListHandler={this.saveListHandler}
                          closeModal={closeModalAction} />
          case 'load':
                return  <LoadModal
                            selectHandler={this.selectHandler}
                            listsArr={savedList.listsArr}
                            closeModal={closeModalAction}
                            loadLists={this.loadListHandler}
                            pages={pages}
                            current={current}
                            sortHandler={this.sortHandler}
                            sort={this.props.sort}
                            deleteHandler={this.deleteHandler}/>
          default:
              return null;
      }
    }
    render() {
        const {
            closeModalAction,
            modal
        } = this.props;
        return (
            <Modal
                visible={modal.modalIsOpen}
                effect='fadeInUp'
                onClickAway={closeModalAction}>
                { this.modalBody }
            </Modal>
        )
    }
}

ModalContainer.propTypes = {
    closeModalAction: PropTypes.func.isRequired,
    saveListAction: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    savedList: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    userId: state.auth.user._id,
    pages: state.savedList.pages,
    current: state.savedList.current,
    savedList: state.savedList,
    sort: state.savedList.sort
  }
}

export default connect(mapStateToProps, {
  closeModalAction: createAction(CLOSE_MODAL),
  saveListAction: createAction(SAVE_LIST.request),
  getListAction: createAction(GET_LIST.request),
  loadListsAction: createAction(LOAD_LIST.request),
  deleteListAction: createAction(DELETE_LIST.request)
})(ModalContainer);