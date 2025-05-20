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
