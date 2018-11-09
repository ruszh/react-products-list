import React from 'react';
import PropTypes from 'prop-types';
import './SearchResult.css';

const SearchResult = (props) => (
      <ul className='search-result-container' onClick={props.selectHandler}>
          {
            props.items.map(item => (
            <li className='search-result-item' key={item.id} value={item.id}>{item.name}</li>
            ))
          }
      </ul>
);

SearchResult.propTypes = {
  items: PropTypes.array.isRequired,
  selectHandler: PropTypes.func.isRequired
}

export default SearchResult;