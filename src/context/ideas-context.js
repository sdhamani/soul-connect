import { createContext, useContext } from "react";
import { useReducer } from "react";
import ideaDispatchFun from "../reducers/ideas-reducer";

import allIdeas from "../data/ideas";

const IdeasContainer = createContext();

export default function useIdeas() {
  return useContext(IdeasContainer);
}

export const initialIdeas = allIdeas;

export function IdeasProvider({ children }) {
  const [ideas, ideasDispatch] = useReducer(ideaDispatchFun, initialIdeas);
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
