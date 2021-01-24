import {
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_PROGRESS,
    UPDATE_PROFILE_SUCCESS,
  } from "../../actions/updateprofile/updateprofile";
  

const initialState = {
    status:'',
    hasError: false
}

export const updateProfileReducer = (state = initialState, actions) => {
    switch (actions.type) {
      case UPDATE_PROFILE_PROGRESS:
        return { ...state, status: "IN_PROGRESS" };
      case UPDATE_PROFILE_SUCCESS:
        return { ...state, status: "COMPLETED" };
      case UPDATE_PROFILE_FAILURE:
        return { ...state, status: "COMPLETED", hasError: true };
      default:
        return state;
    }
  };