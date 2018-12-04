//@flow
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import './AuthForm.css';

type Props = {
    isValid: boolean,
    signup: () => void,
    signin: () => void
};

type State = {
    signupMode: boolean
};

class AuthForm extends Component<Props, State> {
    state = {
        signupMode: false
    };

    signupHandler = (event: SyntheticEvent<>) => {
        event.preventDefault();

        this.props.signup();
    };

    signinHandler = (event: SyntheticEvent<>) => {
        event.preventDefault();
        this.props.signin();
    };

    signupToggleHandler = () => {
        this.setState({
            signupMode: !this.state.signupMode
        });
    };

    render() {
        return (
            <div className='form-container'>
                {this.state.signupMode ? (
                    <RegistrationForm
                        signupHandler={this.signupHandler}
                        isValid={this.props.isValid}
                        toggleHandler={this.signupToggleHandler}
                    />
                ) : (
                    <LoginForm
                        signinHandler={this.signinHandler}
                        toggleHandler={this.signupToggleHandler}
                        isValid={this.props.isValid}
                    />
                )}
            </div>
        );
    }
}

export default AuthForm;
