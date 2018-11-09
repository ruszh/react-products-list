import React from 'react';
import PropTypes from 'prop-types';

const CheckAll = (props) => (
    <button className='btn' style={{marginBottom: "10px"}} onClick={props.checkHandler}>Check/uncheck all</button>
);

CheckAll.propTypes = {
  checkHandler: PropTypes.func.isRequired
}

export default CheckAll;