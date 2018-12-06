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
        zIndex: 10002
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

    onRenameHandler = (e: SyntheticEvent<any>) => {
        const { value } = this.state;
        // if (!value) return;
        // if (value === this.props.listName) {
        //     return console.log('The name is not changed');
        // }
        this.props.rename(value);
    };

    onChangeHandler = (e: SyntheticEvent<any>) => {
        const value: string  = e.currentTarget.value;
        this.setState({ value });
    };

    render() {
        const { open, handleClose, classes } = this.props;
        return (
            <div>
                <Dialog
                    onBackdropClick={e => e.stopPropagation()}
                    onClick={e => e.stopPropagation()}
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
                            id='name'
                            label='List name'
                            type='text'
                            onChange={this.onChangeHandler}
                            value={this.state.value}
                            fullWidth
                            required
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
