//@flow
import React from 'react';
import Lists from '../Lists';
import Search from '../Search';
import CheckAll from '../CheckAll';
import type { ListItems } from '../../containers/Dashboard/types';
import Typography from '@material-ui/core/Typography';

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
            <Typography component='h2' variant='h3'>
                {title}
            </Typography>
            <Search items={searchItems} selectHandler={selectHandler} />
            <CheckAll checkHandler={checkHandler} />
            <Lists items={items} selectHandler={selectHandler} />
        </div>
    );
};

export default ListContent;
