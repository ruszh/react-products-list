import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import Search from '../../containers/Search';
import CheckAll from '../CheckAll';

const ShopsList = (props) => (
  <div className='col'>
    <h2>Shops list</h2>
    <Search items={props.shops} selectHandler={props.selectHandler}/>
    <CheckAll checkHandler={props.checkShopsHandler}/>
    <List items={props.shops} selectHandler={props.selectHandler}/>
  </div>
);

ShopsList.propTypes = {
  shops: PropTypes.array.isRequired,
  selectHandler: PropTypes.func,
  checkShopsHandler: PropTypes.func.isRequired
}

export default ShopsList;