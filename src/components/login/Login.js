import React from "react";
import users from "../../data/users";
import { useState, useEffect } from "react";
import "./login.css";
import Nav from "../navbar/Navbar";
import useLogin from "../../context/login-context";
import { useNavigate } from "react-router";

function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");
  const [employeeIdError, setemployeeIdError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { setloggedIn, setuserName } = useLogin();

  const navigate = useNavigate();

  const checkCredentails = (employeeId, password) => {
    let user = users.find((user) => user.employeeId === employeeId);
    if (!user) {
      setCredentialsError("Invalid User");
      return false;
    } else if (user.password === password) {
      setloggedIn(true);
      setuserName(user.name);
      return { success: true, user: user };
    } else {
      setPasswordError("Incorrect Password");
      return false;
    }
  };

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
    setPasswordError("");
    if (password.length === 0) {
      setPasswordError("This field is required");
    }
    if (employeeIdError === "" && passwordError === "") {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [password, employeeIdError, passwordError]);

  const signInUser = async () => {
    const response = await checkCredentails(employeeId, password);

    if (response.success) {
      localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true }));
      localStorage?.setItem(
        "localUserName",
        JSON.stringify({ localUserName: response.user.name })
      );
      navigate("/");
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
