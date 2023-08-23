import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./redesign/style/App.css"
import PolicyEngine from "./redesign/components/PolicyEngine";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PolicyEngine />);

serviceWorkerRegistration.unregister();
