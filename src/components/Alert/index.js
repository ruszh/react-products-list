//@flow
import React from 'react';
import './Alert.css';

type Props = {
    alert: { type: string, message: string }
};

const Alert = (props: Props) => {
    const { type, message } = props.alert;
    if (!type && !message) return null;
    const alertClass: string =
        type === 'success' ? 'alert-success' : 'alert-danger';
    return (
        <div className='alert-container'>
            <div className={`alert ${alertClass}`} role='alert'>
                {message}
            </div>
        </div>
    );
};

export default Alert;
