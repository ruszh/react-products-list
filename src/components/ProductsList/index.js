import React, { Component } from 'react';
import List from '../List';
import Search from '../Search';
import PropTypes from 'prop-types';

export default class ProductsList extends Component {
  render() {
    const { products, selectHandler } = this.props;
    return (
      <div className='col'>
        <h2>Products list</h2>
        <Search items={products}/>
        <List items={products} selectHandler={selectHandler}/>
      </div>
    )
  }
}

ProductsList.proptypes = {
  products: PropTypes.array.isRequired,
  selectHandler: PropTypes.func
}
