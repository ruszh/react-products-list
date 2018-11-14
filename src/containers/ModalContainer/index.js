import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import SaveModal from './SaveModal';
import LoadModal from './LoadModal';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { closeModal } from '../../actions/ModalActions';
import { saveList } from '../../actions/SavedListActions';

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
    selectHandler = (e) => {
      let value;
      if(e.target.tagName === 'SPAN') {
        value = e.target.parentElement.dataset.id;
      } else {
        value = e.target.dataset.id;
      }
      console.log(value)
    }

    get modalBody() {
      const { modal, closeModalAction, savedList } = this.props;

      switch(modal.name) {
          case 'save':
              return  <SaveModal
                          saveListHandler={this.saveListHandler}
                          closeModal={closeModalAction} />
          case 'load':
                return  <LoadModal
                            selectHandler={this.selectHandler}
                            listsArr={savedList.listsArr}
                            closeModal={closeModalAction}/>
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
    savedList: state.savedList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModalAction: () => dispatch(closeModal()),
    saveListAction: (listObj) => dispatch(saveList(listObj))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);