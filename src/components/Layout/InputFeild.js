import React from "react";

const Input = (props) => {
    const {type, label, placeholder, change, val, id, focus, blur, children} = props;
    return (
        <div className="form-input">
            <label htmlFor={id}>{placeholder ? placeholder : null}</label>
            <input id={id} type={type ? type : 'text'} aria-label={label ? label : null}
                   onChange={change}
                   value={val}
                   onFocus={focus}
                   onBlur={blur}
            />
            <span className="tail stationary"></span>
            <span className="tail active"></span>
            {children && <i className="material-icons">{children}</i>}
        </div>
    )
};
export default Input;

