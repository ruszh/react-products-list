import React, { Component } from 'react'
import Modal from 'react-awesome-modal';

export default class LoadModal extends Component {
    state = {
        visible: false
    }
    closeModal = () => {
        this.setState({
            visible: false
        })
    }
    loadLists = () => {
        const { userId, loadList } = this.props;
        const option = {
            userId,
            page: 1,
            sort: 'listName'
        }
        loadList(option);
    }
    openModal = () => {
        this.setState({
            visible: true
        })
        this.loadLists();
    }
  render() {
    const { lists } = this.props;
    return (
      <div className='col-lg-1 col-md-2 col-sm-2'>
        <button className='btn btn-primary' onClick={() => this.openModal()}>Load</button>
        <Modal
            visible={this.state.visible}
            effect='fadeInUp'
            onClickAway={() => this.closeModal()}
            >
            <div className='modal-container'>
                <h2>Saved lists</h2>
            </div>
            <div className='modal-container'>
                <ul className='list-group'>
                    { lists &&
                        lists.map(el => (
                            <li className='list-group-item' key={el._id} value={el._id}>{el.listName}</li>
                        ))}
                </ul>
            </div>
            <div className='modal-container'>
                <button className='btn' onClick={() => this.closeModal()}>Close</button>
            </div>
        </Modal>
      </div>
    )
  }
}