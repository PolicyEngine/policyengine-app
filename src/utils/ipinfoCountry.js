/**
 * @file utils/ipinfoCountry.js
 *
 * Determines the PolicyEngine country segment ("uk", "us", …) for the user
 * via:
 *
 * IP geolocation or Browser language and defaults to "us"
 *
 * @typedef {"uk" | "us" | "ca" | "ng" | "il"} CountryId
 */

/**
 * Maps ISO codes to country-id.
 */
const ISO2_TO_SEGMENT = {
  gb: "uk",
  im: "uk", // Isle of Man
  je: "uk", // Jersey
  gg: "uk", // Guernsey
  us: "us",
  ca: "ca",
  ng: "ng",
  il: "il",
};

/**
 * Maps navigator.language strings to country-id.
 */
const LANGUAGE_TO_SEGMENT = {
  "en-GB": "uk",
  "en-US": "us",
  "en-CA": "ca",
  "en-NG": "ng",
  "en-IL": "il",
};

/**
 * Attempt to get a 'CountryId' from the client's public IP via ipinfo.io.
 *
 * @param {AbortSignal} [signal]
 * @returns {Promise<CountryId | null>}
 */
export async function resolveCountryFromIp(signal) {
  const token = process.env.REACT_APP_IPINFO_TOKEN;
  if (!token) {
    console.warn("Missing ipinfo token – skipping IP lookup");
    return null;
  }

  const endpoint = `https://api.ipinfo.io/lite/me?token=${token}`;
  const resp = await fetch(endpoint, { signal });
  if (!resp.ok) throw new Error(`ipinfo returned ${resp.status}`);

  const { country_code: iso2 = "" } = await resp.json();
  return ISO2_TO_SEGMENT[iso2.toLowerCase()] ?? null;
}

/**
 * Get country-id from browser language.
 *
 * @returns {CountryId | null}
 */
export function resolveCountryFromLanguage() {
  return LANGUAGE_TO_SEGMENT[navigator.language] ?? null;
}

/**
 * Get country id by IP or browser language and default to "us".
 *
 * @param {AbortSignal} [signal]
 * @returns {Promise<CountryId>}
 */
export async function getCountryId(signal) {
  try {
    const countryCode_Ip = await resolveCountryFromIp(signal);
    if (countryCode_Ip) return countryCode_Ip;
  } catch (err) {
    if (signal?.aborted) throw err;
    console.error("IP‑based country lookup failed:", err);
  }

  // Using browser language
  const browserLang = resolveCountryFromLanguage();
  if (browserLang) return browserLang;

  //default
  return "us";
}
