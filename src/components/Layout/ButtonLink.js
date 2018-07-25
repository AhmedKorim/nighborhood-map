import React from 'react';

const ButtonLink = (props) => {
    return (
        <a href="#"
           role="button"
           aria-label={props.label ? props.label : null}
           onClick={props.click} className={["button-link", props.classNames].join(' ')}>
            <i className="material-icons">{props.children}</i>
        </a>
    )
};
export default ButtonLink;

