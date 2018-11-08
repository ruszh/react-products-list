import React from 'react';
import PropTypes from 'prop-types';
import './SearchResult.css';

const SearchResult = (props) => (
      <div className='dropdown-menu' onClick={props.selectHandler}>
          { props.items.map(item => (
            <div className='dropdown-item' value={item.id}>{item.name}</div>
          ))}
      </div>
);

SearchResult.propTypes = {
  items: PropTypes.array.isRequired,
  selectHandler: PropTypes.func.isRequired
}

export default SearchResult;