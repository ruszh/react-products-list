//@flow
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

type Styles = {
    buttons: {
        marginRight: number
    }
};

type Props = {
    saveListHandler: (value: string) => void,
    closeModal: () => { type: string },
    classes: Styles
};

type State = {
    value: string
};

const styles: Styles = {
    buttons: {
        marginRight: 10
    }
};

class SaveModal extends Component<Props, State> {
    state = {
        value: ''
    };

    onChangeHandler = (e: SyntheticInputEvent<>) => {
        const value: string = e.target.value;
        this.setState({ value });
    };
    onSubmitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.saveListHandler(this.state.value);
    };

    render() {
        return (
            <div className='modal-body'>
                <div className='modal-container'>
                    <Typography align='center' component='h4' variant='h4'>
                        Save list
                    </Typography>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className='modal-container'>
                        <Input
                            fullWidth
                            placeholder='List name'
                            name='listName'
                            value={this.state.value}
                            onChange={this.onChangeHandler}
                            required
                        />
                    </div>
                    <div className='modal-container'>
                        <Button
                            className={this.props.classes.buttons}
                            color='primary'
                            variant='contained'
                            type='submit'>
                            Save
                        </Button>
                        <Button
                            color='secondary'
                            variant='contained'
                            onClick={this.props.closeModal}>
                            Close
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(SaveModal);
