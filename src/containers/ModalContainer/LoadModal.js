import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../components/Pagination';

const LoadModal = (props) => (
      <div className='modal-body'>
            <div className='modal-container'>
                <h2>Saved lists</h2>
            </div>
            { props.pages > 0 &&
                    <div className='modal-container form-group row'>
                        <label className='col-form-label col-3' htmlFor="sort">Sort by:</label>
                        <select className='form-control col-4'
                                defaultValue={props.sort}
                                id='sort'
                                onChange={props.sortHandler}>
                            <option value='listName'>list name</option>
                            <option value='date'>date</option>
                        </select>
                    </div>
            }

            <div className='modal-container'>
                <ul className='list-group saved-list' style={{ minHeight: '260px' }}>
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
                <Pagination pages={props.pages} current={props.current} selectPageHandler={props.loadLists} />
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

