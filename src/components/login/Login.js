import React from "react";

import { useState, useEffect } from "react";
import "./login.css";
import Nav from "../navbar/Navbar";
import useLogin from "../../context/login-context";
import { useNavigate } from "react-router";
import checkCredentails from "./checkCredentials";

function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");
  const [employeeIdError, setemployeeIdError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { setloggedIn, setuserName, setemployeeId } = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    setCredentialsError("");
    if (employeeId.length === 0) {
      setemployeeIdError("This field is required");
    } else if (!employeeId.startsWith("SB")) {
      setemployeeIdError("Not a valid employeeId");
    } else {
      setemployeeIdError("");
    }
  }, [employeeId]);

  useEffect(() => {
    setCredentialsError("");

    if (password.length === 0) {
      setPasswordError("This field is required");
    } else if (passwordError === "Incorrect Password") {
      setPasswordError("Incorrect Password");
    } else {
      setPasswordError("");
    }
    if (
      (employeeIdError === "" && passwordError === "") ||
      passwordError === "Incorrect Password"
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [password, employeeIdError, passwordError]);

  const signInUser = () => {
    let response = checkCredentails(employeeId, password);

    if (response.success) {
      setloggedIn(true);
      setuserName(response.user.name);

      setemployeeId(response.user.employeeId);
      localStorage?.setItem(
        "login",
        JSON.stringify({
          isUserLoggedIn: true,
        })
      );
      localStorage?.setItem(
        "localUserName",
        JSON.stringify({
          localUserName: response.user.name,
        })
      );
      localStorage?.setItem(
        "employeeId",
        JSON.stringify({
          employeeId: response.user.employeeId,
        })
      );
      navigate("/");
    } else {
      if (response.message === "Invalid User") {
        setCredentialsError(response.message);
      } else {
        setPasswordError(response.message);
      }
    }
    if (employeeIdError === "" && passwordError === "") {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  return (
    <div>
      {" "}
      <Nav />
      <div className="login-div">
        <div className="login-center-div">
          <div className="login-card">
            <h1 className="login-account">Login Account</h1>

            <div className="login-input-div">
              <input
                placeholder="Enter an employee Id"
                className="login-input"
                onChange={(e) => setEmployeeId(e.target.value)}
                type="input"
              ></input>
            </div>
            {employeeIdError !== "" ? (
              <p className="input-check">*{employeeIdError}</p>
            ) : null}
            <div className="login-input-div">
              <input
                id="login-password"
                placeholder="Enter Password"
                className="login-input"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              ></input>
            </div>

            {passwordError !== "" ? (
              <p className="input-check">*{passwordError}</p>
            ) : null}

            {credentialsError !== "" ? (
              <p className="input-check">*{credentialsError}</p>
            ) : null}

            <input
              type="submit"
              // value={showLoading ? "SIGNING IN" : "SIGN IN"}
              value={"SIGN IN"}
              className={
                isSubmitDisabled
                  ? "disabled-btn signin"
                  : "btn primary-button signin"
              }
              onClick={(e) => signInUser()}
              disabled={isSubmitDisabled}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
