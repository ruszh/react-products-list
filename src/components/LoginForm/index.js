import React from 'react';
import PropTypes from 'prop-types';

import './LoginForm.css';

const LoginForm = (props) => (
    <div className='form-container'>
        <form className='login-form' onSubmit={props.submitHandler}>
            <div className="inputs-wrapper">
                <div className="form-group row">
                    <label htmlFor="login-input" className="col-sm-3 col-form-label">Email:</label>
                <div className="col">
                    <input type="text" className="form-control" value='test' id="login-input" placeholder="Email" required />
                    <div className="invalid-feedback">
                            Enter correct email
                    </div>
                </div>
            </div>
                <div className="form-group row">
                    <label htmlFor="password-input" className="col-sm-3 col-form-label">Password:</label>
                    <div className="col">
                        <input type="password" className="form-control" value='test' id="password-input" placeholder="Password" required />
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
            </div>
        </form>
    </div>
);

LoginForm.propTypes = {
    submitHandler: PropTypes.func.isRequired
}

export default LoginForm;