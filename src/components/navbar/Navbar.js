import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import useLogin from "../../context/login-context";

import SideBar from "../sidebar/SideBar";

export default function Nav({ route, setRoute }) {
  const navigate = useNavigate();
  const { loggedIn, setloggedIn, userName } = useLogin();
  const [showSide, setshowSide] = useState(false);

  function logoutFun() {
    setloggedIn(false);

    localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: false }));
    localStorage?.setItem(
      "localUserName",
      JSON.stringify({ localUserName: "" })
    );
    localStorage?.setItem("employeeId", JSON.stringify({ employeeId: "" }));

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
