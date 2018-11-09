import React from 'react';
import PropTypes from 'prop-types';
import './List.css';

const List = (props) => (
      <div>
        <ul className='list-group'>
          { props.items.map(el => (
                  <li
                      className={el.active ? 'list-group-item' : 'list-group-item not-active'}
                      key={el.id}>
                  <input
                      type='checkbox'
                      className='checkbox'
                      style={{ marginRight: '10px' }}
                      checked={ el.selected }
                      value={ el.id }
                      onChange={props.selectHandler}/>
                  {el.name}
                  </li>
                ))}
        </ul>
      </div>
    );

List.propTypes = {
  items: PropTypes.array.isRequired
}

export default List;