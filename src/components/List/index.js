import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class List extends Component {

  render() {
    const { items, selectHandler } = this.props;

    return (
      <div>
        <ul className='list-group'>
          {    items.map(el => (
                  <li className='list-group-item' key={el.id}>
                  <input
                      type='checkbox'
                      className='checkbox'
                      style={{ marginRight: '10px' }}
                      checked={ el.selected }
                      value={el.id}
                      onChange={selectHandler}/>
                  {el.name}
                  </li>
                ))
            }
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired
}


export default List;