import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_PROGRESS, LOGIN_ERROR, LOGIN_INIT } from '../../actions/login/actions';

const initialState = {
    authenticated: false,
    user:{},
    status:'INIT',
    errorMessages:'',
    hasError: false,
    userType:''
} 

export const loginReducer = (state=initialState, actions) => {
    switch (actions.type){
        case LOGIN_INIT:
            return {...state, ...initialState}
        case LOGIN_PROGRESS:
            return {...state, authenticated: false, user:{}, status:'IN_PROGRESS'};
        case LOGIN_SUCCESS:
            return {...state, authenticated: true, ...actions.payload, status:'COMPLETED', hasError: false, errorMessages:''};    
        case LOGIN_FAILURE:
            return {...state, authenticated: false, user:{}, status:'COMPLETED', hasError: true, errorMessages:'Wrong Credentials'};
        case LOGIN_ERROR:
            return {...state, authenticated: false, user:{}, status:'COMPLETED', hasError: true, errorMessages:'There is some technical Error'};    
        default:
            return state;    
    }
}
