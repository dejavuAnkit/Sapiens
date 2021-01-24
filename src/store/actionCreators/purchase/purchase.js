import {
  PURCHASE_IN_FAILURE,
  PURCHASE_IN_SUCCESS,
  PURCHASE_IN_PROGRESS,
} from "../../actions/purchase/purchase";

import { getAllPost } from "../../actionCreators/posts/posts"

const BASE_URL = "http://localhost:3002";

export const purchaseRequest = (purchaseObj) => {
  return async (dispatch) => {
    const { postid, email } = purchaseObj;
    dispatch({
      type: PURCHASE_IN_PROGRESS,
    });
    try {
      const response = await fetch(`${BASE_URL}/api/v1/purchase`, {
        method: "PUT",
        body: JSON.stringify({
          postid,
          email
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 401) {
        return dispatch({
          type: PURCHASE_IN_FAILURE,
          payload: {},
        });
      }

      const bodyResponse = await response.json();

      if (!response.ok) {
        throw new Error(bodyResponse);
      }

      dispatch({
          type: PURCHASE_IN_SUCCESS
      });
      
      dispatch(getAllPost());

    } catch (e) {
      dispatch({
        type: PURCHASE_IN_FAILURE,
      });
    }
  };
};
