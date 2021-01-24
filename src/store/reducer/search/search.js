import {
  SEARCH_FAILURE,
  SEARCH_SUCCESS,
  SEARCH_PROGRESS,
  SEARCH_ERROR,
  SEARCH_INIT,
  SET_SEARCH_TRIES,
} from "../../actions/search/actions";

const initialState = {
  tries: 3,
  results: [],
  hasError: false,
  errorMessages: false,
  status: "INIT",
  searchStartTime: null,
  totalPopulation: 0,
};

export const searchReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SEARCH_INIT:
      return { ...state, ...initialState };
    case SET_SEARCH_TRIES:
      return { ...state, tries: actions.payload.tries };
    case SEARCH_PROGRESS:
      return {
        ...state,
        hasError: false,
        errorMessages: "",
        status: "IN_PROGRESS",
      };
    case SEARCH_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessages: actions.payload.errorMessages,
        status: "COMPLETED",
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        hasError: false,
        errorMessages: "",
        status: "COMPLETED",
        totalPopulation: actions.payload.totalPopulation,
        results: actions.payload.results,
        tries: actions.payload.tries,
        searchStartTime: actions.payload.searchStartTime
      };
    default:
      return state;
  }
};
