import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../../components/AuthForm';
import { connect } from 'react-redux';
import Alert from '../../components/Alert';

import { createAction } from '../../utilities';
import { SIGNIN, SIGNUP } from '../../constants';


class Authentification extends Component {
    state = {
        signupMode: false
    }

    onSignupHandler = async (e) => {
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

    onSubmitHandler = (e) => {
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

Authentification.propTypes = {
    signinAction: PropTypes.func.isRequired,
    error: PropTypes.string,
    message: PropTypes.string,
    signupAction: PropTypes.func.isRequired
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