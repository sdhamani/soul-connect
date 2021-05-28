import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginProvider } from "./context/login-context";
import { IdeasProvider } from "./context/ideas-context";

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <IdeasProvider>
        <Router>
          <App />
        </Router>
      </IdeasProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
