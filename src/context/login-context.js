import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const LoginContainer = createContext();

export default function useLogin() {
  return useContext(LoginContainer);
}

export function LoginProvider({ children }) {
  const [loggedIn, setloggedIn] = useState(false);

  const [userName, setuserName] = useState("");
  const [employeeId, setemployeeId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("login")) {
      const { isUserLoggedIn } = JSON.parse(localStorage?.getItem("login"));
      isUserLoggedIn && setloggedIn(true);
    }
    if (localStorage?.getItem("localUserName")) {
      const { localUserName } = JSON.parse(
        localStorage?.getItem("localUserName")
      );

      setuserName(localUserName);
    }

    if (localStorage?.getItem("employeeId")) {
      const { employeeId } = JSON.parse(localStorage?.getItem("employeeId"));

      setemployeeId(employeeId);
    }
  }, []);

  return (
    <LoginContainer.Provider
      value={{
        loggedIn: loggedIn,
        setloggedIn: setloggedIn,
        userName: userName,
        setuserName: setuserName,
        employeeId: employeeId,
        setemployeeId: setemployeeId,
      }}
    >
      {children}
    </LoginContainer.Provider>
  );
}
