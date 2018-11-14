import React, { Component } from 'react';
import Dashboard from '../Dashboard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verify } from '../../actions/AuthActions';
import Authentication from '../Authentification';

class App extends Component {

  async componentWillMount() {
    this.props.verifyAction();
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="App container">
        { auth.login ? <Dashboard /> : <Authentication /> }
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
    verifyAction: () => dispatch(verify())
  }
}

App.propTypes = {
  verifyAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
