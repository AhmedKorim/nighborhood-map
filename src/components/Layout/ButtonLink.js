import React from 'react';

const ButtonLink = (props) => {
    const {label, classNames, click, children} = props;

    return (
        <a href="#"
           role="button"
           aria-label={label ? props.label : null}
           onClick={click} className={["button-link", classNames].join(' ')}>
            <div className="btn-content" tabIndex="-1">
                {children.length ? <i className="material-icons " aria-hidden="true">{children}</i> : children}
            </div>
        </a>
    )
};
export default ButtonLink;

