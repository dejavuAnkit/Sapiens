import { STATES } from "mongoose";
import {
    AUTO_LOGIN_FAILURE,
    AUTO_LOGIN_PROGRESS,
    AUTO_LOGIN_SUCCESS
  } from "../../actions/autologin/action";

  const initialState = {
      status: 'INIT',
      hasError: false
  }

  export const autologinReducer = (state = initialState, action) => {
      switch(action.type){
          case AUTO_LOGIN_PROGRESS:
              return {...state, status:"IN_PROGRESS"};
          case AUTO_LOGIN_SUCCESS:
              return {...state, status:"COMPLETED"};  
          case AUTO_LOGIN_FAILURE:
              return {...state, staus: "COMPLETED", hasError: true};
          default:
              return state;         
      }
  }