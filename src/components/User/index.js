import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = (props) => (
    <div className='user-container content-center'>
        <div className='user-info'>
            <div>Name: {props.user.name}</div>
            <div>Email: {props.user.email}</div>
            <button className='btn btn-link' onClick={() => props.route('/dashboard')}>Back</button>
        </div>
    </div>
);

User.propTypes = {
    user: PropTypes.object.isRequired
}

export default User;