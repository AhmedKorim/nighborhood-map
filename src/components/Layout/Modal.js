import React from 'react';
import ButtonLink from "./ButtonLink";

class Modal extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className='modal-overlay' onClick={this.props.close}>
                <div className="modal" tabIndex="0">
                    <div className="modal-header">
                        <div className="modal-title"><h3> modal title</h3></div>
                        <div className="modal-close">
                            <ButtonLink click={this.props.close}>close</ButtonLink>
                        </div>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <div className="close-modal">
                            <ButtonLink click={this.props.close}><span>Close</span></ButtonLink>
                        </div>
                        <div className="ok">
                            <ButtonLink click={this.props.close}><span>OK</span></ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;