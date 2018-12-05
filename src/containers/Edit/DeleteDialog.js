//@flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';

type Styles = {
    root: {
        zIndex: number
    }
};

type Props = {
    handleDelete: Function,
    handleClose: Function,
    open: boolean,
    classes: Styles,
    listName: string
};

const styles: Styles = {
    root: {
        zIndex: 10002
    }
};

class DeleteDialog extends React.Component<Props> {
    render() {
        const {
            handleClose,
            handleDelete,
            open,
            classes,
            listName
        } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    className={classes.root}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>
                        Delete list
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Delete {listName}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='secondary'>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} variant='contained' color='primary' autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(DeleteDialog);
