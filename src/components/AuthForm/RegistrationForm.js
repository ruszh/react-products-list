//@flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
    isValid: boolean,
    signupHandler: (values: SyntheticEvent<>) => void,
    toggleHandler: () => void
}

let RegistrationForm = (props: Props) => (
    <form onSubmit={props.signupHandler}>
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
                        type='text'
                        className='form-control'
                        name='name'
                        placeholder='Name'
                        required
                    />
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
                    <button type='submit' className='btn btn-success'>
                        Register
                    </button>
                    <button
                        onClick={props.toggleHandler}
                        className='btn btn-danger'>
                        Back
                    </button>
                </div>
            </div>
        </div>
    </form>
);

RegistrationForm = reduxForm({
    form: 'registration'
})(RegistrationForm);

export default RegistrationForm;
