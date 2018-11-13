import React, { Component, Fragment } from 'react';
import ProductsList from '../../components/ProductsList';
import ShopsList from '../../components/ShopsList';
import PropTypes from 'prop-types';
import Preloader from '../../components/Preloader';
import { connect } from 'react-redux';
import { sortByName, sortByCheck } from '../../utilities';
import SavedLists from '../../components/SavedLists';
import { getData } from '../../actions/DataActions';
import { selectProduct, checkUncheckAllProducts } from '../../actions/ProductsListActions';
import { selectShop, checkUncheckAllShops } from '../../actions/ShopsListActions';
import { saveList, loadLists } from '../../actions/SavedListActions';

class Dashboard extends Component {

  componentWillMount = () => {
    this.props.getDataAction();
  }

  shopSelectHandler = (e) => {
    console.log(e.target.value)
    this.props.selectShopAction(e.target.value)
  }

  productSelectHandler = (e) => {
    console.log(e.target.value)
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
    this.props.checkShops(switchCheckedStatus())
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

  render() {
    const { isLoading } = this.props;
    return (
      <Fragment>
          {   !isLoading ?
              <Fragment>
                <div className='row'>
                  <ShopsList
                      shops={this.filteredShops}
                      selectHandler={this.shopSelectHandler}
                      checkShopsHandler={this.checkShopsHandler}/>
                  <ProductsList
                      filteredProducts={this.filteredProducts}
                      allProducts={this.props.lists.products}
                      selectHandler={this.productSelectHandler}
                      checkProductsHandler={this.checkProductsHandler}/>
                </div>
                  <SavedLists
                      userId={this.props.userId}
                      getSelectedItems={this.selectedItems}
                      saveList={this.props.saveListAction}
                      loadList={this.props.loadListsAction}
                      listsArr={this.props.savedList.listsArr}/>
              </Fragment>
              : <Preloader />
          }
      </Fragment>
    )
  }
}

Dashboard.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  selectShop: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
  checkShops: PropTypes.func.isRequired,
  checkProducts: PropTypes.func.isRequired,
  userId : PropTypes.string.isRequired,
  saveListAction: PropTypes.func.isRequired,
  loadListsAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
      isLoading: state.data.isLoading,
      lists: state.data.lists,
      error: state.data.error,
      savedList: state.savedList,
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

    saveListAction: (listObj) => dispatch(saveList(listObj)),
    loadListsAction: (option) => dispatch(loadLists(option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);