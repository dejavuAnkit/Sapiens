import {
  LOGOFF_FAILURE,
  LOGOFF_PROGRESS,
  LOGOFF_SUCCESS,
} from "../../actions/logout/actions";

const initialState = {
  status : 'INIT',
  hasError: false
}

export const logOffReducer = (state=initialState, actions)=>{
    switch(actions.type){
      case LOGOFF_PROGRESS:
        return {...state,status:'IN_PROGRESS'};
      case LOGOFF_FAILURE:
        return {...state, status:'COMPLETED', hasError: true};  
      case LOGOFF_SUCCESS:
        return {...state, status:'COMPLETED'};  
      default:
        return state;  
    }
}