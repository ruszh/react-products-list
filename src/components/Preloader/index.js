import React from 'react';
import './Preloader.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const Preloader = props => (
    <div className='preloader content-center'>
        <CircularProgress size={100} />
    </div>
);

export default Preloader;
