import { createStore } from "redux";
import usersReducer from "../src/reducers/users-reducer";
import postsReducer from "./reducers/posts-reducer";
import loginReducer from "./reducers/login-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  allUsers: usersReducer,
  posts: postsReducer,
  loggedInUser: loginReducer,
});

export const store = createStore(rootReducer);
