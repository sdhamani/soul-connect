import { createContext, useContext } from "react";
import { useState, useReducer } from "react";
import allIdeas from "../data/ideas";
import users from "../data/users";
import useLogin from "./login-context";
const IdeasContainer = createContext();

export default function useIdeas() {
  return useContext(IdeasContainer);
}

export function IdeasProvider({ children }) {
  const initialIdeas = allIdeas;
  const { employeeId } = useLogin();
  const loggedInUser = users.find((user) => user.employeeId === employeeId);

  const [ideas, ideasDispatch] = useReducer(dispatchfun, initialIdeas);

  function dispatchfun(state, value) {
    console.log({ state }, { value });
    const ideaId = value.PAYLOAD;
    switch (value.TYPE) {
      case "VOTES":
        return state.slice().sort(function (a, b) {
          let aVotesLength = a.votes.length;
          let bVotesLength = b.votes.length;
          return bVotesLength - aVotesLength;
        });

      case "EARLIEST_DATE":
        return state.slice().sort(function (a, b) {
          a = a.creationDate.split("/");
          b = b.creationDate.split("/");
          return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        });
      case "OLDEST_DATE":
        return state.slice().sort(function (a, b) {
          a = a.creationDate.split("/");
          b = b.creationDate.split("/");
          return b[2] - a[2] || b[1] - a[1] || b[0] - a[0];
        });

      case "ADDIDEA":
        return [...state, value.PAYLOAD];
      case "LIKE":
        return state.map((idea) => {
          if (idea.id === ideaId) {
            return idea.votes.includes(loggedInUser.id)
              ? {
                  ...idea,
                  votes: idea.votes.find((vote) => vote !== loggedInUser.id),
                }
              : { ...idea, votes: [...idea.votes, loggedInUser.id] };
          }
          return idea;
        });

      default:
        return state;
    }
  }

  return (
    <IdeasContainer.Provider
      value={{
        ideas: ideas,
        ideasDispatch: ideasDispatch,
      }}
    >
      {children}
    </IdeasContainer.Provider>
  );
}
