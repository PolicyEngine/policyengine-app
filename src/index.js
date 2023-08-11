import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import PolicyEngine from "./redesign/PolicyEngine";
// import AboutUs from './redesign/components/content/about_us/AboutUs.jsx';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PolicyEngine />);

serviceWorkerRegistration.unregister();
