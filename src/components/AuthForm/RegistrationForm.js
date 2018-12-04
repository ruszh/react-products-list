//@flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

type Styles = {
    buttons: {
        marginRight: number
    }
};

type Props = {
    isValid: boolean,
    signupHandler: (values: SyntheticEvent<>) => void,
    toggleHandler: () => void,
    classes: Styles
};

const renderTextField = ({ input, label, ...custom }): any => (
    <TextField label={label} {...input} {...custom} />
);



const styles: Styles = {
    buttons: {
        marginRight: 10
    }
};

let RegistrationForm = (props: Props) => (
    <form onSubmit={props.signupHandler}>
        <div className='inputs-wrapper'>
            <div className='form-group row'>
                <div className='col'>
                    <Field
                        component={renderTextField}
                        type='text'
                        // className={
                        //     props.isValid
                        //         ? 'form-control'
                        //         : 'form-control is-invalid'
                        // }
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
                        component={renderTextField}
                        type='password'
                        // className={
                        //     props.isValid
                        //         ? 'form-control'
                        //         : 'form-control is-invalid'
                        // }
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
                    <Button
                        className={props.classes.buttons}
                        color='primary'
                        variant='contained'
                        type='submit'>
                        Register
                    </Button>
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={props.toggleHandler}
                        className={props.classes.buttons}>
                        Back
                    </Button>
                </div>
            </div>
        </div>
    </form>
);

RegistrationForm = reduxForm({
    form: 'registration'
})(RegistrationForm);

export default withStyles(styles)(RegistrationForm);
