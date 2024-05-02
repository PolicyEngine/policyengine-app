/**
 *
 * @param {string} string a string
 * @returns the capitalized string
 */
export function capitalize(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param {number} number a number
 * @returns 1st if number = 1, 2nd if number = 2, ...
 */
export function ordinal(number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const rem = number % 100;
  return number + (suffixes[(rem - 20) % 10] || suffixes[rem] || suffixes[0]);
}

/**
 *
 * @param {string} countryId the country id, usually found in the metadata
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
 * @param {string} countryId the country id, usually found in the metadata
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the formatted number
 */
export function formatNumber(number, countryId, options) {
  return number.toLocaleString(localeCode(countryId), options);
}

/**
 *
 * @param {number} number a number
 * @param {string} countryId the country id, usually found in the metadata
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the formatted currency
 */
export function formatCurrency(number, countryId, options) {
  return number.toLocaleString(localeCode(countryId), {
    style: "currency",
    currency: currencyCode(countryId),
    ...options,
  });
}

/**
 *
 * @param {number} number a number
 * @param {string} countryId the country id, usually found in the metadata
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the formatted number with % sign
 */
export function formatPercent(number, countryId, options) {
  return number.toLocaleString(localeCode(countryId), {
    style: "percent",
    ...options,
  });
}

export function formatFullDate(date, countryId, options) {
  return new Intl.DateTimeFormat(localeCode(countryId), {
    dateStyle: "long",
    ...options,
  }).format(new Date(date));
}

/**
 *
 * @param {number} number a number
 * @param {string} countryId the country id, usually found in the metadata
 * @param {object?} options an object adjusting the output format. Corresponds
 * to the options parameter of Number.prototype.toLocaleString().
 * @returns the abbreviated currency, e.g., $2.3tn, -$12.3bn, $301m, $1.2k
 */
export function formatCurrencyAbbr(number, countryId, options) {
  let suffix = "";
  const absNumber = Math.abs(number);
  if (absNumber >= 1e12) {
    number /= 1e12;
    suffix = "tn";
  } else if (absNumber >= 1e9) {
    number /= 1e9;
    suffix = "bn";
  } else if (absNumber >= 1e6) {
    number /= 1e6;
    suffix = "m";
  } else if (absNumber >= 1e3) {
    number /= 1e3;
    suffix = "k";
  }
  return formatCurrency(number, countryId, options) + suffix;
}

/**
 *
 * @param {Array} values an array of numbers
 * @param {number} multiplier a multiplier applied to all numbers
 * @returns a good display precision for the array
 */
export function precision(values, multiplier) {
  let minValue = Number.POSITIVE_INFINITY;
  let maxValue = Number.NEGATIVE_INFINITY;
  values.forEach((v) => {
    if (v < minValue) {
      minValue = v;
    }
    if (v > maxValue) {
      maxValue = v;
    }
  });
  const intervalLength = values ? (maxValue - minValue) * multiplier : 0;
  return intervalLength > 10 || intervalLength <= 0
    ? 0
    : 1 - Math.round(Math.log10(intervalLength));
}
