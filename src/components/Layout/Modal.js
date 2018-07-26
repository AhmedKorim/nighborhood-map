import React from 'react';
import ButtonLink from "./ButtonLink";

class Modal extends React.Component {
    overClose = (e) => {
        e.stopPropagation();
        document.querySelector('.modal').classList.add('fade');
        setTimeout(() => {
            this.props.close();
        }, 350)
    };
    focusEl = null;
    lastActiveElement = null;
    trap = (e) => {
        if (e.key !== "Enter") {
            e.preventDefault();
        }
        if (e.key === 'Escape') {
            this.overClose(e)
        }
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (this.focusEl.indexOf(document.activeElement) - 1 >= 0) {
                    this.focusEl[this.focusEl.indexOf(document.activeElement) - 1].focus();
                } else {
                    this.focusEl[this.focusEl.length - 1].focus();
                }
                return;
            }
            if (this.focusEl.indexOf(document.activeElement) + 1 < this.focusEl.length) {
                this.focusEl[this.focusEl.indexOf(document.activeElement) + 1].focus();
            } else {
                this.focusEl[0].focus();

            }

        }
    };

    componentDidMount() {
        this.lastActiveElement = document.activeElement;
        document.querySelector('.modal button').focus();
        this.focusEl = Array.from(document.querySelectorAll('.modal button'));
    }

    componentWillUnmount() {
        document.querySelector('.modal').classList.remove('fade');
        this.lastActiveElement.focus();
    }

    render() {
        return (
            <div className='modal-overlay' onKeyDown={this.trap} onClick={this.overClose}>
                <div className="modal" tabIndex="0" onClick={(e) => e.stopPropagation()}>
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