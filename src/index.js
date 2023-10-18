import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "./redesign/style/App.css";
import PolicyEngine from "./redesign/components/PolicyEngine";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <PolicyEngine />
  </Router>,
);

serviceWorkerRegistration.unregister();
