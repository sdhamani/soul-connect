import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import firebase from "firebase";
const LoginContainer = createContext();

export default function useLogin() {
  return useContext(LoginContainer);
}

export function LoginProvider({ children }) {
  const [loggedIn, setloggedIn] = useState(false);
  const [userName, setuserName] = useState("");
  const [userImage, setuserImage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyArlrzqz4RbnazxWwOk6AGKoebkjU1TyqA",
      authDomain: "social-media-b028f.firebaseapp.com",
      projectId: "social-media-b028f",
      storageBucket: "social-media-b028f.appspot.com",
      messagingSenderId: "551745934551",
      appId: "1:551745934551:web:e603b9d485a94b5f000c92",
      measurementId: "G-SNMB1BE0P6",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    console.log("auth", firebase.auth());

    if (localStorage.getItem("user")) {
      const { isUserLoggedIn, localUserName, userImage, userId } = JSON.parse(
        localStorage?.getItem("user")
      );
      console.log("lc", { isUserLoggedIn, localUserName, userImage, userId });
      isUserLoggedIn && setloggedIn(true);
      setUserId(userId);
      setuserName(localUserName);

      setuserImage(userImage);
    }
  }, []);

  return (
    <LoginContainer.Provider
      value={{
        loggedIn: loggedIn,
        setloggedIn: setloggedIn,
        userName: userName,
        setuserName: setuserName,
        userImage: userImage,
        setuserImage: setuserImage,
        userId: userId,
        setUserId: setUserId,
      }}
    >
      {children}
    </LoginContainer.Provider>
  );
}
