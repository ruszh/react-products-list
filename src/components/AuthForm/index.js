import React from 'react';
import PropTypes from 'prop-types';

import './AuthForm.css';

const registrationForm = (props) => (
    <form onSubmit={props.signupHandler}>
        <div className="inputs-wrapper">
            <div className="form-group row">
                <div className="col">
                    <input type="text" className={ props.isValid ? "form-control" : "form-control is-invalid"} name='email' placeholder="Email" required />
                    <div className="invalid-feedback">
                            Enter correct email
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col">
                    <input type="text" className="form-control" name='name' placeholder="Name" required/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col">
                    <input type="password" className={ props.isValid ? "form-control" : "form-control is-invalid"} name="password"  placeholder="Password" required />
                    <div className="invalid-feedback">
                        Enter correct password
                    </div>
                </div>
            </div>
            <div className="form-group row">
                    <div className="col">
                        <button type='submit' className="btn btn-success">Register</button>
                        <button onClick={props.signupToggle} className="btn btn-danger">Back</button>
                    </div>
            </div>
        </div>
    </form>
);

const loginForm = (props) => (
    <form onSubmit={props.submitHandler}>
        <div className="inputs-wrapper">
            <div className="form-group row">
                <div className="col">
                    <input type="text" className={ props.isValid ? "form-control" : "form-control is-invalid"} name='email' placeholder="Email" required />
                    <div className="invalid-feedback">
                            Enter correct email
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col">
                    <input type="password" className={ props.isValid ? "form-control" : "form-control is-invalid"} name="password" placeholder="Password" required />
                    <div className="invalid-feedback">
                        Enter correct password
                    </div>
                </div>
            </div>
            <div className="form-group row">
                    <div className="col">

                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
            </div>
            <div className="form-group row">
                <div className='col-form-label' style={{marginLeft: '15px'}}>You are not register?</div>
                <button onClick={props.signupToggle} className="btn btn-link">Signup</button>
            </div>
        </div>
    </form>
);

const AuthForm = (props) => (
    <div className='form-container'>
        { props.signup ? registrationForm(props) : loginForm(props) }
    </div>
);

AuthForm.propTypes = {
    submitHandler: PropTypes.func.isRequired,
    signupHandler: PropTypes.func.isRequired,
    signup: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
}

export default AuthForm;