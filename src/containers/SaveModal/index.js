import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';

export default class SaveModal extends Component {
    state = {
        visible: false,
        listName: ''
    }
    onChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({
            listName: value
        })
    }
    saveListHandler = (e) => {
        e.preventDefault();

        const listName = this.state.listName;
        if(!listName) return;

        const { userId, selectedItems } = this.props;
        const listObj = {
            userId,
            listName,
            list: selectedItems,
            date: Date.now()
        }
        this.props.saveList(listObj);
        this.closeModal();
    }
    closeModal = () => {
        this.setState({
            visible: false,
            listName: ''
        })
    }
    openModal = () => {
        this.setState({
            visible: true
        })
    }
  render() {
    return (
      <div className='col-lg-1 col-md-2 col-sm-2'>
        <button className='btn btn-success' onClick={() => this.openModal()}>Save</button>
        <Modal
            visible={this.state.visible}
            effect='fadeInUp'
            onClickAway={() => this.closeModal()}
            >
            <div className='modal-container'>
                <h2>Save list</h2>
            </div>
            <form onSubmit={this.saveListHandler}>
                <div className='modal-container'>
                        <input
                            type='text'
                            className='form-control'
                            onChange={this.onChangeHandler}
                            value={this.state.listName}
                            placeholder='List name'
                            name='listName'
                            required />
                </div>
                <div className='modal-container'>
                    <button className='btn btn-success' type='submit'>Save</button>
                    <button className='btn' onClick={this.closeModal}>Close</button>
                </div>
            </form>
        </Modal>
      </div>
    )
  }
}
