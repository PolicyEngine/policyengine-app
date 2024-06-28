import { Navigate } from "react-router-dom";

export default function RedirectToCountry() {
  // Find country ID
  const countryId = findCountryId();

  return <Navigate to={`/${countryId}`} replace />;
}

/**
 * Based on the URL and user's browser, determine country ID;
 * if not possible, return "us" as country ID
 * @returns {String}
 */
export function findCountryId() {
  const COUNTRY_CODES = {
    "en-US": "us",
    "en-GB": "uk",
    "en-CA": "ca",
    "en-NG": "ng",
    "en-IL": "il",
  };

  const browserLanguage = navigator.language;

  if (COUNTRY_CODES.includes(browserLanguage)) {
    return COUNTRY_CODES[browserLanguage];
  } else {
    return "us";
  }
}
