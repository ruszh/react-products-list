import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  render() {
    return (
      <div>
          <input
              type='text'
              className='form-control search-input'
              placeholder='Search' />
      </div>
    )
  }
}

Search.propTypes = {
  items: PropTypes.array.isRequired
}