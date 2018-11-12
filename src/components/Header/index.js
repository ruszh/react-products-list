import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
    <div className='row'>
        <button className='btn' onClick={props.logout}>logout</button>
        <div style={{display: 'inline-block', verticalAlign: 'middle'}}>User: {props.email}</div>
    </div>
);

Header.propTypes = {
    email: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}

export default Header;

