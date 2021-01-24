import { SIGNUP_ERROR, SIGNUP_PROGRESS, SIGNUP_SUCCESS } from '../../actions/signup/actions';

const initialState = {
    status:'INIT',
    errorMessages:'',
    hasError: false
} 

export const signupReducer = (state=initialState, actions) => {
    switch (actions.type){
        case SIGNUP_PROGRESS:
            return {...state, status:'IN_PROGRESS'};
        case SIGNUP_SUCCESS:
            return {...state,status:'COMPLETED', hasError: false, errorMessages:''};    
        case SIGNUP_ERROR:
            return {...state, status:'COMPLETED', hasError: true, errorMessages:'There is some technical Error'};    
        default:
            return state;    
    }
}
