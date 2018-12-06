//@flow
import React, { Component } from 'react';
import DeleteDialog from './DeleteDialog';
import RenameDialog from './RenameDialog';

import { connect } from 'react-redux';
import { createAction } from '../../utilities';
import { DELETE_LIST, RENAME_LIST, ALERT_ERROR } from '../../constants';

import type { State } from '../../store/types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Settings from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';

type Styles = {
    dropdown: {
        zIndex: number
    },
    button: {
        '&:hover': {
            background: string
        }
    }
};

type Props = {
    id: string,
    classes: Styles,
    listName: string,
    deleteListAction: (id: string) => Object,
    renameListAction: ({ listId: string, listName: string }) => Object,
    alertErrorAction: (message: string) => Object
};

type EditState = {
    anchorEl?: any,
    openDeleteDialog: boolean,
    openRenameDialog: boolean
};

const styles: Styles = {
    dropdown: {
        zIndex: 10001
    },
    button: {
        opacity: 0,
        '&:hover': {
            background: 'none',
            opacity: 1
        }
    }
};

class Edit extends Component<Props, EditState> {
    state = {
        anchorEl: null,
        openDeleteDialog: false,
        openRenameDialog: false
    };

    handleClick = (e: SyntheticEvent<any>) => {
        e.stopPropagation();
        this.setState({ anchorEl: e.currentTarget });
    };

    handleDelete = (e: SyntheticEvent<any>) => {
        e.stopPropagation();
        this.props.deleteListAction(this.props.id);
        this.setState({ anchorEl: null });
    };

    handleRename = (value: string) => {
        const { renameListAction, id, listName, alertErrorAction } = this.props;
        if(listName === value) {
            return alertErrorAction('Name is not changed');
        }
        if(!value) {
            return alertErrorAction('Name field is empty');
        }
        renameListAction({ listId: id, listName: value });
        this.setState({ openRenameDialog: false, anchorEl: null });
    };

    handleClose = (e: SyntheticEvent<any>) => {
        e.stopPropagation();
        this.setState({ anchorEl: null });
    };

    toggleDeleteDialog = (e: SyntheticEvent<any>) => {
        e.stopPropagation();
        this.setState({ openDeleteDialog: !this.state.openDeleteDialog });
    };
    toggleRenameDialog = (e: SyntheticEvent<any>) => {
        e.stopPropagation();
        this.setState({
            openRenameDialog: !this.state.openRenameDialog
        });
    };

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
                    size='small'
                    className={classes.button}
                    disableRipple={true}
                    aria-owns={anchorEl ? `simple-menu-${id}` : undefined}
                    aria-haspopup='true'
                    onClick={this.handleClick}>
                    <Settings />
                </Button>
                <Menu
                    onBackdropClick={e => e.stopPropagation()}
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

const mapStateToProps = (state: State): Object => ({});

export default connect(
    mapStateToProps,
    {
        deleteListAction: createAction(DELETE_LIST.request),
        renameListAction: createAction(RENAME_LIST.request),
        alertErrorAction: createAction(ALERT_ERROR.request)
    }
)(withStyles(styles)(Edit));
