import {  LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_PROGRESS, LOGIN_ERROR, LOGIN_INIT } from '../../actions/login/actions';

const BASE_URL = "http://localhost:3002";

export const loginRequest = (credsObj) => {
    return async (dispatch) => {
        const {login: email, password} = credsObj;
        dispatch({
            type:LOGIN_PROGRESS,
            payload:{}
        })
        try{
            const response = await fetch(`${BASE_URL}/api/v1/signin`,{
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'content-type': 'application/json'
                  }
            });
            const bodyResponse = await response.json();

            if(response.status === 401) {
                return dispatch({
                    type: LOGIN_FAILURE,
                    payload:{}
                })
            }

            if(!response.ok){
             throw new Error(bodyResponse);   
            }
            console.log(bodyResponse);
            if(bodyResponse){
                // Setting Session Storage
                const {token=""} = bodyResponse
                window.sessionStorage.setItem("token", token);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: bodyResponse
                    })
            }

        } catch(e){
            dispatch({
                type: LOGIN_ERROR,
                payload:{}
            })
            // delayTimer();
            console.log('Error', e);
        }

    }
}

export const initLoginReq = ()=> ({
    type: LOGIN_INIT,
    payload:{}
})

export const delayTimer = () => {
    const clearId = setTimeout(()=>{
        dispatch(initLoginReq())
    }, 2000);
    clearTimeout(clearId);
}