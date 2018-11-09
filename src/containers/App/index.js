import React, { Component } from 'react';
import UserLists from '../UserLists';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData } from '../../actions/DataActions';
import { selectProduct, checkUncheckAllProducts } from '../../actions/ProductsListActions';
import { selectShop, checkUncheckAllShops } from '../../actions/ShopsListActions';
import Authentication from '../Authentification';

//import './App.css';

class App extends Component {
  state = {
    userIsLigin: false
  }

  render() {
    const {
      getDataAction,
      selectProductAction,
      selectShopAction,
      checkShopsAction,
      checkProductsAction,
      data } = this.props;
    return (
      <div className="App container">
      { this.state.userIsLigin ?
            <UserLists
                selectProduct={selectProductAction}
                selectShop={selectShopAction}
                getData={getDataAction}
                lists={data.lists}
                isLoading={data.isLoading}
                checkShops={checkShopsAction}
                checkProducts={checkProductsAction}/>
                :
            <Authentication />
      }


      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    data: store.data
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getDataAction: () => dispatch(getData()),
    selectProductAction: (id) => dispatch(selectProduct(id)),
    selectShopAction: (id) => dispatch(selectShop(id)),
    checkShopsAction: (value) => dispatch(checkUncheckAllShops(value)),
    checkProductsAction: (value) => dispatch(checkUncheckAllProducts(value))
  }
}

App.propTypes = {
  getDataAction: PropTypes.func,
  userData: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
