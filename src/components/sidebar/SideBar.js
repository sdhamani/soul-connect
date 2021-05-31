import React from "react";

import "./sidebar.css";
import useLogin from "../../context/login-context";
import users from "../../data/users";
import { Link } from "react-router-dom";

function SideBar() {
  const { userName, employeeId } = useLogin();

  const user = users.find((user) => user.employeeId === employeeId);
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-heading">
          <img
            className="sidebar-userImage"
            alt="userImage"
            src={user?.profileImage}
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
