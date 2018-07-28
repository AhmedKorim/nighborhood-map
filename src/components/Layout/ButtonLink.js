import React from 'react';

class ButtonLink extends React.Component {
    effect = null;
    state = {
        active: false
    };
    timeOut;
    clicked = (e) => {
        e.preventDefault();
        this.effect.classList.add('active-effect');
        this.setState({active: true});
        this.timeOut = setTimeout(() => {
            (this.effect && this.effect.classList.contains('effect')) && this.effect.classList.remove('active-effect');
            this.setState({active: false})
        }, 600);
        this.props.click && this.props.click(e);

    };
    keyPress = (e) =>{
        if(this.props.keyPressed && e.key ==="Enter"){
            e.preventDefault();
                this.effect.classList.add('active-effect');
                this.setState({active: true});
                this.timeOut = setTimeout(() => {
                    (this.effect && this.effect.classList.contains('effect')) && this.effect.classList.remove('active-effect');
                    this.setState({active: false})
                }, 600);
              this.props.keyPressed(e);
        }
    }

    componentWillUnmount() {
        window.clearTimeout(this.timeOut)
    }

    render() {
        const {label, classNames, children } = this.props;
      
        return (
            <button
                aria-label={label ? label : null}
                onKeyDown={this.keyPress}
                onClick={this.clicked} className={["button-link", classNames].join(' ')}>
                <div className="btn-content" tabIndex="-1">
                    <div ref={(el) => this.effect = el} className="effect"></div>
                    {children.length ? <i className="material-icons " aria-hidden="true">{children}</i> : children}
                </div>
            </button>
        )
    }


}

export default ButtonLink;

