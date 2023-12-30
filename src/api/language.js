export function capitalize(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function cardinal(number) {
  // E.g. 1 -> 'first', 2 -> 'second', 3 -> 'third'
  const suffixes = ["th", "st", "nd", "rd"];
  const rem = number % 100;
  return number + (suffixes[(rem - 20) % 10] || suffixes[rem] || suffixes[0]);
}

/**
 *
 * @param
 * @returns the Unicode locale identifier for the country
 */
export function localeCode(countryId) {
  return countryId === "uk" ? "en-GB" : "en-US";
}

/**
 *
 * @param {string} countryId the country id, usually found in the metadata
 * @returns the ISO 4217 currency codes for the currency for the country
 */
export function currencyCode(countryId) {
  return countryId === "uk" ? "GBP" : "USD";
}

/**
 *
 * @param {number} number a number
 * @param {object} metadata the metadata object
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the formatted number
 */
export function formatNumber(number, metadata, options) {
  return number.toLocaleString(localeCode(metadata.countryId), options);
}

/**
 *
 * @param {number} number a number
 * @param {object} metadata the metadata object
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the formatted currency
 */
export function formatCurrency(number, metadata, options) {
  return number.toLocaleString(localeCode(metadata.countryId), {
    style: "currency",
    currency: currencyCode(metadata.countryId),
    ...options,
  });
}

/**
 *
 * @param {number} number a number
 * @param {object} metadata the metadata object
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the formatted number with % sign
 */
export function formatPercent(number, metadata, options) {
  return number.toLocaleString(localeCode(metadata.countryId), {
    style: "percent",
    ...options,
  });
}

/**
 *
 * @param {number} number a number
 * @param {object} metadata the metadata object
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the abbreviated number, e.g., 12.3bn, 301m, 1.2k
 */
export function formatNumberAbbr(number, metadata, options) {
  let suffix = "";
  const absNumber = Math.abs(number);
  if (absNumber >= 1e9) {
    number /= 1e9;
    suffix = "bn";
  } else if (absNumber >= 1e6) {
    number /= 1e6;
    suffix = "m";
  } else if (absNumber >= 1e3) {
    number /= 1e3;
    suffix = "k";
  }
  return formatNumber(number, metadata, options) + suffix;
}

/**
 *
 * @param {number} number a number
 * @param {object} metadata the metadata object
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the abbreviated currency, e.g., $12.3bn, $301m, $1.2k
 */
export function formatCurrencyAbbr(number, metadata, options) {
  return metadata.currency + formatNumberAbbr(number, metadata, options);
}
