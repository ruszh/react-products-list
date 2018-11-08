import React from 'react';
import List from '../List';
import Search from '../../containers/Search';
import PropTypes from 'prop-types';

const ProductsList = (props) => (
      <div className='col'>
        <h2>Products list</h2>
        <Search items={props.allProducts}/>
        <List items={props.filteredProducts} selectHandler={props.selectHandler}/>
      </div>
);

ProductsList.proptypes = {
  filteredProducts: PropTypes.array.isRequired,
  allProducts: PropTypes.array.isRequired,
  selectHandler: PropTypes.func.isRequired
}


export default ProductsList;