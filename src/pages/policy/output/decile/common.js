import { formatCurrency, formatPercent } from "lang/format";
import { regionName } from "../ImpactChart";

/**
 *
 * @param {string} policyLabel  the policy label
 * @param {number} change the change in net income
 * @param {bool} isCurrency true iff change has unit currency
 * @param {object} metadata the metadata object
 * @returns
 */
export function title(policyLabel, change, isCurrency, metadata) {
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const term1 = `the net income of households${regionPhrase}`;
  const term2 = isCurrency
    ? formatCurrency(Math.abs(change), metadata.countryId, {
        maximumFractionDigits: 0,
      })
    : formatPercent(Math.abs(change), metadata.countryId, {
        maximumFractionDigits: 1,
      });
  const signTerm = change > 0 ? "increase" : "decrease";
  const msg =
    change === 0
      ? `${policyLabel} would have no effect on ${term1} on average`
      : `${policyLabel} would ${signTerm} ${term1} by ${term2} on average`;
  return msg;
}

/**
 *
 * @param {string} countryId the country id, usually found in the metadata
 * @param {bool} isWealth true if wealth, false if income
 * @returns
 */
export function description(countryId, isWealth) {
  return (
    <p>
      Households are sorted into ten equally-populated groups according to their
      baseline {countryId === "uk" ? "equivalised" : "equivalized"} household
      net {isWealth ? "wealth" : "income"}.
    </p>
  );
}
