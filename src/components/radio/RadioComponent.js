import React from "react";
import * as CheckBoxStyle from "./style.css";

const RadioComponent = (props) => {
  const { label, selectHandler, value } = props;
  return (
    <div className="checkbox-container">
      <span className="radio-style"><input type="radio" name="radio" value={value} id="r1" onChange={selectHandler}/></span>
      <label for="r1" className="rc-lbl">
        {label}
      </label>
    </div>
  );
};

export default RadioComponent;
