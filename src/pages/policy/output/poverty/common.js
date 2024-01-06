import { formatNumber, formatPercent } from "lang/format";
import { regionName } from "../ImpactChart";

/**
 *
 * @param {string} policyLabel the policy label
 * @param {bool} isDeep true if deep poverty, false otherwise
 * @param {number} baseline the baseline poverty rate
 * @param {number} reform the baseline poverty rate
 * @param {object} metadata the metadata object
 * @returns
 */
export function title(policyLabel, isDeep, baseline, reform, metadata) {
  const relativeChange = reform / baseline - 1;
  const absoluteChange = Math.round(Math.abs(reform - baseline) * 1000) / 10;
  const objectTerm = isDeep ? "the deep poverty rate" : "the poverty rate";
  const relTerm = formatPercent(Math.abs(relativeChange), metadata.countryId, {
    maximumFractionDigits: 1,
  });
  const absTerm = formatNumber(absoluteChange, metadata.countryId, {
    maximumFractionDigits: 2,
  });
  const term2 = `${relTerm} (${absTerm}pp)`;
  const signTerm = relativeChange > 0 ? "increase" : "decrease";
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const msg =
    absTerm === 0
      ? `${policyLabel} would have no effect on ${objectTerm}${regionPhrase}`
      : `${policyLabel} would ${signTerm} ${objectTerm}${regionPhrase} by ${term2}`;
  return msg;
}

/**
 *
 * @param {string} countryId the country id, usually found in the metadata
 * @param {bool} isDeep true if deep poverty, false otherwise
 * @returns
 */
export function description(countryId, isDeep) {
  const more = isDeep
    ? "Deep poverty rate is the population share with income below half the poverty line."
    : "Poverty rate is the population share with income below the poverty line.";
  if (countryId === "uk") {
    return (
      <p>
        PolicyEngine reports the impact to absolute poverty before housing
        costs. {more}
      </p>
    );
  }
  return (
    <p>
      PolicyEngine reports the impact to the{" "}
      <a href="https://www.census.gov/topics/income-poverty/supplemental-poverty-measure.html">
        Supplemental Poverty Measure
      </a>
      . {more}
    </p>
  );
}
