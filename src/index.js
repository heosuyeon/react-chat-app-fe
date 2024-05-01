import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/css/normalize.css";
import App from "./App";

// 배포시 console 지우기
if (process.env.NODE_ENV === "production") {
  console = window.console || {};
  console.log = function no_console() {};
  console.warn = function no_console() {};
  console.error = function () {};
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
