import React from "react";
import { useState } from "react";
function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");

  const checkCredentails = (employeeId, password) => {};

  const signInUser = () => {
    const response = checkCredentails(employeeId, password);
    if (response.success === true) {
      localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true }));
    } else {
      setCredentialsError(response);
    }
  };

  return (
    <div className="login-div">
      <div className="login-center-div">
        <div className="login-card">
          <h1 className="login-account">Login Account</h1>

          <div className="login-input-div">
            <input
              placeholder="Enter an email Id"
              className="login-input"
              onChange={(e) => setEmployeeId(e.target.value)}
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            ></input>
          </div>
          {emailError !== "" ? (
            <p className="input-check">*{emailError}</p>
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
            value={showLoading ? "SIGNING IN" : "SIGN IN"}
            className={
              isSubmitDisabled
                ? "disabled-btn signin"
                : "btn primary-button signin"
            }
            onClick={(e) => signInUser()}
            disabled={isSubmitDisabled}
          ></input>

          <button className="login-actions">
            <Link className="login-actions-link" to="/signup">
              Don't have an account? Create an account
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
