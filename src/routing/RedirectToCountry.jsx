import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCountryId } from "../utils/ipinfoCountry.js";

/**
 * Redirects the user to their country-specific route based on their IP address.
 */
export default function RedirectToCountry() {
  const [countryId, setCountryId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchCountry = async () => {
       const id = await getCountryId(signal);
       setCountryId(id);
    };

    fetchCountry();
    return () => controller.abort();
  }, []);

  if (countryId === null) return null;

  return <Navigate to={`/${countryId}`} replace />;
}
