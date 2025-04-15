import { aggregators } from "./simpleAggregators";

export function aggregateBaselineReformComparison(
  comparisons,
  baselineStrategy = "sum",
  reformStrategy = "sum",
) {
  return {
    baseline: aggregateValues(
      comparisons.map((c) => c?.baseline),
      baselineStrategy,
    ),
    reform: aggregateValues(
      comparisons.map((c) => c?.reform),
      reformStrategy,
    ),
  };
}

export function aggregateWinnersLosersBreakdownSimple(
  breakdowns,
  strategy = "sum",
) {
  const categories = [
    "Gain less than 5%",
    "Gain more than 5%",
    "Lose less than 5%",
    "Lose more than 5%",
    "No change",
  ];

  const result = {};

  categories.forEach((category) => {
    result[category] = aggregateValues(
      breakdowns.map((b) => b?.[category]),
      strategy,
    );
  });

  return result;
}

export function aggregateWinnersLosersBreakdownDeciles(
  breakdowns,
  strategy = "sum",
) {
  const categories = [
    "Gain less than 5%",
    "Gain more than 5%",
    "Lose less than 5%",
    "Lose more than 5%",
    "No change",
  ];

  const result = {};

  categories.forEach((category) => {
    // Initialize with an empty array if no valid data is found
    if (!breakdowns.some((b) => Array.isArray(b?.[category]))) {
      result[category] = [];
      return;
    }

    // Get the first non-null array to determine length
    const firstValidArray = breakdowns.find((b) =>
      Array.isArray(b?.[category]),
    )?.[category];
    if (!firstValidArray) {
      result[category] = [];
      return;
    }

    // Create an array of the same length with aggregated values at each position
    result[category] = Array(firstValidArray.length)
      .fill(0)
      .map((_, index) => {
        const valuesAtIndex = breakdowns
          .filter(
            (b) => Array.isArray(b?.[category]) && b[category].length > index,
          )
          .map((b) => b[category][index]);

        return aggregateValues(valuesAtIndex, strategy);
      });
  });

  return result;
}

export function aggregatePovertyByAgeBreakdown(ageBreakdowns) {
  return {
    adult: aggregateBaselineReformComparison(
      ageBreakdowns.map((b) => b?.adult),
      "mean",
      "mean",
    ),
    all: aggregateBaselineReformComparison(
      ageBreakdowns.map((b) => b?.all),
      "mean",
      "mean",
    ),
    child: aggregateBaselineReformComparison(
      ageBreakdowns.map((b) => b?.child),
      "mean",
      "mean",
    ),
    senior: aggregateBaselineReformComparison(
      ageBreakdowns.map((b) => b?.senior),
      "mean",
      "mean",
    ),
  };
}

/**
 * Aggregates numeric values using either sum or average based on specified strategy
 * @param {Array<number>} values - Array of numbers to aggregate
 * @param {'sum' | 'mean'} strategy - Aggregation strategy, either 'sum' or 'mean';
 * add a custom strategy by modifying the aggregators object in aggregationFunctions.js
 * and updating JSDoc literal comment
 * @returns {number} The aggregated value
 */
export function aggregateValues(values, strategy = "sum") {
  if (!Object.keys(aggregators).includes(strategy)) {
    throw new Error(`Invalid aggregation strategy: ${strategy}`);
  }

  const validValues = values.filter((val) => val !== undefined && val !== null);

  if (validValues.length === 0) {
    console.error("Error aggregating values within array:", values);
    return null;
  }

  return aggregators[strategy](validValues);
}
