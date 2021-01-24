import {LOGOFF_FAILURE, LOGOFF_PROGRESS, LOGOFF_SUCCESS } from "../../actions/logout/actions";

import {LOGIN_INIT} from "../../actions/login/actions";
import {GOOGLE_INIT} from "../../actions/google/action";


export const LogOffRequest=() => {
    return async (dispatch)=>{
        dispatch({
            type: LOGOFF_PROGRESS
        })
        try{
            sessionStorage.removeItem("token");
            dispatch({
                type:LOGIN_INIT
            });
            dispatch({
                type:GOOGLE_INIT
            });
            dispatch({
                type: LOGOFF_SUCCESS
            })
        } catch(e) {
            dispatch({
                type: LOGOFF_FAILURE
            })
        }

    }
}