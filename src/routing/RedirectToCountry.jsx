import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCountryId } from "../utils/ipinfoCountry.js";

/**
 * Redirects the user to their country-specific route based on their IP address.
 */
export default function RedirectToCountry() {
  const [countryId, setCountryId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getCountryId().then((id) => {
      if (!cancelled) setCountryId(id);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (countryId === null) return null;

  return <Navigate to={`/${countryId}`} replace />;
}
