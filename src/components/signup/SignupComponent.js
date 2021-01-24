import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../input/Input";
import Button from "../button/ButtonComponent";
import * as ActionCreator from "../../store/actionCreators/signup/signup";
import * as Signup from "./signup.css";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useForm } from "../../customHooks/useform";
import HeaderComponent from "../header/HeaderComponent";
import RadioComponent from "../radio/RadioComponent";
import { LoaderComponent } from "../loader/LoaderComponent";


const createDeepEqualSelector = createSelectorCreator(defaultMemoize);

const LoginComponent = () => {
  const REACT_APP_GOOGLE_CLIENT_ID =
    "1032362581409-na7ha747mqbsievi9kj2grip50o9dpu8.apps.googleusercontent.com";
  //Using Custom Hook
  const [userType, setUserType] = useState();
  const { formValid, setFormValidHandler, getFormValues } = useForm([
    "login",
    "password",
  ]);
  const history = useHistory();
  const dispatch = useDispatch();
  const clickHandler = () => {
    var postData = {
      userType
    };
    var userObj = getFormValues();
    postData["login"] = userObj["login"]["value"];
    postData["password"] = userObj["password"]["value"];
    dispatch(ActionCreator.signupRequest(postData));
  };

  const inputHandler = (data) => {
    setFormValidHandler(data);
  };

  const signUpSelect = useSelector((state) => state.signupReducer);
  

  const background = formValid ? "#1eba68" : "#ccc";

    useEffect(() => {
      const {status, hasError} = signUpSelect;
      if (status === 'COMPLETED' && !hasError) {
        history.push("/login");
      }
    }, [signUpSelect]);


  const userTypeSelection = (event) => {
    setUserType(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="login_container">
        <HeaderComponent />
        {/* {loginSelect.status === 'IN_PROGRESS' ? <LoaderComponent/>: null}
    {loginSelect.hasError?<ModalComponent errMessage={loginSelect.errorMessages} />:null} */}
        <div className="content_wrapper">
          <div className="login_wrapper">
            <div className="login_body">
              <Input
                name="login"
                id="login"
                label="Username"
                required
                handler={inputHandler}
              />
              <Input
                name="password"
                id="password"
                label="Password"
                required
                handler={inputHandler}
              />
              <div className="m-bt">Please select user type</div>
              <RadioComponent label="Buyer" value="B" selectHandler={userTypeSelection}/>
              <RadioComponent label="Seller" value="S" selectHandler={userTypeSelection} />
              <div className="button_container">
                <Button
                  name="login"
                  id="login"
                  label="Sign In"
                  disabled={!formValid}
                  handler={clickHandler}
                  customStyle={{
                    width: "100%",
                    marginBottom: "10px",
                    background: background,
                    color: "#eee",
                    cursor: "pointer",
                    border: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginComponent;
