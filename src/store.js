import { createStore } from "redux";
import usersReducer from "../src/reducers/users-reducer";
import postsReducer from "./reducers/posts-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  allUsers: usersReducer,
  posts: postsReducer,
});

export const store = createStore(rootReducer);
