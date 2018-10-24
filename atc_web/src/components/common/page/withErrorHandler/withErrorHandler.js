import React from 'react';

import Modal from '../modal/Modal';
import Aux from  '../HOC/Group';

const withErrorHandler = (WrappedComponent, axios) =>{
    return (props) => {
        return(
            <Aux>
                <Modal show>
                    Something is wrong
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}
