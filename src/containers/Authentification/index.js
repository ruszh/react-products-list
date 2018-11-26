//@flow
import React, { Component, Fragment } from 'react';
import AuthForm from '../../components/AuthForm';
import { connect } from 'react-redux';
import Alert from '../../components/Alert';

import { createAction } from '../../utilities';
import { SIGNIN, SIGNUP } from '../../constants';

type Props = {
    error: string,
    message: string,
    formIsValid: boolean,
    signupAction: ({ email: string, password: string, name: string }) => void,
    signinAction: ({ email: string, password: string }) => void

}

class Authentification extends Component<Props> {
    render() {
        const { error, message, formIsValid } = this.props;
        return (
            <Fragment>
                    { message && <Alert type='success' message={message} /> }
                    { error &&  <Alert type='danger' message={error} /> }
                <div className="content-center">
                    <AuthForm
                        signin={this.props.signinAction}
                        isValid={ formIsValid ? true : false }
                        signup={this.props.signupAction}
                        />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        message: state.auth.message,
        formIsValid: state.auth.formIsValid
    }
}


export default connect(mapStateToProps, {
    signinAction: createAction(SIGNIN.request),
    signupAction: createAction(SIGNUP.request),
})(Authentification);