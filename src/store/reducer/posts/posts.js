import {
    CREATE_INITIAL_POSTS_FAILURE,
    CREATE_INITIAL_POSTS_PROGRESS,
    CREATE_INITIAL_POSTS_SUCCESS,
    RESET_INITIAL_STATE,
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_PROGRESS,
    FETCH_POSTS_SUCCESS
} from "../../actions/posts/posts";
  

const initialState = {
    status:'INIT',
    hasError: false,
    postid:'',
    id:'',
}

const postDataInit = {
  hasError: false,
  status: 'INIT',
  posts: []
}

export const postReducer = (state = initialState, actions) => {
    switch (actions.type) {
      case CREATE_INITIAL_POSTS_PROGRESS:
        return { ...state, status: "IN_PROGRESS" };
      case CREATE_INITIAL_POSTS_SUCCESS:
        return { ...state, status: "COMPLETED", id: actions.payload.id, postid: actions.payload.postid};
      case CREATE_INITIAL_POSTS_FAILURE:
        return { ...state, status: "COMPLETED", hasError: true };
      case RESET_INITIAL_STATE:
        return {...state, ...initialState}  
      default:
        return state;
    }
  };

  export const postDataReducer = (state = postDataInit, actions) => {
    switch (actions.type) {
      case FETCH_POSTS_PROGRESS:
        return { ...state, status: "IN_PROGRESS" };
      case FETCH_POSTS_SUCCESS:
        return { ...state, status: "COMPLETED", posts:[...actions.payload]};
      case CREATE_INITIAL_POSTS_FAILURE:
        return { ...state, status: "COMPLETED", hasError: true };
      default:
        return state;
    }
  };