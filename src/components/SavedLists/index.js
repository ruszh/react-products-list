import React from 'react';
import './SavedLists.css';
import SaveModal from '../../containers/SaveModal';
import LoadModal from '../../containers/LoadModal';


const SavedLists = (props) => (
    <div className='row'>
        <LoadModal
            userId={props.userId}
            loadList={props.loadList}
            lists={props.listsArr}/>
        <SaveModal
            userId={props.userId}
            selectedItems={props.getSelectedItems}
            saveList={props.saveList}
            />
    </div>
);

export default SavedLists;


