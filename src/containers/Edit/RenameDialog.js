//@flow
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

type Styles = {
    root: {
        zIndex: number
    }
};


type Props = {
    open: boolean,
    listName: string,
    classes: Styles,
    handleClose: () => void,
    rename: (value: string) => any
};
type State = {
    value: string
};

const styles: Styles = {
    root: {
        zIndex: 10002,
        pointerEvents: 'none'
    }
};

class RenameDialog extends React.Component<Props, State> {
    state = {
        value: ''
    };

    componentWillMount() {
        const { listName } = this.props;
        this.setState({ value: listName });
    }

    onRenameHandler = (e) => {
        e.stopPropagation();

        const { value } = this.state;
        this.props.rename(value)
    };

    onChangeHandler = (e: SyntheticEvent<>) => {
        const value = e.currentTarget.value;
        this.setState({ value });
    };

    //   handleClickOpen = () => {
    //     this.setState({ open: true });
    //   };

    //   handleClose = () => {
    //     this.setState({ open: false });
    //   };

    render() {
        const { open, handleClose, classes, rename } = this.props;
        return (
            <div>
                <Dialog
                    className={classes.root}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>
                        Rename list
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Email Address'
                            type='email'
                            onChange={this.onChangeHandler}
                            value={this.state.value}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='secondary'>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.onRenameHandler}
                            color='primary'
                            variant='contained'>
                            Rename
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(RenameDialog);