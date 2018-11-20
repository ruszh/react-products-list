import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dashboard from '../Dashboard';
import Authentication from '../Authentification';
import Preloader from '../../components/Preloader';

import { connect } from 'react-redux';

import { createAction } from '../../utilities';
import { VERIFICATION } from '../../constants';

class App extends Component {
  componentWillMount() {
    this.props.verifyAction();
  }

  render() {
    const { auth, isLoading } = this.props;
    return (
      <div className="App container">
        { isLoading ? <Preloader /> : auth.login ? <Dashboard /> : <Authentication /> }
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    auth: store.auth,
    isLoading: store.auth.isLoading
  }
}

App.propTypes = {
  verifyAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {
  verifyAction: createAction(VERIFICATION.request)
})(App);
