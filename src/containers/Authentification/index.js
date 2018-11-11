import React, { Component, Fragment } from 'react';
//import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm';

import './Authentification.css';

export default class Authentification extends Component {

    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e)
    }

    render() {
        return (
        <Fragment>
            <LoginForm submitHandler={this.onSubmitHandler}/>
        </Fragment>
        )
    }
}
