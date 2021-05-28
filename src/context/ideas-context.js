import { createContext, useContext } from "react";
import { useState } from "react";
import allIdeas from "../data/ideas";

const IdeasContainer = createContext();

export default function useIdeas() {
  return useContext(IdeasContainer);
}

export function IdeasProvider({ children }) {
  const initialIdeas = allIdeas;
  const [ideas, setIdeas] = useState(initialIdeas);

  return (
    <IdeasContainer.Provider
      value={{
        ideas: ideas,
        setIdeas: setIdeas,
      }}
    >
      {children}
    </IdeasContainer.Provider>
  );
}
