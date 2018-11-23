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
                                                <span className='delete' onClick={props.deleteHandler}>
                                                    <img data-id={el._id} alt="delete" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDU5IDQ1OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDU5IDQ1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJkZWxldGUiPgoJCTxwYXRoIGQ9Ik03Ni41LDQwOGMwLDI4LjA1LDIyLjk1LDUxLDUxLDUxaDIwNGMyOC4wNSwwLDUxLTIyLjk1LDUxLTUxVjEwMmgtMzA2VjQwOHogTTQwOCwyNS41aC04OS4yNUwyOTMuMjUsMGgtMTI3LjVsLTI1LjUsMjUuNSAgICBINTF2NTFoMzU3VjI1LjV6IiBmaWxsPSIjRDgwMDI3Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                                                </span>
                                        </li>
                                )
                            })
                    }
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

