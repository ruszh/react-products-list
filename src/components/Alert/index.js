import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = (props) => (
    <div className='alert-container'>
        <div className={`alert alert-${props.type}`} role="alert">
            {props.message}
        </div>
    </div>
);

Alert.ptoptypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default Alert;