import React from 'react';

class Alert extends React.Component {
    alertBody = null;
    timeOut = null;
    close = () => {
        this.alertBody.classList.remove('visable');
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
                this.props.closeAlert();
            }, 1000
        )
    }


    componentDidMount() {
        this.alertBody.classList.add('visable');
        this.timeOut = setTimeout(() => {
            this.alertBody.classList.remove('visable')
        }, 5000);
    }

    componentWillUnmount() {
        window.clearTimeout(this.timeOut);
    }

    render() {
        return (
            <div ref={el => this.alertBody = el} onClick={this.close} className="alertBody">
                <div className="alert">
                    <div className="message">
                        <p>{this.props.message}</p>
                    </div>
                    <div className="icons">
                        <i className="material-icons">close</i>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alert;