import React from 'react';

import Backdrop from '../backdrop/Backdrop';
import Aux from '../HOC/Group';
import './Modal.css'

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className="Modal"
            style={{
                transform: props.show ? 'translationY[(0)' : 'translationY[(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;
