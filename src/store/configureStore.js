import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  loginReducer,
  searchReducer,
  googleLoginReducer,
  updateProfileReducer,
  uploadReducer,
  postReducer,
  postDataReducer,
  signupReducer,
  autologinReducer,
  logOffReducer,
  purchaseReducer,
} from "./reducer";
const rootReducer = {
  loginReducer,
  searchReducer,
  googleLoginReducer,
  updateProfileReducer,
  uploadReducer,
  postReducer,
  postDataReducer,
  signupReducer,
  autologinReducer,
  logOffReducer,
  purchaseReducer,
};
const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk));

console.log("INITIAL", store.getState());

store.subscribe(() => {
  console.log("Subscribed");
  console.log(store.getState());
});

export { store };
