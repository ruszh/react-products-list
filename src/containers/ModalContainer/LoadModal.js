import React from 'react';
import PropTypes from 'prop-types';

const LoadModal = (props) => (
      <div className='modal-body'>
          <div className='modal-container'>
                <h2>Saved lists</h2>
            </div>
            <div className='modal-container'>
                <ul className='list-group'>
                    { props.listsArr &&
                        props.listsArr.map(el => {
                                const date = new Date(el.date).toString();
                                return (
                                        <li className='list-group-item'
                                            key={el._id}
                                            onClick={props.selectHandler}
                                            data-id={el._id}>
                                                {el.listName}
                                                <span className='date'>
                                                    {date.split(' ').slice(1, 5).join(' ')}
                                                </span>
                                        </li>
                                )
                            }
                        )}
                </ul>
            </div>
            <div className='modal-container'>
                <button className='btn' onClick={props.closeModal}>Close</button>
            </div>
      </div>
);

LoadModal.propTypes = {
    listsArr: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default LoadModal;

