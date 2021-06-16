import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import useLogin from "../../context/login-context";
import firebase from "firebase";

import SideBar from "../sidebar/SideBar";

export default function Nav({ route, setRoute }) {
  const navigate = useNavigate();
  const { loggedIn, setloggedIn, userName } = useLogin();
  const [showSide, setshowSide] = useState(false);
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
  function logoutFun() {
    firebase.auth().signOut();
    setloggedIn(false);
    localStorage?.setItem(
      "user",
      JSON.stringify({ isUserLoggedIn: false, localUserName: "" })
    );

    navigate("/login");
  }

  return (
    <div className="navbar">
      {showSide && <SideBar />}
      <nav className="navigation">
        <div
          onClick={(e) => setshowSide(!showSide)}
          className="hamburger"
          id="hamburger"
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <h1 className="nav-heading">
          <Link className="nav-header-link" to="/">
            Hack Ideas
          </Link>
        </h1>
        <form class="search-user">
          <input
            class="search-user-input"
            type="search"
            placeholder="Search user"
            aria-label="Search"
          />
        </form>
        {loggedIn === true ? (
          <div className="logout-div">
            <h3 className="nav-userName">Hi {userName} !</h3>
            <button className="logout-btn" onClick={logoutFun}>
              Logout
            </button>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
