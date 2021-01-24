import {
  CREATE_INITIAL_POSTS_SUCCESS,
  CREATE_INITIAL_POSTS_PROGRESS,
  CREATE_INITIAL_POSTS_FAILURE,
  UPDATE_INITIAL_POSTS_FAILURE,
  UPDATE_INITIAL_POSTS_PROGRESS,
  UPDATE_INITIAL_POSTS_SUCCESS,
  RESET_INITIAL_STATE,
  FETCH_POSTS_PROGRESS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from "../../actions/posts/posts";

import {UPLOAD_RESET} from "../../actions/upload/upload";


const BASE_URL = "http://localhost:3002";

export const createPost = (updateObj) => {
  return async (dispatch) => {
      const {postid, email} = updateObj;
      dispatch({
        type:  CREATE_INITIAL_POSTS_PROGRESS,
      });
      try{
        const response = await fetch(BASE_URL+'/api/v1/posts', {
            method: 'POST',
            body: JSON.stringify({
                postid,
                email
            }),
            headers: {
                'content-type': 'application/json'
              }
        })
        const resp = await response.json();
        dispatch({
            type: CREATE_INITIAL_POSTS_SUCCESS,
            payload:{
                id: resp.id,
                postid: resp.postid
            }
        })
      } catch(e){
          console.log(e);
      }
  };
};

export const updatePost = (updateObj) => {
  return async (dispatch) => {
    const {postid, adname, area, bedroom, price, images, email} = updateObj;

    dispatch({
      type:  UPDATE_INITIAL_POSTS_PROGRESS,
    });
    try{
      const response = await fetch(BASE_URL+'/api/v1/posts', {
          method: 'PUT',
          body: JSON.stringify({
              postid,
              adname,
              area,
              bedroom,
              price,
              images,
          }),
          headers: {
              'content-type': 'application/json'
            }
      })
      const resp = await response.json();
      dispatch({
          type: RESET_INITIAL_STATE,
      })
      dispatch({
        type: UPLOAD_RESET
      })
      dispatch(getMyPost(email));
    } catch(e){
        console.log(e);
    }
  }
}

export const getMyPost = (email) => {
  return async (dispatch) => {
    dispatch({
      type:  FETCH_POSTS_PROGRESS,
    });
    try{
      const response = await fetch(`${BASE_URL}/api/v1/posts/byemail?email=${email}`)
      const resp = await response.json();
      dispatch({
          type: FETCH_POSTS_SUCCESS,
          payload: resp.data || []
      });
    } catch(e){
        console.log(e);
    }

  }
}

export const getAllPost = () => {
  return async (dispatch) => {
    dispatch({
      type:  FETCH_POSTS_PROGRESS,
    });
    try{
      const response = await fetch(`${BASE_URL}/api/v1/posts`)
      const resp = await response.json();
      dispatch({
          type: FETCH_POSTS_SUCCESS,
          payload: resp.data || []
      });
    } catch(e){
        console.log(e);
    }

  }
}


