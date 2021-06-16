import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ path, ...props }) {
  let isUserLoggedIn = false;
  if (localStorage?.getItem("user")) {
    isUserLoggedIn = JSON.parse(localStorage?.getItem("user"));
  }

  return isUserLoggedIn.isUserLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}

export default PrivateRoute;
