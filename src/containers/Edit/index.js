//@flow
import React, { Component } from 'react';
import Icon from './Icon';
import Dropdown from './Dropdown';
import './Edit.css';

type Props = {};
type State = {
    isOpen: boolean
};

export default class Edit extends Component<Props, State> {
    state = {
        isOpen: false
    };
    toggleDropdown = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    render() {
        const { isOpen } = this.state;
        return (
            <div className='edit-container'>
                <Icon onClick={this.toggleDropdown} addedClass={isOpen? 'active' : ''}/>
                {/* <Dropdown /> */}
            </div>
        );
    }
}
