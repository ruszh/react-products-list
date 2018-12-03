//@flow
import React from 'react';
import './List.css';
import type { ListItems } from '../../containers/Dashboard/types';

type Props = {
    //$FlowFixMe
    items: ListItems,
    selectHandler: (e: Object) => void
};

const List = (props: Props) => (
    <div>
        <ul className='list-group item-list'>
            {props.items.map(el => (
                <li
                    className={
                        el.active
                            ? 'list-group-item'
                            : 'list-group-item not-active'
                    }
                    key={el.id}>
                    <div className='checkbox-container'>
                        <input
                            type='checkbox'
                            className='checkbox'
                            checked={el.selected}
                            value={el.id}
                            onChange={props.selectHandler}
                        />
                    </div>
                    {el.name}
                </li>
            ))}
        </ul>
    </div>
);

export default List;
