import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

import firebase from "firebase";

import SideBar from "../sidebar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/login-action";
import { GetUsers } from "../../api/login-api";
import { updateUsers } from "../../actions/users-actions";

export default function Nav() {
  const allUsers = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();

  const [showSide, setshowSide] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const searchUsers = (event) => {
    const userInput = event.target.value;
    if (userInput !== "") {
      const otherUsers = allUsers.filter(
        (user) => user.id !== loggedInUser.userId
      );
      console.log({ otherUsers });
      const filteredUsers = otherUsers.filter((user) => {
        return user.name.toLowerCase().startsWith(userInput.toLowerCase());
      });
      setSuggestedUsers(filteredUsers);
    } else {
      setSuggestedUsers([]);
    }
  };

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
  function logoutFun() {
    firebase.auth().signOut();
    dispatch(logoutUser());

    localStorage?.removeItem("user");

    navigate("/login");
  }

  useEffect(() => {
    const getUsers = async () => {
      const users = await GetUsers();

      localStorage?.setItem(
        "allUsers",
        JSON.stringify({
          users,
        })
      );

      dispatch(updateUsers(users));
    };
    getUsers();
  }, []);
  console.log("Nav rendering");
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
            Soul Connect
          </Link>
        </h1>
        {loggedInUser.loggedIn === true ? (
          <form className="search-user">
            <input
              onChange={(e) => searchUsers(e)}
              className="search-user-input"
              type="search"
              placeholder="Search user"
              aria-label="Search"
            />
            <div className="suggesterd-users">
              <ul className="suggesterd-users-list">
                {suggestedUsers.map((user) => (
                  <Link
                    key={user.id}
                    className="search-user-link"
                    to={`/userprofile/${user._id}`}
                  >
                    <li className="suggesterd-user">{user.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </form>
        ) : null}
        {loggedInUser.loggedIn === true ? (
          <div className="logout-div">
            <h3 className="nav-userName">Hi {loggedInUser.userName} !</h3>
            <button className="logout-btn" onClick={logoutFun}>
              Logout
            </button>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
