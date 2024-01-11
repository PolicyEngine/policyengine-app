import { useState, useEffect } from "react";

// Hook useCountryId that gets the countryId from the window pathname (e.g. /uk/research -> uk)
function useCountryId() {
  const [countryId, setCountryId] = useState(null);

  useEffect(() => {
    const extractCountryIdFromPathname = () => {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      if (pathSegments.length > 0 && pathSegments[0] !== "about") {
        setCountryId(pathSegments[0]);
        localStorage["countryId"] = pathSegments[0];
      } else {
        setCountryId(localStorage["countryId"]);
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
