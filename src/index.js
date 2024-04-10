import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "./redesign/style/App.css";
import PolicyEngine from "./redesign/components/PolicyEngine.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";
import { BrowserRouter as Router } from "react-router-dom";
import loc_en_gb from "./lang/plotly_locales/locale-en-gb.js";
import loc_en_us from "./lang/plotly_locales/locale-en-us.js";

var Plotly = require("plotly.js/dist/plotly.js");
Plotly.register(loc_en_gb);
Plotly.register(loc_en_us);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <PolicyEngine />
  </Router>,
);

serviceWorkerRegistration.unregister();
