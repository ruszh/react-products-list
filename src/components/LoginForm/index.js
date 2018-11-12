import React from 'react';
import PropTypes from 'prop-types';

import './LoginForm.css';

const LoginForm = (props) => (
    <div className='form-container'>
        <form className='login-form' onSubmit={ props.signup ? props.signupHandler : props.submitHandler }>
            <div className="inputs-wrapper">
                <div className="form-group row">
                    {/* <label htmlFor="login-input" className="col-sm-3 col-form-label">Email:</label> */}
                    <div className="col">
                        <input type="text" className={ props.isValid ? "form-control" : "form-control is-invalid"} name='email' id="login-input" placeholder="Email" required />
                        <div className="invalid-feedback">
                                Enter correct email
                        </div>
                    </div>
                </div>
                {   props.signup &&
                <div className="form-group row">
                    <div className="col">
                        <input type="text" className="form-control" name='name' id="login-input" placeholder="Name" required/>
                    </div>
                </div>
                }
                <div className="form-group row">
                    {/* <label htmlFor="password-input" className="col-sm-3 col-form-label">Password:</label> */}
                    <div className="col">
                        <input type="password" className={ props.isValid ? "form-control" : "form-control is-invalid"} name="password" id="password-input" placeholder="Password" required />
                        <div className="invalid-feedback">
                            Enter correct password
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    {  props.signup ?
                        <div className="col">
                            <button type='submit' className="btn btn-success">Submit</button>
                            <button onClick={props.signupToggle} className="btn btn-danger">Cancel</button>
                        </div>
                        :
                        <div className="col">
                            <button onClick={props.signupToggle} className="btn btn-light">Signup</button>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    }

                </div>
            </div>
        </form>
    </div>
);

LoginForm.propTypes = {
    submitHandler: PropTypes.func.isRequired,
    signupHandler: PropTypes.func.isRequired,
    signup: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
}

export default LoginForm;