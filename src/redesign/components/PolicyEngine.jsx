import Home from "./Home";
import Research from "./Research";
import About from "./About";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Contact from "./Contact";
import Donate from "./Donate";

export default function PolicyEngine({ pathname }) {
  const COUNTRIES = ["us", "uk", "ca", "ng", "il"];

  // First, check if the country is specified (.org/[country]/...)
  const path = pathname || window.location.pathname;
  const pathParts = path.split("/");
  let countryId = pathParts[1];

  if (!COUNTRIES.includes(countryId)) {
    // If the country is not specified, look up the country ID from the user's browser language
    const browserLanguage = navigator.language;
    countryId = {
      "en-US": "us",
      "en-GB": "uk",
      "en-CA": "ca",
      "en-NG": "ng",
      "en-IL": "il",
    }[browserLanguage];
  }

  // If the path is /, redirect to /[countryId]
  // If the path is /[countryId], render the homepage
  // If the path is /[countryId]/about, render the about page
  // If the path is /[countryId]/research, render the research page
  // If the path is not recognized, redirect to /[countryId]

  return (
    <Router>
      <Routes>
        {/* Redirect from / to /[countryId] */}
        <Route path="/" element={<Navigate to={`/${countryId}`} />} />

        <Route path="/:countryId" element={<Home />} />
        <Route path="/:countryId/about" element={<About />} />
        <Route path="/:countryId/research" element={<Research />} />
        <Route path="/:countryId/contact" element={<Contact />} />
        <Route path="/:countryId/donate" element={<Donate />} />

        {/* Redirect for unrecognized paths */}
        <Route path="*" element={<Navigate to={`/${countryId}`} />} />
      </Routes>
    </Router>
  );
}
