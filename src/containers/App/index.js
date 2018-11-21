import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dashboard from '../Dashboard';
import Authentication from '../Authentification';
import Preloader from '../../components/Preloader';
import User from '../../components/User';

import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter, push } from 'connected-react-router';

import { createAction } from '../../utilities';
import { VERIFICATION } from '../../constants';

class App extends Component {
  componentWillMount() {
    this.props.verifyAction();
  }

  render() {
    const { auth, isLoading, history, push } = this.props;

    return (
      <ConnectedRouter history={history}>
          <div className="App container">
              { isLoading && <Preloader /> }
              { auth.login ? <Redirect to='/dashboard' /> : <Redirect to='/' />}
                <Switch>
                    <Route exact path='/' render={() => <Authentication />} />
                    <Route path='/dashboard' render={() => <Dashboard />} />
                    <Route path='/user' render={() => <User user={auth.user} route={push}/>} />
                </Switch>
          </div>
      </ConnectedRouter>
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
  verifyAction: createAction(VERIFICATION.request),
  push
})(App);
