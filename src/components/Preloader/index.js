import React from 'react';
import './Preloader.css';
import CircularProgress from '@material-ui/core/CircularProgress';
//import { withStyles } from '@material-ui/core/styles';



const Preloader = (props) => (
    <div
        className='preloader content-center'>
        {/* <img
            src='https://camo.githubusercontent.com/a1a81b0529517027d364ee8432cf9a8bd309542a/687474703a2f2f692e696d6775722e636f6d2f56446449444f522e676966'
            alt='preloader'
        /> */}
        <CircularProgress size={100} />
    </div>
);

export default Preloader;
