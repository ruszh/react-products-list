//@flow
import React from 'react';
import './List.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import type { ListItems } from '../../containers/Dashboard/types';


type Props = {
    //$FlowFixMe
    items: ListItems,
    selectHandler: (e: Object) => void
};

const Lists = (props: Props) => (
    <List>
        {props.items.map(el => (
            <ListItem key={el.id} className={el.active ? '' : 'not-active'}>
                <Checkbox
                    className='checkbox'
                    checked={el.selected}
                    value={el.id}
                    onChange={props.selectHandler}
                />
                <ListItemText primary={el.name} />
            </ListItem>
        ))}
    </List>
);

export default Lists;
