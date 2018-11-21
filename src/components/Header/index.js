import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = (props) => (
    <div className='row header'>
        <div style={{width: '100%'}}>
            <button className='btn' onClick={props.logout}>logout</button>
            <div className='col-form-label user-data'>User: {props.email}</div>
            <button className='btn float-right' onClick={() => props.route('/user')}>User info</button>
        </div>
    </div>
);

Header.propTypes = {
    email: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}

export default Header;

