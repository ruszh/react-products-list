//@flow
import React, { Component } from 'react';
import Dashboard from '../Dashboard';
import Authentication from '../Authentification';
import Preloader from '../../components/Preloader';
import User from '../../components/User';
import Alert from '../../components/Alert';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter, push } from 'connected-react-router';

import { createAction } from '../../utilities';
import { VERIFICATION } from '../../constants';

import type { State } from '../../store/types';

type Props = {
    auth: { login: boolean, user: Object },
    isLoading: boolean,
    history: Object,
    verifyAction: () => void,
    push: () => void,
    alert: { type: string, message: string },
    location: Object
};

class App extends Component<Props> {
    componentWillMount() {
        this.props.verifyAction();
    }

    render() {
        const { auth, isLoading, history, push, alert } = this.props;

        return (
            <ConnectedRouter history={history}>
                <div className='App container'>
                    <Alert alert={alert}/>
                    {isLoading && <Preloader />}
                    <Switch>
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

const mapStateToProps = (store: State): {} => {
    return {
        auth: store.auth,
        isLoading: store.auth.isLoading,
        alert: store.alert
    };
};

export default connect(
    mapStateToProps,
    {
        verifyAction: createAction(VERIFICATION.request),
        push
    }
)(App);
