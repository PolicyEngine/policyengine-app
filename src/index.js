import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
// import PolicyEngine from "./redesign/PolicyEngine";
import TitleAndDescription from "redesign/components/content/TitleAndDescription.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TitleAndDescription title={'Test Title'} description={'Explore Brookings’ research and commentary to deepen your understanding of local, national, and global challenges. Our experts offer evidence-based analysis and innovative policy solutions that inform decision-making and drive positive change.'}/>);

serviceWorkerRegistration.unregister();
