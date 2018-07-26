import React from 'react';

class ButtonLink extends React.Component {
    clicked = (e) => {
        e.preventDefault();
        this.props.click();
    };

    render() {
        const {label, classNames, children} = this.props;
        return (
            <a href="#"
               role="button"
               aria-label={label ?label : null}
               onClick={this.clicked} className={["button-link", classNames].join(' ')}>
                <div className="btn-content" tabIndex="-1">
                    {children.length ? <i className="material-icons " aria-hidden="true">{children}</i> : children}
                </div>
            </a>
        )
    }


}

export default ButtonLink;

