import React from 'react';

class ButtonLink extends React.Component {
    effect = null;
    state = {
        active: false
    }

    clicked =(e)=> {
        e.preventDefault();
        this.effect.classList.add('active-effect');
        this.setState({active: true})
        setTimeout(() => {
            this.effect.classList.contains('effect') && this.effect.classList.remove('active-effect');
            this.setState({active: false})
        }, 600);

        this.props.click && this.props.click(e);

    };
    render() {
        const {label, classNames, children} = this.props;
        return (
            <button
               aria-label={label ? label : null}
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

