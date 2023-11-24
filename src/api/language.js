export function capitalize(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function aggregateNumber(number) {
  // e.g. 12.3bn, 301m, 1.2k
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
  return (
    Math.abs(number).toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }) + suffix
  );
}

export function aggregateCurrency(number, metadata) {
  const currency = metadata.currency;
  return currency + aggregateNumber(number);
}

export function percent(number) {
  return (
    (number * 100).toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }) + "%"
  );
}

export function cardinal(number) {
  // E.g. 1 -> 'first', 2 -> 'second', 3 -> 'third'
  const suffixes = ["th", "st", "nd", "rd"];
  const rem = number % 100;
  return number + (suffixes[(rem - 20) % 10] || suffixes[rem] || suffixes[0]);
}

// returns the Unicode locale identifier for the country id in the metadata
export function localeCode(countryId) {
  return countryId === "uk" ? "en-GB" : "en-US";
}

// returns the ISO 4217 currency codes for the currency for the country id in
// the metadata
export function currencyCode(countryId) {
  return countryId === "uk" ? "GBP" : "USD";
}
