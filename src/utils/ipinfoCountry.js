/**
 * Returns a PolicyEngine country-id ("uk", "us", …) chosen in this order:
 *   1. ipinfo.io Lite endpoint
 *   2. fallback to navigator.language mapping
 *   3. final default "us"
 */
export async function getCountryId() {
  // IP lookup
  try {
    const token = process.env.REACT_APP_IPINFO_TOKEN;
    const resp = await fetch(`https://api.ipinfo.io/lite/me?token=${token}`);
    //const resp    = await fetch(`https://ipinfo.io/json?token=${token}`); //in case we ignore ipinfo token
    if (resp.ok) {
      //const { country: iso2 = "" } = await resp.json(); //in case we ignore ipinfo token
      const { country_code: iso2 = "" } = await resp.json();
      const ISO2 = iso2.toUpperCase();

      // Return the country-id based on the ISO2 code
      if (["GB", "IM", "JE", "GG"].includes(ISO2)) return "uk";
      if (ISO2 === "US") return "us";
      if (ISO2 === "CA") return "ca";
      if (ISO2 === "NG") return "ng";
      if (ISO2 === "IL") return "il";
    }
  } catch (err) {
    console.error("ipinfo lookup failed:", err);
  }

  // language fallback
  const LANGUAGE_MAP = {
    "en-GB": "uk",
    "en-US": "us",
    "en-CA": "ca",
    "en-NG": "ng",
    "en-IL": "il",
  };
  const lang = navigator.language;
  if (LANGUAGE_MAP[lang]) return LANGUAGE_MAP[lang];

  // default
  return "us";
}
