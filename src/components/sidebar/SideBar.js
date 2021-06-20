import React from "react";

import "./sidebar.css";
import useLogin from "../../context/login-context";

import { Link } from "react-router-dom";

function SideBar() {
  const { userName, userImage } = useLogin();

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
