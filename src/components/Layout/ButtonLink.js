import React from 'react';

const ButtonLink = (props) => {
    return (
        <a href="#" onClick={props.click} className={["button-link" ,props.classNames].join(' ')}>
            <i className="material-icons">{props.children}</i>
        </a>
    )
};
export default ButtonLink;

