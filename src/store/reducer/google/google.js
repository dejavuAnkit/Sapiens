import {
  GOOGLE_PROGRESS,
  GOOGLE_FAILURE,
  GOOGLE_SUCCESS,
  GOOGLE_INIT
} from "../../actions/google/action";

const initialState = {
  hasError: false,
  isRegistered: false,
  status: "INIT",
  authenticated: false,
  userType:''
};

export const googleLoginReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GOOGLE_INIT:
      return {...state, ...initialState}
    case GOOGLE_PROGRESS:
      return { ...state, status: "IN_PROGRESS" };
    case GOOGLE_SUCCESS:
      return { ...state, status: "COMPLETED", ...actions.payload, authenticated:true };
    case GOOGLE_FAILURE:
      return { ...state, status: "COMPLETED", hasError: true };
    default:
      return state;
  }
};
