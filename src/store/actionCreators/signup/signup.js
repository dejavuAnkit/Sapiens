import { SIGNUP_ERROR, SIGNUP_PROGRESS, SIGNUP_SUCCESS } from '../../actions/signup/actions';

const BASE_URL = "http://localhost:3002";

export const signupRequest = (credsObj) => {
    return async (dispatch) => {
        const {login: email, password, userType} = credsObj;
        dispatch({
            type: SIGNUP_PROGRESS,
            payload:{}
        })
        try{
            const response = await fetch(`${BASE_URL}/api/v1/signup`,{
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    userType
                }),
                headers: {
                    'content-type': 'application/json'
                  }
            });
            const bodyResponse = await response.json();
            if(!response.ok){
             throw new Error(bodyResponse);   
            }
            console.log(bodyResponse);
            if(bodyResponse){
                    dispatch({
                        type: SIGNUP_SUCCESS,
                    })
            }

        } catch(e){
            dispatch({
                type: SIGNUP_ERROR,
                payload:{}
            })
            // delayTimer();
            console.log('Error', e);
        }

    }
}
