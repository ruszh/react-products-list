import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm';
import AuthService from '../../services/AuthService';
import Alert from '../../components/Alert';

import './Authentification.css';

export default class Authentification extends Component {
    state = {
        signupMode: false,
        errorMessage: '',
        message: ''
    }

    showAlert = (type, message) => {
        if(type === 'error') {
            this.setState({
                errorMessage: message
            });
            setTimeout(() => {
                this.setState({
                    errorMessage: ''
                })
            }, 3000);
            return;
        }
        this.setState({
            message: message
        });
        setTimeout(() => {
            this.setState({
                message: ''
            })
        }, 3000);
    }

    onSignupHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        const user = {
            email: form.elements['email'].value.toLowerCase(),
            name: form.elements['name'].value,
            password: form.elements['password'].value
        }

        const result = await AuthService.signup(user);
        if(result.success) {
            this.signupToggleHandler();
            return this.showAlert('success', result.success);
        }
        this.showAlert('error', result.error);
        console.log(result)
    }

    signupToggleHandler = () => {
        this.setState({
            signupMode: !this.state.signupMode
        })
    }


    onSubmitHandler = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.elements['email'].value.toLowerCase();
        const password = form.elements['password'].value.toLowerCase();

        this.props.signin({ email, password });
    }

    render() {
        const { error } = this.props;
        const { message, errorMessage } = this.state;
        return (
        <Fragment>
            <LoginForm
                submitHandler={this.onSubmitHandler}
                isValid={ error ? false : true }
                signupHandler={this.onSignupHandler}
                signupToggle={this.signupToggleHandler}
                signup={this.state.signupMode}
                />
            { message && <Alert type='success' message={message} /> }
            { errorMessage &&  <Alert type='danger' message={errorMessage} />}
        </Fragment>
        )
    }
}

Authentification.propTypes = {
    signin: PropTypes.func.isRequired,
    error: PropTypes.string
}
