//@flow
import React, { Component } from 'react';
import Dashboard from '../Dashboard';
import Authentication from '../Authentification';
import Preloader from '../../components/Preloader';
import User from '../../components/User';

import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter, push } from 'connected-react-router';

import { createAction } from '../../utilities';
import { VERIFICATION } from '../../constants';

type Props = {
    auth: { login: boolean, user: Object },
    isLoading: boolean,
    history: Object,
    verifyAction: () => void,
    push: () => void
};

class App extends Component<Props> {
    componentWillMount() {
        this.props.verifyAction();
    }

    render() {
        const { auth, isLoading, history, push } = this.props;

        return (
            <ConnectedRouter history={history}>
                <div className='App container'>
                    {isLoading && <Preloader />}
                    {!isLoading && !auth.login && <Redirect to='/' />}
                    <Switch>
                        {!isLoading && auth.login && (
                            <Redirect exact from='/' to='/dashboard' />
                        )}
                        <Route
                            exact
                            path='/'
                            render={() => <Authentication />}
                        />
                        <Route path='/dashboard' render={() => <Dashboard />} />
                        <Route
                            path='/user'
                            render={() => (
                                <User user={auth.user} route={push} />
                            )}
                        />
                    </Switch>
                </div>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = (store: { auth: { isLoading: boolean } }): {} => {
    return {
        auth: store.auth,
        isLoading: store.auth.isLoading
    };
};

export default connect(
    mapStateToProps,
    {
        verifyAction: createAction(VERIFICATION.request),
        push
    }
)(App);
