//@flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type Props = {
    isValid: boolean,
    signinHandler: (values: SyntheticEvent<>) => void,
    toggleHandler: () => void
};

const renderTextField = ({ input, label, ...custom }): any => (
    <TextField label={label} {...input} {...custom} />
);

let LoginForm = (props: Props) => (
    <form onSubmit={props.signinHandler}>
        <div className='inputs-wrapper'>
            <div className='form-group row'>
                <div className='col'>
                    <Field
                        component={renderTextField}
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
                        component={renderTextField}
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
                    <Button color='primary' variant='contained' type='submit'>
                        Login
                    </Button>
                </div>
            </div>
            <div className='form-group row'>
                <div className='col-form-label' style={{ marginLeft: '15px' }}>
                    You are not register?
                </div>
                <Button color='secondary' onClick={props.toggleHandler}>
                    Signup
                </Button>
            </div>
        </div>
    </form>
);

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default LoginForm;
