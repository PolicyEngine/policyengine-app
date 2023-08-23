import Home from "./Home";

function About({ countryId }) {
  return <div data-testid="about-component">About page for {countryId}</div>;
}

function Research({ countryId }) {
  return <div>Research page for {countryId}</div>;
}


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
  if (path === "/") {
    window.location.replace("/" + countryId);
  } else if (pathParts.length === 2) {
    // If the path is /[countryId], render the homepage
    return <Home countryId={countryId} />;
  } else if (pathParts[2] === "about") {
    // If the path is /[countryId]/about, render the about page
    return <About countryId={countryId} />;
  } else if (pathParts[2] === "research") {
    // If the path is /[countryId]/research, render the research page
    return <Research countryId={countryId} />;
  } else {
    // If the path is not recognized, redirect to /[countryId]
    window.location.replace("/" + countryId);
  }
}