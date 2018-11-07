import React, { Component } from 'react';
import ProductsList from '../../components/ProductsList';
import ShopsList from '../../components/ShopsList';
import PropTypes from 'prop-types';
import Preloader from '../../components/Preloader';


export default class UserLists extends Component {
  componentWillMount = () => {
    this.props.getData();
  }
  shopSelectHandler = (e) => {
    this.props.selectShop(e.target.value)
  }
  productSelectHandler = (e) => {
    this.props.selectProduct(e.target.value)
  }
  get filteredProducts() {
    //take arr of shops;
    //check, if no one shop selected, return all products;
    //if shops checked, apply filter();
    //filter(): check, products selected or not;
    //if selected - add to arr;
    //check, this product contains in all shops products arr,
    //if contains, add this product, if not - skip it;
    //return filtered arr of products;
    const shops = this.props.lists.shops;
    const allProducts = this.props.lists.products
    if(shops.some(el => el.selected)) {
      const arr = allProducts.map(product => {
        if(product.selected) {
          product.active = false;
          return product;
        }
        if(shops.every(shop =>
          shop.productsids.indexOf(product.id) !== -1
        )) {
          return product;
        }
        return product;
      });
      return arr.filter(el => el !== null);
    }
    return allProducts;
  }
  get filteredShops() {
    return this.props.lists.shops;
  }
  render() {
    const { isLoading } = this.props;
    return (
      <div>
          {   !isLoading ?
              <div className='row'>
                  <ShopsList shops={this.filteredShops} selectHandler={this.shopSelectHandler}/>
                  <ProductsList products={this.filteredProducts} selectHandler={this.productSelectHandler}/>
              </div>
              : <Preloader />
          }
      </div>
    )
  }
}

UserLists.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectShop: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired
}
