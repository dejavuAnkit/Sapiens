import React from "react";
import * as Modal from "./style.css";

export const ModalComponent = (props) => {
  const { errMessage = "Hello Modal COmponent", children } = props;

  return (
    <>
    <div className="backdrop"></div>
    <div className="dialog">
      <div className="inner_dialog_Wrapper">
        <div className="dialog_body">{children}</div>
      </div>
    </div>
    </>
  );
};
