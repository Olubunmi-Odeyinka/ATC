import React from 'react';
import './Backdrop.css';

const backdrop = (props) => {
    var returnDom = null;

    if( props && props.show)
    {
        returnDom = <div className="Backdrop" onClick={props.clicked}></div>;
    }
    return returnDom;
};

export default backdrop;