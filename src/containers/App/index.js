import React, { Component } from 'react';
import UserLists from '../UserLists';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData } from '../../actions/DataActions';
import { selectProduct } from '../../actions/ProductsListActions';
import { selectShop } from '../../actions/ShopsListActions';

//import './App.css';

class App extends Component {

  render() {
    const { getDataAction, selectProductAction, selectShopAction, data } = this.props;
    return (
      <div className="App container">
        <UserLists
            selectProduct={selectProductAction}
            selectShop={selectShopAction}
            getData={getDataAction}
            lists={data.lists}
            isLoading={data.isLoading}/>
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
    selectShopAction: (id) => dispatch(selectShop(id))
  }
}

App.propTypes = {
  getDataAction: PropTypes.func,
  userData: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
