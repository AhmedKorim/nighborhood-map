import React from 'react';
import ButtonLink from "./ButtonLink";
import {fetchImges} from "../../data/Forsquare";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

class Modal extends React.Component {
    state = {
        imgData: null
    }
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
        document.querySelector('.modal').focus();
        this.focusEl = Array.from(document.querySelectorAll('.modal button , .modal [tabIndex="-1"]'));
        fetchImges(this.props.activeLocation.key)
            .then(resp => this.mounntImage(resp))
            .catch(error => console.log(error))
    }

    mounntImage = (imageData) => {
        this.setState({imgData: imageData})
    };

    componentWillUnmount() {
        document.querySelector('.modal').classList.remove('fade');
        this.lastActiveElement.focus();
    }

    render() {
        const {activeLocation} = this.props;
        return (
            <div className='modal-overlay' onKeyDown={this.trap} onClick={this.overClose}>
                <div className="modal" tabIndex="0" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-title"><h3> {activeLocation.name}</h3></div>
                        <div className="modal-close">
                            <ButtonLink click={this.overClose}>close</ButtonLink>
                        </div>
                    </div>
                    <div className="modal-body">
                        <PerfectScrollbar>
                            {this.state.imgData && <div className="img-wrapper">
                                <img src={this.state.imgData.imgSrc} alt={activeLocation.name}/>
                            </div>}
                            <div className="place-over-view">
                                <div className="data">
                                    <ul>
                                        <li>
                                            <span>address</span> <p>{activeLocation.location.address}</p>
                                        </li>
                                        <li>
                                            <span>crossStreet</span> <p>{activeLocation.location.crossStreet}</p>
                                        </li>
                                        <li>
                                            <span>postalCode</span> <p>{activeLocation.location.postalCode}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div id="pano" tabIndex="-1" aria-hidden="true"></div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                    <div className="modal-footer">
                        <div className="close-modal">
                            <ButtonLink click={this.overClose}><span>Close</span></ButtonLink>
                        </div>
                        <div className="ok">
                            <ButtonLink click={this.overClose}><span>OK</span></ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;