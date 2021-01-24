import {
    UPLOAD_FAILURE,
    UPLOAD_PROGRESS,
    UPLOAD_SUCCESS,
    UPLOAD_RESET
  } from "../../actions/upload/upload";
  


const initialState = {
    status:'',
    hasError: false,
    images:[],
    author:'',
    id:''
}

export const uploadReducer = (state = initialState, actions) => {
    switch (actions.type) {
      case UPLOAD_PROGRESS:
        return { ...state, status: "IN_PROGRESS" };
      case UPLOAD_SUCCESS:
        return { ...state, status: "COMPLETED", images:[...state.images, actions.payload.image],author:actions.payload.author, id: actions.payload.id };
      case UPLOAD_FAILURE:
        return { ...state, status: "COMPLETED", hasError: true };
      case UPLOAD_RESET:
        return { ...state, ...initialState};  
      default:
        return state;
    }
  };