import React from 'react';
import PropTypes from 'prop-types';

const SaveModal = (props) => (
      <div className='modal-body'>
          <div className='modal-container'>
                <h2>Save list</h2>
            </div>
            <form onSubmit={props.saveListHandler}>
                <div className='modal-container'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='List name'
                            name='listName'
                            required />
                </div>
                <div className='modal-container'>
                    <button className='btn btn-success' type='submit'>Save</button>
                    <button className='btn' onClick={props.closeModal}>Close</button>
                </div>
            </form>
      </div>
);

SaveModal.propTypes = {
    saveListHandler: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default SaveModal;
