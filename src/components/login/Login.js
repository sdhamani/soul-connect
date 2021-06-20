import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useEffect } from "react";
import "./login.css";
import Nav from "../navbar/Navbar";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/login-action";

function Login() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log({ user });
      if (user) {
        const userObj = {
          loggedIn: !!user,
          userName: user.displayName.toUpperCase(),
          userImage: user.providerData[0].photoURL,
          userId: user.uid,
        };
        dispatch(updateUser(userObj));

        localStorage?.setItem(
          "user",
          JSON.stringify({
            isUserLoggedIn: true,
            localUserName: user.displayName.toUpperCase(),
            userImage: user.providerData[0].photoURL,
            userId: user.uid,
          })
        );
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, [loggedInUser]);

  var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
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

  return (
    <div>
      {" "}
      <Nav />
      <div className="login-div">
        <div className="login-center-div">
          <div className="login-card">
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
