//@flow
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';

type Styles = {
    button: {
        marginTop: number,
        marginBottom: number
    },
    icon: {
        fontSize: number
    }
};

const styles: Styles = {
    button: {
        marginTop: 10,
        marginBottom: 10
    },
    icon: {
        fontSize: 25
    }
};

type Props = {
    checkHandler: Function,
    classes: Styles
};
const CheckAll = (props: Props) => (
    <Button
        color='primary'
        className={props.classes.button}
        onClick={props.checkHandler}>
        <Check className={props.classes.icon} />
    </Button>
);

export default withStyles(styles)(CheckAll);
