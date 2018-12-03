//@flow
import React, { Component, Fragment } from 'react';
import AuthForm from '../../components/AuthForm';
import { connect } from 'react-redux';

import { createAction } from '../../utilities';
import { SIGNIN, SIGNUP } from '../../constants';

import type { State } from '../../store/types';

type Props = {
    formIsValid: boolean,
    signupAction: () => void,
    signinAction: () => void
};

class Authentification extends Component<Props> {
    render() {
        const { formIsValid } = this.props;
        return (
            <Fragment>
                <div className='content-center'>
                    <AuthForm
                        signin={this.props.signinAction}
                        isValid={formIsValid ? true : false}
                        signup={this.props.signupAction}
                    />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        formIsValid: state.auth.formIsValid
    };
};

export default connect(
    mapStateToProps,
    {
        signinAction: createAction(SIGNIN.request),
        signupAction: createAction(SIGNUP.request)
    }
)(Authentification);
