import React, { Component, Fragment } from 'react';
import UserLists from '../UserLists';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData } from '../../actions/DataActions';
import { selectProduct, checkUncheckAllProducts } from '../../actions/ProductsListActions';
import { selectShop, checkUncheckAllShops } from '../../actions/ShopsListActions';
import { signin, verify, logout, signup } from '../../actions/AuthActions';
import { saveList, loadLists } from '../../actions/SavedListActions';
import Authentication from '../Authentification';
import Header from '../../components/Header';

//import './App.css';

class App extends Component {

  async componentWillMount() {
    this.props.verifyAction();
  }

  render() {
    const {
      getDataAction,
      selectProductAction,
      selectShopAction,
      checkShopsAction,
      checkProductsAction,
      signinAction,
      logoutAction,
      signupAction,
      saveListAction,
      loadListsAction,
      savedList,
      auth,
      data
    } = this.props;
    return (
      <div className="App container">
      { this.props.auth.login ?
            <Fragment>
                <Header email={auth.user.email} logout={logoutAction}/>
                <UserLists
                    selectProduct={selectProductAction}
                    selectShop={selectShopAction}
                    getData={getDataAction}
                    lists={data.lists}
                    isLoading={data.isLoading}
                    checkShops={checkShopsAction}
                    checkProducts={checkProductsAction}
                    userId={auth.user._id}
                    saveList={saveListAction}
                    loadList={loadListsAction}
                    listsArr={savedList.listsArr}/>
            </Fragment>
                :
            <Authentication
                signin={signinAction}
                error={auth.error}
                message={auth.message}
                signup={signupAction}
                />
      }


      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    data: store.data,
    auth: store.auth,
    savedList: store.savedList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getDataAction: () => dispatch(getData()),
    selectProductAction: (id) => dispatch(selectProduct(id)),
    selectShopAction: (id) => dispatch(selectShop(id)),
    checkShopsAction: (value) => dispatch(checkUncheckAllShops(value)),
    checkProductsAction: (value) => dispatch(checkUncheckAllProducts(value)),
    verifyAction: () => dispatch(verify()),
    //--------------- Auth ------------------------------
    signinAction: (user) => dispatch(signin(user)),//+
    logoutAction: () => dispatch(logout()),//+
    signupAction: (user) => dispatch(signup(user)),//+
    //--------------------------------------------------
    saveListAction: (listObj) => dispatch(saveList(listObj)),
    loadListsAction: (option) => dispatch(loadLists(option))
  }
}

App.propTypes = {
  getDataAction: PropTypes.func,
  userData: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
