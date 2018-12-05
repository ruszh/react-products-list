//@flow
import React, { Component } from 'react';
import DeleteDialog from './DeleteDialog';
import RenameDialog from './RenameDialog';

import { connect } from 'react-redux';
import { createAction } from '../../utilities';
import { DELETE_LIST } from '../../constants'

import type { State } from '../../store/types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Settings from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';

type Styles = {
    dropdown: {
        zIndex: number
    }
};

type Props = {
    id: string,
    classes: Styles,
    listName: string,
    deleteListAction: (id: string) => Object
};
type EditState = {
    anchorEl?: any,
    openDeleteDialog: boolean,
    openRenameDialog: boolean
};

const styles: Styles = {
    dropdown: {
        zIndex: 10001
    }
};

class Edit extends Component<Props, EditState> {
    // state = {
    //     isOpen: false
    // };
    // toggleDropdown = () => {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // };
    // render() {
    //     const { isOpen } = this.state;
    //     return (
    //         <div className='edit-container'>
    //             <Icon onClick={this.toggleDropdown} addedClass={isOpen? 'active' : ''}/>
    //             {/* <Dropdown /> */}
    //         </div>
    //     );
    // }
    state = {
        anchorEl: null,
        openDeleteDialog: false,
        openRenameDialog: false
    };

    handleClick = e => {
        e.stopPropagation();
        this.setState({ anchorEl: e.currentTarget });
    };

    handleDelete = (e) => {
        e.stopPropagation();

        this.props.deleteListAction(this.props.id)
    };

    handleRename = (value) => {
        console.log(`new name ${value}`)
    }

    // handleRename = e => {
    //     e.stopPropagation();
    //     console.log('rename', this.props.id);
    // };

    handleClose = e => {
        e.stopPropagation();
        this.setState({ anchorEl: null });
    };

    toggleDeleteDialog = (e) => {
        e.stopPropagation();
        this.setState({ openDeleteDialog: !this.state.openDeleteDialog });
    };
    toggleRenameDialog = (e) => {
        e.stopPropagation();
        this.setState({
            openRenameDialog: !this.state.openRenameDialog
        })
    }

    render() {
        const { anchorEl, openDeleteDialog, openRenameDialog } = this.state;
        const { id, classes, listName } = this.props;
        return (
            <div>
                <DeleteDialog
                    handleClose={this.toggleDeleteDialog}
                    handleDelete={this.handleDelete}
                    open={openDeleteDialog}
                    listName={listName}
                />
                <RenameDialog
                    listName={listName}
                    open={openRenameDialog}
                    rename={this.handleRename}
                    handleClose={this.toggleRenameDialog}
                    />
                <Button
                    aria-owns={anchorEl ? `simple-menu-${id}` : undefined}
                    aria-haspopup='true'
                    onClick={this.handleClick}>
                    <Settings />
                </Button>
                <Menu
                    className={classes.dropdown}
                    id={`simple-menu-${id}`}
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.toggleDeleteDialog}>
                        Delete
                    </MenuItem>
                    <MenuItem onClick={this.toggleRenameDialog}>
                        Rename
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({

})

export default connect(
    mapStateToProps,
    {
        deleteListAction: createAction(DELETE_LIST.request)
    }

)(withStyles(styles)(Edit));
