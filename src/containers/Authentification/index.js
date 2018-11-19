import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../../components/AuthForm';
import { connect } from 'react-redux';
import { signinRequest, signupRequest } from '../../actions/AuthActions';
import Alert from '../../components/Alert';

import './Authentification.css';

class Authentification extends Component {
    state = {
        signupMode: false
    }

    // showAlert = (type, message) => {
    //     if(type === 'error') {
    //         this.setState({
    //             errorMessage: message
    //         });
    //         setTimeout(() => {
    //             this.setState({
    //                 errorMessage: ''
    //             })
    //         }, 3000);
    //         return;
    //     }
    //     this.setState({
    //         message: message
    //     });
    //     setTimeout(() => {
    //         this.setState({
    //             message: ''
    //         })
    //     }, 3000);
    // }

    componentDidUpdate = () => {
        console.log('component did update')
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
            <AuthForm
                submitHandler={this.onSubmitHandler}
                isValid={ formIsValid ? true : false }
                signupHandler={this.onSignupHandler}
                signupToggle={this.signupToggleHandler}
                signup={this.state.signupMode}
                />
            { message && <Alert type='success' message={message} /> }
            { error &&  <Alert type='danger' message={error} />}
        </Fragment>
        )
    }
}

Authentification.propTypes = {
    signinAction: PropTypes.func.isRequired,
    error: PropTypes.string,
    message: PropTypes.string,
    signupAction: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        message: state.auth.message,
        formIsValid: state.auth.formIsValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signinAction: (user) => dispatch(signinRequest(user)),
        signupAction: (user) => dispatch(signupRequest(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentification);