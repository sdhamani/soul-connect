import { useNavigate } from "react-router-dom";
import "./navbar.css";

import { Link } from "react-router-dom";
import useLogin from "../../context/login-context";

export default function Nav({ route, setRoute }) {
  const navigate = useNavigate();
  const { loggedIn, setloggedIn, userName } = useLogin();

  function logoutFun() {
    setloggedIn(false);

    localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: false }));
    localStorage?.setItem(
      "localUserName",
      JSON.stringify({ localUserName: "" })
    );

    navigate("/login");
  }

  return (
    <div>
      <nav className="navigation">
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
