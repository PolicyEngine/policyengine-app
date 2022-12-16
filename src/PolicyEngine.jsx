import "./style/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PolicyEngineCountry from "./PolicyEngineCountry";
import ReactGA from "react-ga";

export default function PolicyEngine() {

  // Look up the country ID from the user's browser language
  const browserLanguage = navigator.language;
  const countryId = browserLanguage === "en-US" ? "us" : "uk";
  ReactGA.initialize("G-91M4529HE7");
  return (
    <Router>
      <Routes>
        <Route path="/uk/*" element={<PolicyEngineCountry countryId="uk" />} />
        <Route path="/us/*" element={<PolicyEngineCountry countryId="us" />} />
        <Route exact path="/" element={
          <Navigate to={`/${countryId}`} />
        } />
      </Routes>
    </Router>
  );
}
