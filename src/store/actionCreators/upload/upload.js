import {
UPLOAD_FAILURE,
UPLOAD_PROGRESS,
UPLOAD_SUCCESS
  } from "../../actions/upload/upload";
  

  const BASE_URL = 'http://localhost:3002'
  
  export const uploadImage = (updateObj) => {
      return async (dispatch)=>{
          const {postid, createdby, image } = updateObj;
          dispatch({
            type: UPLOAD_PROGRESS
          })
          const formData = new FormData()
          formData.append('image', image);
          formData.append('author', createdby);
          formData.append('id', postid);
          const response = await fetch(`${BASE_URL}/api/v1/upload`,{
            method: 'POST',
            body: formData
          })
          const res = await response.json();
          dispatch({
            type: UPLOAD_SUCCESS,
            payload: {
              image: res.path,
              id: postid,
              author: createdby
            }
          })
      }
  }
  