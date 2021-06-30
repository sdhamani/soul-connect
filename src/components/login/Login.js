import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useEffect } from "react";
import "./login.css";
import { Nav } from "../navbar/Navbar";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/login-action";
import LoginUser from "../../api/login-api";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const userObj = {
          name: user.displayName.toUpperCase(),
          email: user.email,
          profileImage: user.providerData[0].photoURL,
          uid: user.uid,
        };

        const loggedInUser = await LoginUser(userObj);
        console.log({ loggedInUser });
        const finalUserObj = {
          loggedIn: !!user,
          userName: user.displayName.toUpperCase(),
          userImage: user.providerData[0].photoURL,
          userId: loggedInUser.userid,
          token: loggedInUser.token,
        };

        dispatch(updateUser(finalUserObj));

        localStorage?.setItem(
          "user",
          JSON.stringify({
            isUserLoggedIn: true,
            localUserName: user.displayName.toUpperCase(),
            userImage: user.providerData[0].photoURL,
            userId: loggedInUser.userid,
            token: loggedInUser.token,
          })
        );
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, [dispatch, navigate]);

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
      <div className="login-content">
        <h2 className="login-content-heading">Soul Connect</h2>
        <p className="login-content-text">
          An online platform to spread positivity using thoughts and ideas of
          what helps you stay positive.
        </p>
      </div>
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
