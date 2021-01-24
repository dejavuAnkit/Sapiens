import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as header from "./Header.css";

import { LogOffRequest } from "../../store/actionCreators/logout/logout";

const HeaderComponent = () => {
  const title = "HOME SELLER";
  const dispatch = useDispatch();
  const loginSelect = useSelector((state) => state.loginReducer);
  const googleSelect = useSelector((state) => state.googleLoginReducer);

  const showSwitch = () => {
    const { authenticated } = loginSelect;
    const { isRegistered } = googleSelect;
    return authenticated || isRegistered;
  };

  const logOff = () => {
    dispatch(LogOffRequest());
  };
  return (
    <div className="header">
      <h3>{title}</h3>
      <span>Your search for Property end here</span>

      {showSwitch() && (
        <React.Fragment>
        <div class="switch" onClick={logOff}>
          <div class="switch_container"></div>
          <div class="line"></div>
        </div>
        <hr></hr>
        </React.Fragment>
      )}
    </div>
  );
};

export default HeaderComponent;
