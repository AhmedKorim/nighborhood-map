import React from 'react';

const ButtonLink = (props) => {
    return (
        <a href="#"
           role="button"
           aria-label={props.label ? props.label : null}
           onClick={props.click} className={["button-link", props.classNames].join(' ')}>
            <span className="btn-content" tabIndex="-1">
            <i className="material-icons ">{props.children}</i>
            </span>
        </a>
    )
};
export default ButtonLink;

