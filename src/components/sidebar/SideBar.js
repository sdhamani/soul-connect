import React from "react";

import "./sidebar.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SideBar() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-heading">
          <img
            className="sidebar-userImage"
            alt="userImage"
            src={loggedInUser.userImage}
          ></img>
          <span className="sidebar-userName">{loggedInUser.userName}</span>
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
