//@flow
import React from 'react';
import './Alert.css';

type Props = {
    type: string,
    message: string
};

const Alert = (props: Props) => (
    <div className='alert-container'>
        <div className={`alert alert-${props.type}`} role='alert'>
            {props.message}
        </div>
    </div>
);

export default Alert;
