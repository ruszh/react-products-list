import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Dashboard.css';

import { sortByName, sortByCheck } from '../../utilities';

import Preloader from '../../components/Preloader';
import Header from '../../components/Header';
import ListContent from '../../components/ListContent';
import ModalContainer from '../ModalContainer';

import { getData } from '../../actions/DataActions';
import { selectProduct, checkUncheckAllProducts } from '../../actions/ProductsListActions';
import { selectShop, checkUncheckAllShops } from '../../actions/ShopsListActions';
import { loadLists } from '../../actions/SavedListActions';
import { logout } from '../../actions/AuthActions';
import { openModal } from '../../actions/ModalActions';

class Dashboard extends Component {

  componentWillMount = () => {
    this.props.getDataAction();
  }

  shopSelectHandler = (e) => {
    this.props.selectShopAction(e.target.value)
  }

  productSelectHandler = (e) => {
    this.props.selectProductAction(e.target.value)
  }

  get selectedItems() {
    const allItems = this.props.lists;
    const getFilteredResult = arr => arr.filter(el => el.selected).map(el => el.id)
    return {
      shops: getFilteredResult(allItems.shops),
      products: getFilteredResult(allItems.products)
    };
  }

  checkShopsHandler = () => {
    const switchCheckedStatus = () => {
      return this.props.lists.shops.every(el => el.selected) ? "uncheck" : "check"
    }
    this.props.checkShopsAction(switchCheckedStatus())
  }

  checkProductsHandler = () => {
    const selectedShops = this.selectedItems.shops;

    if(selectedShops.length) {
      const productsByShops = this.productsStatusForSelectedShops;
      const allProductsByShops = [...productsByShops.selectedProducts, ...productsByShops.notSelectedProducts]
      const switchCheckedStatus = () => allProductsByShops.every(el => el.selected) ? "uncheck" : "check"

      return this.props.checkProductsAction({
        option: switchCheckedStatus(),
        arr: allProductsByShops.map(el => el.id)
      });

    }

    const allProducts = this.props.lists.products;
    const switchCheckedStatus = () => allProducts.every(el => el.selected) ? 'uncheck-all' : 'check-all';

    this.props.checkProductsAction({ option: switchCheckedStatus() })
  }

  get productsStatusForSelectedShops() {

    const shops = this.props.lists.shops;
    const allProducts = this.props.lists.products.sort(sortByName);
    const selectedShops = shops.filter(el => el.selected);

    //--------------filter----------------------

    return allProducts.reduce((acc, product) => {
      const currentProduct = {...product};
      const shopsContainsProduct = selectedShops.some(shop => shop.productsids.indexOf(currentProduct.id) !== -1);
      const resultContainsProduct = acc.selectedProducts.some(el => el.id === currentProduct.id)

      if(shopsContainsProduct) {
          currentProduct.active = true;

          if(currentProduct.selected) {
            if(!resultContainsProduct) {
              acc.selectedProducts.push(currentProduct);
            }
          } else {
            acc.notSelectedProducts.push(currentProduct);
          }
        } else if(currentProduct.selected) {
          currentProduct.active = false;
          acc.selectedProducts.push(currentProduct);
        }

        return acc;
    }, { selectedProducts: [].sort(sortByName), notSelectedProducts: [].sort(sortByName) } );
  }

  get filteredProducts() {
    const shops = this.props.lists.shops;
    const isSomeShopSelected = shops.some(el => el.selected)

    if(isSomeShopSelected) {
      const { selectedProducts, notSelectedProducts } = this.productsStatusForSelectedShops
      return [...selectedProducts, ...notSelectedProducts];
    }
//-------------------------------------------------
    const allActiveProducts = this.props.lists.products.map(product => {
      const currentProduct = {...product};
      currentProduct.active = true
      return currentProduct;
    });
    const separatedProducts = allActiveProducts.reduce((acc, product) => {
      if(product.selected) {
        acc.selected.push(product);
        return acc;
      }
      acc.notSelected.push(product);
      return acc;

    }, {selected: [], notSelected: []});

    return [...separatedProducts.selected.sort(sortByName), ...separatedProducts.notSelected.sort(sortByName)];
  }

  get filteredShops() {
    const selectedProductsIds = this.props.lists.products.filter(el => el.selected).map(el => el.id);
    const shops = this.props.lists.shops.sort(sortByName).map(shop => {
      const currentShop = {...shop};
      currentShop.active = true
      return currentShop
    });

    if(selectedProductsIds.length) {
      return shops.map(shop => {
        const currentShop = { ...shop }
        const currentShopContainsSelectedProducts = selectedProductsIds.every(prod => shop.productsids.indexOf(prod) !== -1);

        if(currentShopContainsSelectedProducts) {
          currentShop.active = true;
        } else {
          currentShop.active = false;
        }
        return currentShop
      }).sort(sortByCheck);
    }
    return shops.sort(sortByCheck);
  }

  openModalHandler = (name) => {
      if(name === 'load') {
        const { userId } = this.props;
        const option = {
            userId,
            page: 1,
            sort: 'listName'
        }
        this.props.loadListsAction(option);

        this.props.openModalAction('load');
      } else if(name === 'save'){
        this.props.openModalAction('save');
      }
    }

  render() {
    const { isLoading } = this.props;
    return (
      <Fragment>
          {   !isLoading ?
              <Fragment>
                <ModalContainer selectedItems={this.selectedItems}/>
                <Header email={this.props.email} logout={this.props.logoutAction}/>
                <div className='row'>
                    <ListContent
                        title='Shops list'
                        searchItems={this.filteredShops}
                        items={this.filteredShops}
                        selectHandler={this.shopSelectHandler}
                        checkHandler={this.checkShopsHandler}/>
                    <ListContent
                        title='Products list'
                        searchItems={this.props.lists.products}
                        items={this.filteredProducts}
                        selectHandler={this.productSelectHandler}
                        checkHandler={this.checkProductsHandler}/>
                </div>
                <div className='row'>
                    <button className='btn btn-primary' onClick={() => this.openModalHandler('load')}>Load</button>
                    <button className='btn btn-success' onClick={() => this.openModalHandler('save')}>Save</button>
                </div>
              </Fragment>
              : <Preloader />
          }
      </Fragment>
    )
  }
}

Dashboard.propTypes = {
    getDataAction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    selectShopAction: PropTypes.func.isRequired,
    selectProductAction: PropTypes.func.isRequired,
    checkShopsAction: PropTypes.func.isRequired,
    checkProductsAction: PropTypes.func.isRequired,
    loadListsAction: PropTypes.func.isRequired,
    logoutAction: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    lists: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
      isLoading: state.data.isLoading,
      lists: state.data.lists,
      error: state.data.error,
      email: state.auth.user.email,
      modal: state.modal,
      userId: state.auth.user._id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataAction: () => dispatch(getData()),

    selectProductAction: (id) => dispatch(selectProduct(id)),
    selectShopAction: (id) => dispatch(selectShop(id)),
    checkShopsAction: (value) => dispatch(checkUncheckAllShops(value)),
    checkProductsAction: (value) => dispatch(checkUncheckAllProducts(value)),

    loadListsAction: (option) => dispatch(loadLists(option)),

    openModalAction: (name) => dispatch(openModal(name)),

    logoutAction: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);