import React, { Component, Fragment } from 'react';
import Dashboard from '../Dashboard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verify, logout, } from '../../actions/AuthActions';
import Authentication from '../Authentification';
import Header from '../../components/Header';

//import './App.css';

class App extends Component {

  async componentWillMount() {
    this.props.verifyAction();
  }

  render() {
    const {
      logoutAction,
      auth
    } = this.props;
    return (
      <div className="App container">
      { this.props.auth.login ?
            <Fragment>
                <Header email={auth.user.email} logout={logoutAction}/>
                <Dashboard />
            </Fragment>
                :
            <Authentication />
      }


      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    auth: store.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    verifyAction: () => dispatch(verify()),   
    logoutAction: () => dispatch(logout())
  }
}

App.propTypes = {
  getDataAction: PropTypes.func,
  userData: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
