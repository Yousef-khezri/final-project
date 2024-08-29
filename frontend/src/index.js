import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
    {/* for bootstrap */}
    <script
      src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
      crossorigin
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
      crossorigin
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossorigin
    ></script>

    <script>var Alert = ReactBootstrap.Alert;</script>
  </Router>
);
