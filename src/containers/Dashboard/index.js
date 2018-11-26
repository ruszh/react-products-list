//@flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { sortByName, sortByCheck, createAction } from '../../utilities';

import Preloader from '../../components/Preloader';
import Header from '../../components/Header';
import ListContent from '../../components/ListContent';
import ModalContainer from '../ModalContainer';

import {
  SELECT_PRODUCT,
  SELECT_SHOP,
  CHECK_UNCHECK_ALL_PRODUCTS,
  CHECK_UNCHECK_ALL_SHOPS,
  OPEN_MODAL,
  GET_DATA,
  LOAD_LIST,
  LOGOUT } from '../../constants';

type Item = {
  name: string,
  id: number,
  selected: boolean,
  active: boolean,
  productsids?: Array<number> };

type Action = (payload?: any) => Object;
type Lists = { shops: Item[] , products: Array<Item>};


type Props = {
  isLoading: boolean,
  lists: Lists,
  error: string,
  email: string,
  modal: { modalIsOpen: boolean, name?: any },
  userId: string,
  sort: string,
  dataRequest: Action,
  selectProductAction: Action,
  selectShopAction: Action,
  checkShopsAction: Action,
  checkProductsAction: Action,
  loadListsAction: Action,
  openModalAction: Action,
  logoutAction: Action,
  push: () => any
}

class Dashboard extends Component<Props> {

  componentWillMount = () => {
    this.props.dataRequest();
  }

  shopSelectHandler = (e) => {
    this.props.selectShopAction(e.target.value)
  }

  productSelectHandler = (e) => {
    this.props.selectProductAction(e.target.value)
  }

  get selectedItems() {
    const allItems: Lists = this.props.lists;
    const getFilteredResult = (arr: Array<Item>): Array<number> => arr.filter(el => el.selected).map(el => el.id)
    return {
      shops: getFilteredResult(allItems.shops),
      products: getFilteredResult(allItems.products)
    };
  }

  checkShopsHandler = () => {
    const switchCheckedStatus = (): string => {
      return this.props.lists.shops.every(el => el.selected) ? "uncheck" : "check"
    }
    this.props.checkShopsAction(switchCheckedStatus())
  }

  checkProductsHandler = () => {
    const selectedShops: Array<number> = this.selectedItems.shops;

    if(selectedShops.length) {
      const productsByShops: {
        selectedProducts: Array<Item>,
        notSelectedProducts: Array<Item>
      } = this.productsStatusForSelectedShops;
      const allProductsByShops: Array<Item>  = [...productsByShops.selectedProducts, ...productsByShops.notSelectedProducts]
      const switchCheckedStatus = (): string => allProductsByShops.every(el => el.selected) ? "uncheck" : "check"

      return this.props.checkProductsAction({
        option: switchCheckedStatus(),
        arr: allProductsByShops.map(el => el.id)
      });

    }

    const allProducts: Array<Item> = this.props.lists.products;
    const switchCheckedStatus = (): string => allProducts.every(el => el.selected) ? 'uncheck-all' : 'check-all';

    this.props.checkProductsAction({ option: switchCheckedStatus() })
  }

  get productsStatusForSelectedShops(): {
    selectedProducts: Array<Item>,
    notSelectedProducts: Array<Item>
  } {

    const shops: Array<Item> = this.props.lists.shops;
    const allProducts: Array<Item> = this.props.lists.products.sort(sortByName);
    const selectedShops: Array<Item> = shops.filter(el => el.selected);

    //--------------filter----------------------

    return allProducts.reduce((acc: Object, product: Object) => {
      const currentProduct: Item = {...product};
      // $FlowFixMe
      const shopsContainsProduct: boolean = selectedShops.some((shop: Item) => shop.productsids.some(id => id === currentProduct.id));
      const resultContainsProduct: boolean = acc.selectedProducts.some((el: Item) => el.id === currentProduct.id)

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
    const shops: Array<Item> = this.props.lists.shops;
    const isSomeShopSelected: boolean = shops.some(el => el.selected)

    if(isSomeShopSelected) {
      const { selectedProducts, notSelectedProducts } = this.productsStatusForSelectedShops
      return [...selectedProducts, ...notSelectedProducts];
    }
//-------------------------------------------------
    const allActiveProducts: Array<Item> = this.props.lists.products.map(product => {
      const currentProduct: Item = {...product};
      currentProduct.active = true
      return currentProduct;
    });
    const separatedProducts = allActiveProducts.reduce(
      (acc: { selected: Array<Item>, notSelected: Array<Item> }, product) => {
      if(product.selected) {
        acc.selected.push(product);
        return acc;
      }
      acc.notSelected.push(product);
      return acc;

    }, {selected: [], notSelected: []});

    return [...separatedProducts.selected.sort(sortByName), ...separatedProducts.notSelected.sort(sortByName)];
  }

  get filteredShops(): Item[] {
    const selectedProductsIds: number[] = this.props.lists.products.filter((el: Item) => el.selected).map(el => el.id);
    const shops: Item[] = this.props.lists.shops.sort(sortByName).map((shop: Item) => {
      const currentShop: Item = {...shop};
      currentShop.active = true
      return currentShop
    });

    if(selectedProductsIds.length) {
      return shops.map(shop => {
        const currentShop: Item = { ...shop }
        //$FlowFixMe
        const currentShopContainsSelectedProducts: boolean = selectedProductsIds.every((prod: number) => shop.productsids.indexOf(prod) !== -1);

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

  openModalHandler = (name: string) => {
      if(name === 'load') {
        this.props.loadListsAction();
        this.props.openModalAction('load');
      } else if(name === 'save'){
        this.props.openModalAction('save');
      }
    }

  render() {
    const { isLoading, push } = this.props;
    return (
      <Fragment>
          {   !isLoading ?
              <Fragment>
                <ModalContainer selectedItems={this.selectedItems}/>
                <Header
                    email={this.props.email} logout={this.props.logoutAction}
                    route={push}/>
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

const mapStateToProps = (state) => {
  return {
      isLoading: state.data.isLoading,
      lists: state.data.lists,
      error: state.data.error,
      email: state.auth.user.email,
      modal: state.modal,
      userId: state.auth.user._id,
      sort: state.savedList.sort
  }
}


export default connect(mapStateToProps, {
    dataRequest: createAction(GET_DATA.request),

    selectProductAction: createAction(SELECT_PRODUCT.request),
    selectShopAction: createAction(SELECT_SHOP.request),
    checkShopsAction: createAction(CHECK_UNCHECK_ALL_SHOPS.request),
    checkProductsAction: createAction(CHECK_UNCHECK_ALL_PRODUCTS.request),

    loadListsAction: createAction(LOAD_LIST.request),

    openModalAction: createAction(OPEN_MODAL),

    logoutAction: createAction(LOGOUT.request),
    push
})(Dashboard);