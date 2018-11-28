//@flow
import React from 'react';

const CheckAll = (props: { checkHandler: Function}) => (
    <button className='btn' style={{marginBottom: "10px"}} onClick={props.checkHandler}>Check/uncheck all</button>
);


export default CheckAll;