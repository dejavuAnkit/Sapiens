import React, { useReducer } from "react";
import * as input from "./Input.css";

const initialState = {
  value: "",
  pristine: true,
  error: {
    hasError: false,
    errMessage: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        value: action.payload.value,
        pristine: false,
        error: {
          hasError: false,
          errMessage: "",
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        value: '',
        pristine: false,
        error: {
          hasError: true,
          errMessage: action.payload.error.errMessage,
        },
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const { id, name, label, required, handler, noLabel=false, placeholder, style={}, nomargin } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const inputHandler = (evt) => {
    const val = evt.target.value;
    if (required && !val.trim().length) {
    dispatch({
        type: "SET_ERROR",
        payload: {
          error: {
            hasError: true,
            errMessage: `Please enter value for User ${label}`,
          },
        },
      });
      handler({value:'', hasError: true, id})
    } else {
      dispatch({
        type: "SET_VALUE",
        payload:{
          value: val
        }
      })
      handler({value:val, hasError:false, id})
    }
  };

  return (
    <div className={nomargin?null:"input_wrapper"}>
    {
      !noLabel?(
        <div className="inpt_lbl">
        <label className="input_text" htmlFor={id}>
          {label}
        </label>
      </div>
      ):null
    }

      <div>
        <input
          className="input"
          type="text"
          name={name}
          id={id}
          onChange={inputHandler}
          style={style}
          placeholder={placeholder}
        />
      </div>
      <p className="error">
      {state.error.hasError && !state.pristine?state.error.errMessage:''}    
      </p>
    </div>
  );
};

export default Input;
