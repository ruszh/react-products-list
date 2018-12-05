//@flow
import React from 'react';
import './User.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

type Props = {
    user: { name: string, email: string },
    route: (params: string) => any
};

const User = (props: Props) => (
    <div className='user-container content-center'>
        <div className='user-info'>
            <Typography component='h2' variant='display2' gutterBottom>
                Name: {props.user.name}
            </Typography>
            <Typography component='h2' variant='display2' gutterBottom>
                Email: {props.user.email}
            </Typography>
            <Button
                color='primary'
                onClick={() => props.route('/dashboard')}>
                Back
            </Button>
        </div>
    </div>
);

export default User;
