import React from 'react';
import ButtonLink from "./ButtonLink";

class Modal extends React.Component {
    render() {
        const {closeModal} = this.props;
        return (
            <div className='modal-overlay' onClick={closeModal}>
                <div className="modal" tabIndex="0">
                    <div className="modal-header">
                        <div className="modal-title"><h3> modal title</h3></div>
                        <div className="modal-close">
                            <ButtonLink click={closeModal}>close</ButtonLink>
                        </div>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <div className="close-modal">
                            <ButtonLink click={closeModal}><span>Close</span></ButtonLink>
                        </div>
                        <div className="ok">
                            <ButtonLink click={closeModal}><span>OK</span></ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;