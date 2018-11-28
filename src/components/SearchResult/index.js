//@flow
import React from 'react';
import './SearchResult.css';
import type { ListItem } from '../../containers/Dashboard/types';

type Props = {
    selectHandler: (e: Object) => void,
    items: ListItem[]
};

const SearchResult = (props: Props) => (
    <ul className='search-result-container' onClick={props.selectHandler}>
        {props.items.map((item: ListItem)=> (
            <li className='search-result-item' key={item.id} value={item.id}>
                {item.name}
            </li>
        ))}
    </ul>
);

export default SearchResult;
