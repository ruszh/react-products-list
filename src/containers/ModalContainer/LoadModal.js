//@flow
import React from 'react';
import Pagination from '../../components/Pagination';
import type { Item } from './types';
import { convertDate } from '../../utilities';
import Edit from '../Edit';
import SortSelect from '../../components/SortSelect';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

type Styles = {
    list: {
        minHeight: number
    },
    listItem: {
        position: string
    }
};

type Props = {
    sort: string,
    pages: number,
    current: number,
    listsArr?: Item[],
    sortHandler: (e: Object) => void,
    selectHandler: (e: Object) => void,
    sortHandler: (e: Object) => void,
    deleteHandler: (e: Object) => void,
    closeModal: () => { type: string },
    loadLists: (page: number, sort?: string) => void,
    classes: Styles
};

const styles: Styles = {
    list: {
        minHeight: 260
    },
    listItem: {
        position: 'relative'
    }
};

const LoadModal = (props: Props) => (
    <div className='modal-body'>
        <div className='modal-container'>
            <Typography align='center' component='h4' variant='h4'>Saved lists</Typography>
        </div>
        {props.pages > 0 && (
            <div className='modal-container row'>
                <SortSelect sort={props.sort} sortHandler={props.sortHandler} />
            </div>
        )}

        <div className='modal-container list-container'>
            <List className={props.classes.list}>
                {props.listsArr &&
                    props.listsArr.map(el => {
                        const date = convertDate(el.date);
                        return (
                            <ListItem
                                button
                                key={el._id}
                                onClick={props.selectHandler}
                                data-id={el._id}>
                                <ListItemText>{el.listName}</ListItemText>
                                <span className='date'>{date}</span>
                                <Edit listName={el.listName} id={el._id} className='edit'/>
                            </ListItem>
                        );
                    })}
            </List>
        </div>
        <div className='modal-container'>
            <Pagination
                pages={props.pages}
                current={props.current}
                selectPageHandler={props.loadLists}
            />
        </div>
        <div className='modal-container'>
            <Button color='primary' variant='contained' onClick={props.closeModal}>
                Close
            </Button>
        </div>
    </div>
);

export default withStyles(styles)(LoadModal);
