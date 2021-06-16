import React from "react";

import firebase from "@firebase/app";

import "./sidebar.css";
import useLogin from "../../context/login-context";
import users from "../../data/users";
import { Link } from "react-router-dom";

function SideBar() {
  const { userName, userImage } = useLogin();
  const user = firebase.auth().currentUser;

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-heading">
          <img
            className="sidebar-userImage"
            alt="userImage"
            src={userImage}
          ></img>
          <span className="sidebar-userName">{userName}</span>
        </div>

        <div className="sidebar-myposts">
          <Link className="sidebar-my-posts-link" to="/usersposts">
            My Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
