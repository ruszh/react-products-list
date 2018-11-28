//@flow
import React, { Component } from 'react';

type Props = {
    saveListHandler: (value: string) => void,
    closeModal: () => { type: string }
};

type State = {
    value: string
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
    }

    render() {
        return (
            <div className='modal-body'>
                <div className='modal-container'>
                    <h2>Save list</h2>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className='modal-container'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='List name'
                            name='listName'
                            value={this.state.value}
                            onChange={this.onChangeHandler}
                            required
                        />
                    </div>
                    <div className='modal-container'>
                        <button className='btn btn-success' type='submit'>
                            Save
                        </button>
                        <button className='btn' onClick={this.props.closeModal}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SaveModal;
