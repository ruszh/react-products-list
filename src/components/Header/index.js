import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = (props) => (
    <div className='row header'>
        <button className='btn' onClick={props.logout}>logout</button>
        <div className='col-form-label user-data'>User: {props.email}</div>
    </div>
);

Header.propTypes = {
    email: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}

export default Header;

