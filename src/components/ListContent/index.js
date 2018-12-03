//@flow
import React from 'react';
import List from '../List';
import Search from '../Search';
import CheckAll from '../CheckAll';
import type { ListItems } from '../../containers/Dashboard/types';

type Props = {
    title: string,
    searchItems: ListItems,
    items: ListItems,
    selectHandler: (e: Object) => void,
    checkHandler: Function
};

const ListContent = (props: Props) => {
    const { title, searchItems, items, selectHandler, checkHandler } = props;
    return (
        <div className='col'>
            <h2>{title}</h2>
            <Search items={searchItems} selectHandler={selectHandler} />
            <CheckAll checkHandler={checkHandler} />
            <List items={items} selectHandler={selectHandler} />
        </div>
    );
};

export default ListContent;
