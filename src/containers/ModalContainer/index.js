import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import SaveModal from './SaveModal';
import LoadModal from './LoadModal';
import PropTypes from 'prop-types';

import './ModalContainer.css';

import { connect } from 'react-redux';
import { closeModal } from '../../actions/ModalActions';
import { saveList, getList, loadLists } from '../../actions/SavedListActions';

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
      const { userId } = this.props;
      const option = { userId, page, sort: !sort ? this.props.sort : sort };
      this.props.loadListsAction(option);
    }

    selectHandler = (e) => {
      this.props.getListAction(e.target.dataset.id);
      this.props.closeModalAction();
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
                            sort={this.props.sort}/>
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

const mapDispatchToProps = dispatch => {
  return {
    closeModalAction: () => dispatch(closeModal()),
    saveListAction: (listObj) => dispatch(saveList(listObj)),
    getListAction: (listId) => dispatch(getList(listId)),
    loadListsAction: (option) => dispatch(loadLists(option))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);