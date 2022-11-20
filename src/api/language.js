export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function aggregateNumber(number) {
  // e.g. 12.3bn, 301m, 1.2k
  let suffix = '';
  const absNumber = Math.abs(number);
  if (absNumber >= 1e9) {
    number /= 1e9;
    suffix = 'bn';
  } else if (absNumber >= 1e6) {
    number /= 1e6;
    suffix = 'm';
  } else if (absNumber >= 1e3) {
    number /= 1e3;
    suffix = 'k';
  }
  return Math.abs(number).toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + suffix;
}

export function aggregateCurrency(number, metadata) {
  console.log(metadata)
  const currency = metadata.currency;
  return currency + aggregateNumber(number);
}