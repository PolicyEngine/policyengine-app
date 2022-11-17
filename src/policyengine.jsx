import "./style/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PolicyEngineCountry from "./PolicyEngineCountry";

export default function PolicyEngine() {
  return (
    <Router>
      <Routes>
        <Route path="/uk/*" element={<PolicyEngineCountry countryId="uk" />} />
        <Route path="/us/*" element={<PolicyEngineCountry countryId="us" />} />
        <Route exact path="/" element={<Navigate to="/uk" />} />
      </Routes>
    </Router>
  );
}
