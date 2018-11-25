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
    signupAction: (user: Object) => void,
    signinAction: ({ email: string, password: string }) => void

}
type State = {
    signupMode: boolean
}

class Authentification extends Component<Props, State> {
    state = {
        signupMode: false
    }

    onSignupHandler = async (e: SyntheticEvent<>) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            email: form.elements['email'].value.toLowerCase(),
            name: form.elements['name'].value,
            password: form.elements['password'].value
        }

        this.props.signupAction(user);
    }

    signupToggleHandler = () => {
        this.setState({
            signupMode: !this.state.signupMode
        })
    }

    onSubmitHandler = (e: SyntheticEvent<>) => {
        e.preventDefault();
        const form = e.target;

        const email = form.elements['email'].value.toLowerCase();
        const password = form.elements['password'].value.toLowerCase();

        this.props.signinAction({ email, password });
    }

    render() {
        const { error, message, formIsValid } = this.props;
        return (
            <Fragment>
                    { message && <Alert type='success' message={message} /> }
                    { error &&  <Alert type='danger' message={error} /> }
                <div className="content-center">
                    <AuthForm
                        submitHandler={this.onSubmitHandler}
                        isValid={ formIsValid ? true : false }
                        signupHandler={this.onSignupHandler}
                        signupToggle={this.signupToggleHandler}
                        signup={this.state.signupMode}
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