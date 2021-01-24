import {
  GOOGLE_PROGRESS,
  GOOGLE_FAILURE,
  GOOGLE_SUCCESS,
} from "../../actions/google/action";

const BASE_URL = 'http://localhost:3002'

export const googleLoginRequest = (token) => {
  return async (dispatch) => {
      dispatch({
        type: GOOGLE_PROGRESS,
        payload:{}
      })
      try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/google`,{
          method: 'POST',
          body: JSON.stringify({
            token: token
          }),
          headers: {
            'content-type': 'application/json'
          }
        })
        const res = await response.json();
        dispatch({
          type: GOOGLE_SUCCESS,
          payload:res
        })
      } catch(e){
        console.log('Error', e);
      }
  };
};
