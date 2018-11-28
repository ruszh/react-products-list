//@flow
import React from 'react';
import './Header.css';

type Props = {
    logout: Function,
    email: string,
    route: Function
}

const Header = (props: Props) => (
    <div className='row header'>
        <div style={{width: '100%'}}>
            <button className='btn' onClick={props.logout}>logout</button>
            <div className='col-form-label user-data'>User: {props.email}</div>
            <button className='btn float-right' onClick={() => props.route('/user')}>User info</button>
        </div>
    </div>
);

export default Header;

