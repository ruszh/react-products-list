import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import Search from '../Search';
import CheckAll from '../CheckAll';

const ListContent = (props) => {
        const {
            title,
            searchItems,
            items,
            selectHandler,
            checkHandler
        } = props;
        return (
            <div className='col'>
                 <h2>{title}</h2>
                 <Search items={searchItems} selectHandler={selectHandler}/>
                 <CheckAll checkHandler={checkHandler}/>
                 <List items={items} selectHandler={selectHandler}/>
            </div>
        )
};

ListContent.propTypes = {
    title: PropTypes.string.isRequired,
    searchItems: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    selectHandler: PropTypes.func.isRequired,
    checkHandler: PropTypes.func.isRequired
}

export default ListContent;