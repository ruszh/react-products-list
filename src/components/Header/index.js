//@flow
import React from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

type Styles = {
    button: {
        margin: number
    },
    userInfoButton: {
        margin: number,
        float: string
    }
};

const styles = (theme: Object): Styles => ({
    button: {
        margin: theme.spacing.unit
    },
    userInfoButton: {
        margin: theme.spacing.unit,
        float: 'right'
    }
});

type Props = {
    logout: Function,
    email: string,
    route: Function,
    classes: Styles
};

const Header = (props: Props) => {
    const { classes } = props;
    return (
        <div className='row header'>
            <div style={{ width: '100%' }}>
                <Button
                    variant='outlined'
                    className={classes.button}
                    color='primary'
                    onClick={props.logout}>
                    logout
                </Button>
                <div className='col-form-label user-data'>
                    User: {props.email}
                </div>
                <Button
                    variant='outlined'
                    className={classes.userInfoButton}
                    color='primary'
                    onClick={() => props.route('/user')}>
                    User info
                </Button>
            </div>
        </div>
    );
};

export default withStyles(styles)(Header);
