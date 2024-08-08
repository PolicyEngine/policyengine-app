import { useState, useEffect } from "react";

// Hook useCountryId that gets the countryId from the window pathname (e.g. /uk/research -> uk)
function useCountryId() {
  const [countryId, setCountryId] = useState(null);

  useEffect(() => {
    const extractCountryIdFromPathname = () => {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      if (pathSegments.length > 0) {
        setCountryId(pathSegments[0]);
      }
    };

    // Initially extract countryId when the component mounts
    extractCountryIdFromPathname();

    // Listen to changes in the pathname to update countryId
    window.addEventListener("popstate", extractCountryIdFromPathname);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", extractCountryIdFromPathname);
    };
  }, []);

  return countryId;
}

export default useCountryId;
