import {
  AUTO_LOGIN_FAILURE,
  AUTO_LOGIN_PROGRESS,
  AUTO_LOGIN_SUCCESS,
} from "../../actions/autologin/action";

import { LOGIN_ERROR, LOGIN_SUCCESS } from "../../actions/login/actions";

const BASE_URL = "http://localhost:3002";

export const autoLogin = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTO_LOGIN_PROGRESS,
      });
      const token = sessionStorage.getItem("token") || "";
      const response = await fetch(`${BASE_URL}/api/v1/autologin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const bodyResponse = await response.json();

      if (response.status === 401) {
        sessionStorage.removeItem('token');
        return dispatch({
          type: AUTO_LOGIN_FAILURE,
          payload: {},
        });
      }

      if (!response.ok) {
        throw new Error(bodyResponse);
      }

      if (bodyResponse) {
        // Setting Session Storage
        dispatch({
          type: AUTO_LOGIN_SUCCESS,
        });

        dispatch({
          type: LOGIN_SUCCESS,
          payload: bodyResponse,
        });
      }
    } catch (e) {
      dispatch({
        type: AUTO_LOGIN_FAILURE,
      });
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          authenticated: false,
        },
      });
    }
  };
};
