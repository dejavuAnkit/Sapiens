import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { autoLogin } from "../../store/actionCreators/autlogin/autologin";

import * as Home from './style.css';

import HeaderComponent from "../header/HeaderComponent";


const HomeComponent = (props) => {
  let auth = false;
  const { routes } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  auth = useSelector((state)=>{
    return state.loginReducer.authenticated || state.googleLoginReducer.isRegistered;
  })

  useEffect(()=>{
    const token = sessionStorage.getItem('token') ||'';
    if(!token.trim().length){
      return history.push('/login');
    }
    dispatch(autoLogin());
  },[])

  return (
    <div className="wrapper">
      {auth && <HeaderComponent />}
   
        <Switch>
          {routes.map((route, index) =>
            !route.private ? (
              <Route path={route.path} key={index} >
                <route.component key={index}></route.component>
              </Route>
            ) : (
              <Route
                path={route.path}
                key={index}
                render={({ location }) =>
                  auth ? (
                    <route.component key={index}></route.component>
                  ) : (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: location },
                      }}
                    ></Redirect>
                  )
                }
              ></Route>
            )
          )}
        </Switch>
  
    </div>
  );
};

export default HomeComponent;
