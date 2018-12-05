//@flow
import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

type Props = {
    sortHandler: (e: Object) => void,
    sort: string
};

const SortSelect = (props: Props) => (
    <Fragment>
        {/* <label className='col-form-label col-3' htmlFor='sort'>
            Sort by:
        </label> */}
        <FormControl>
            <InputLabel htmlFor='sort'>Sort by:</InputLabel>
            <Select
                input={<Input id='sort' />}
                native
                value={props.sort}
                onChange={props.sortHandler}>
                <option value='listName'>list name</option>
                <option value='date'>date</option>
            </Select>
        </FormControl>
    </Fragment>
);

export default SortSelect;
