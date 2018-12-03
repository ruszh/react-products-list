import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
    isValid: boolean,
    signinHandler: (values: SyntheticEvent<>) => void,
    toggleHandler: () => void
}

let LoginForm = (props: Props) => (
    <form onSubmit={props.signinHandler}>
        <div className='inputs-wrapper'>
            <div className='form-group row'>
                <div className='col'>
                    <Field
                        component='input'
                        type='text'
                        className={
                            props.isValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        name='email'
                        placeholder='Email'
                        required
                    />
                    <div className='invalid-feedback'>Enter correct email</div>
                </div>
            </div>
            <div className='form-group row'>
                <div className='col'>
                    <Field
                        component='input'
                        type='password'
                        className={
                            props.isValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        name='password'
                        placeholder='Password'
                        required
                    />
                    <div className='invalid-feedback'>
                        Enter correct password
                    </div>
                </div>
            </div>
            <div className='form-group row'>
                <div className='col'>
                    <button type='submit' className='btn btn-primary'>
                        Login
                    </button>
                </div>
            </div>
            <div className='form-group row'>
                <div className='col-form-label' style={{ marginLeft: '15px' }}>
                    You are not register?
                </div>
                <button
                    onClick={props.toggleHandler}
                    className='btn btn-link'>
                    Signup
                </button>
            </div>
        </div>
    </form>
);

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginForm;
