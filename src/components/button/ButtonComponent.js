import React from 'react';
import * as button from './style.css';

const Button = (props) => {
    const {name, label, id, handler, disabled, customStyle={}} = props;
    return (
        <div className="button_wrapper">
            <button className="btn" style={customStyle} name={name} id={id} onClick={handler} disabled={disabled}>{label}</button>
        </div>
    )
}

export default Button;