//@flow
import React, { Component } from 'react';
import './AuthForm.css';

type Props = {
    isValid: boolean,
    signup: (user: { email: string, name: string, password: string }) => void,
    signin: ({ email: string, password: string }) => void

}

type State = {
    email: string,
    name: string,
    password: string,
    signupMode: boolean
}

class AuthForm extends Component<Props, State> {
    state = {
        email: '',
        name: '',
        password: '',
        signupMode: false,
    }

    signupHandler = (e: SyntheticEvent<>) => {
        e.preventDefault();
        const user = {
            email: this.state.email.toLowerCase(),
            name: this.state.name,
            password: this.state.password
        }

        this.props.signup(user);
    }

    signinHandler = (e: SyntheticEvent<>) => {
        e.preventDefault();

        const email: string = this.state.email;
        const password: string = this.state.password;

        this.props.signin({ email, password })
    }

    onChangeHandler = (e: EventTarget & { target: { name: string, value: string }}) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    signupToggleHandler = () => {
        this.setState({
            signupMode: !this.state.signupMode,
            email: '',
            name: '',
            password: ''
        })
    }

    get registrationForm () {
        return (
            <form onSubmit={this.signupHandler}>
                <div className="inputs-wrapper">
                    <div className="form-group row">
                        <div className="col">
                            <input type="text"
                                onChange={this.onChangeHandler}
                                value={this.state.email}
                                className={ this.props.isValid ? "form-control" : "form-control is-invalid"}
                                name='email' placeholder="Email" required />
                            <div className="invalid-feedback">
                                    Enter correct email
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <input type="text"
                                onChange={this.onChangeHandler} value={ this.state.name } className="form-control" name='name' placeholder="Name" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <input type="password"  onChange={this.onChangeHandler} value={ this.state.password } className={ this.props.isValid ? "form-control" : "form-control is-invalid"} name="password"  placeholder="Password" required />
                            <div className="invalid-feedback">
                                Enter correct password
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                            <div className="col">
                                <button type='submit' className="btn btn-success">Register</button>
                                <button onClick={this.signupToggleHandler} className="btn btn-danger">Back</button>
                            </div>
                    </div>
                </div>
            </form>
        )
    }

    get loginForm() {
        return (
            <form onSubmit={this.signinHandler}>
                <div className="inputs-wrapper">
                    <div className="form-group row">
                        <div className="col">
                            <input type="text"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                className={ this.props.isValid ? "form-control" : "form-control is-invalid"}
                                name='email'
                                placeholder="Email"
                                required />
                            <div className="invalid-feedback">
                                    Enter correct email
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col">
                            <input type="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                className={ this.props.isValid ? "form-control" : "form-control is-invalid"}
                                name="password"
                                placeholder="Password"
                                required />
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
                        <button onClick={this.signupToggleHandler} className="btn btn-link">Signup</button>
                    </div>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div className='form-container'>
                { this.state.signupMode ? this.registrationForm : this.loginForm }
            </div>
        )
    }
}


export default AuthForm;