//@flow
import React from 'react';
import './User.css';

type Props = {
    user: { name: string, email: string },
    route: (params: string) => any
};

const User = (props: Props) => (
    <div className='user-container content-center'>
        <div className='user-info'>
            <div>Name: {props.user.name}</div>
            <div>Email: {props.user.email}</div>
            <button
                className='btn btn-link'
                onClick={() => props.route('/dashboard')}>
                Back
            </button>
        </div>
    </div>
);

export default User;
