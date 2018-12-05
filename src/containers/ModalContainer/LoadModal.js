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

        <div className='modal-container'>
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
                                {/* <span
                                    className='delete'
                                    data-id={el._id}
                                    onClick={props.deleteHandler}>
                                    <img
                                        alt='delete'
                                        src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDU5IDQ1OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDU5IDQ1OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJkZWxldGUiPgoJCTxwYXRoIGQ9Ik03Ni41LDQwOGMwLDI4LjA1LDIyLjk1LDUxLDUxLDUxaDIwNGMyOC4wNSwwLDUxLTIyLjk1LDUxLTUxVjEwMmgtMzA2VjQwOHogTTQwOCwyNS41aC04OS4yNUwyOTMuMjUsMGgtMTI3LjVsLTI1LjUsMjUuNSAgICBINTF2NTFoMzU3VjI1LjV6IiBmaWxsPSIjRDgwMDI3Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=='
                                    />
                                </span> */}
                                <Edit listName={el.listName} id={el._id}/>
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
