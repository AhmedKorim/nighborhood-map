import React from "react";

const Input = (props) => {
    const {type, label, placeholder, change, val, id,focus, clean} = props;
    let state = 'clean';
    return (
        <div className={["form-input", clean ? "clean" : "dirty"].join(" ")}>
            <label htmlFor={id}>{placeholder ? placeholder : null}</label>
            <input id={id} type={type ? type : 'text'} aria-label={label ? label : null}
                   onChange={change}
                   value={val}
                   onFocus={focus}
                   onBlur={focus}
            />
        </div>
    )
};
export default Input;

