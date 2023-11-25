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

export function currencyString(number, metadata, maximumFractionDigits) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: metadata.countryId === "uk" ? "GBP" : "USD",
    maximumFractionDigits: maximumFractionDigits,
  });
}

export function localeString(metadata) {
  return metadata.countryId === "uk" ? "en" : "en-US";
}
