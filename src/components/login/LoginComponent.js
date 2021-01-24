import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../input/Input";
import Button from "../button/ButtonComponent";
import CheckBox from "../radio/RadioComponent";
import * as ActionCreator from "../../store/actionCreators/login/login";
import * as googleActionCreator from "../../store/actionCreators/google/google";
import * as updateProfileActionCreator from "../../store/actionCreators/updateprofile/updateprofile";
import * as Login from "./Login.css";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useForm } from "../../customHooks/useform";
import HeaderComponent from "../header/HeaderComponent";
import RadioComponent from "../radio/RadioComponent";
import { LoaderComponent } from "../loader/LoaderComponent";
import { ModalComponent } from "../modal/ModalComponent";
import { ToastProvider, useToasts } from "react-toast-notifications";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize);

const LoginComponent = () => {
  const { addToast } = useToasts()
  const REACT_APP_GOOGLE_CLIENT_ID =
    "1032362581409-na7ha747mqbsievi9kj2grip50o9dpu8.apps.googleusercontent.com";
  //Using Custom Hook
  const consent = "Login as a Seller";
  const [userType, setUserType] = useState();
  const { formValid, setFormValidHandler, getFormValues } = useForm([
    "login",
    "password",
  ]);
  const history = useHistory();
  const dispatch = useDispatch();
  const clickHandler = () => {
    var postData = {};
    var userObj = getFormValues();
    postData["login"] = userObj["login"]["value"];
    postData["password"] = userObj["password"]["value"];
    dispatch(ActionCreator.loginRequest(postData));
  };

  const inputHandler = (data) => {
    setFormValidHandler(data);
  };

  const loginSelect = useSelector((state) => state.loginReducer);
  const googleSelect = useSelector((state) => state.googleLoginReducer);

  const background = formValid ? "#1eba68" : "#ccc";
  useEffect(() => {
    console.log("USE EFFECT", googleSelect);
    const { authenticated, hasError,errorMessages:error } = loginSelect;
    const { isRegistered, hasError:hasGerror,errorMessages:gerror } = googleSelect;

    if(hasError || hasGerror){
      addToast(error || gerror, { appearance: 'error' })
    }

    if (authenticated || isRegistered) {
      history.push("/products");
    }
  }, [loginSelect, googleSelect]);

  const handleGoogleLogin = (data) => {
    const { tokenId } = data;
    dispatch(googleActionCreator.googleLoginRequest(tokenId));
  };

  const userTypeSelection = (event) => {
    setUserType(event.target.value);
  };

  const registerHandler = () => {
    const { email } = googleSelect;
    dispatch(
      updateProfileActionCreator.updateProfileRequest({ email, userType })
    );
  };

  const goToSignUp = () => {
    history.push("/signup");
  };

  return (
    <React.Fragment>
      <ToastProvider></ToastProvider>
      <div className="login_container">
        <HeaderComponent />
        {!googleSelect.isRegistered && googleSelect.status === "COMPLETED" && (
          <ModalComponent>
            <div className="m-bt">Please select user type</div>
            <RadioComponent
              label="Buyer"
              value="B"
              selectHandler={userTypeSelection}
            />
            <RadioComponent
              label="Seller"
              value="S"
              selectHandler={userTypeSelection}
            />
            <Button
              name="register"
              id="register"
              label="Register"
              handler={registerHandler}
              customStyle={{
                width: "100%",
                disabled: !userType,
                marginBottom: "10px",
                background: !userType ? "#ccc" : "#1eba68",
                color: "#eee",
                cursor: "pointer",
                border: "none",
              }}
            />
          </ModalComponent>
        )}
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
                <GoogleLogin
                  clientId={REACT_APP_GOOGLE_CLIENT_ID}
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleLogin}
                  render={(renderProps) => (
                    <Button
                      name="google"
                      id="google"
                      label="Continue with Google"
                      handler={renderProps.onClick}
                      customStyle={{
                        width: "100%",
                        background: "#1a73e8",
                        color: "#eee",
                        cursor: "pointer",
                        border: "none",
                      }}
                    />
                  )}
                  cookiePolicy={"single_host_origin"}
                />
                <div className="signup-text">
                  New to Home Seller?{" "}
                  <span onClick={goToSignUp}>Create Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginComponent;
