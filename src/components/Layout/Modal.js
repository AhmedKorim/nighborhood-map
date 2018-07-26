import React from 'react';

class Modal extends React.Component {
    render() {
        return (
            <div className='modal-overlay'>
                <div className="model-body" tabIndex="0">
                    <div className="modal-header">
                    </div>
                    <div className="modal-body">
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;