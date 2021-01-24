import {
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_PROGRESS,
  UPDATE_PROFILE_SUCCESS,
} from "../../actions/updateprofile/updateprofile";

import {
  GOOGLE_SUCCESS
} from "../../actions/google/action";

import {
  LOGIN_SUCCESS
} from "../../actions/login/actions";

const BASE_URL = 'http://localhost:3002'

export const updateProfileRequest = (updateObj) => {
    return async (dispatch)=>{
        const {email, userType } = updateObj;
        dispatch({
          type: UPDATE_PROFILE_PROGRESS
        })
        const response = await fetch(`${BASE_URL}/api/v1/updateprofile`,{
          method: 'POST',
          body: JSON.stringify({
            email,
            userType
          }),
          headers: {
            'content-type': 'application/json'
          }
        })
        const res = await response.json();
        dispatch({
          type: UPDATE_PROFILE_SUCCESS
        })
        dispatch({
          type: GOOGLE_SUCCESS,
          payload:{
            isRegistered: true
          }
        });
        dispatch({
          type:LOGIN_SUCCESS,
          payload:{
            user:{
              email,
              userType
            }
          }
        })
    }
}
