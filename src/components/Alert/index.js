import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => (
    <div style={{ width: '300px', margin: 'auto', marginBottom: '10px' }} className={`alert alert-${props.type}`} role="alert">
        {props.message}
    </div>
);

Alert.ptoptypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default Alert;