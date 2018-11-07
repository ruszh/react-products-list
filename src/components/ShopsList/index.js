import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import Search from '../Search';

export default class ShopsList extends Component {

  render() {
    const { shops, selectHandler } = this.props;
    return (
      <div className='col'>
          <h2>Shops list</h2>
          <Search items={shops}/>
          <List items={shops} selectHandler={selectHandler}/>
      </div>
    )
  }
}

ShopsList.propTypes = {
  shops: PropTypes.array.isRequired,
  selectHandler: PropTypes.func
}
