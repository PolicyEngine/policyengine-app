import { SequentialResult } from "./makeSequentialRequests";
import { SocietyWideImpact } from "./societyWideImpact";
import { aggregators } from "./aggregationFunctions";

/**
 * Aggregate a series of SocietyWideImpact items and return the aggregated result
 * @param {Array<SocietyWideImpact>} impacts An array of policy impact objects
 * @returns {SocietyWideImpact} An object with the following properties:
 */
export async function aggregateSocietyWideImpacts(impacts) {
  try {
    for (const impact of impacts) {
      // Validate the impact object
      await SocietyWideImpact.validate(impact);
    }
  } catch (error) {
    console.error("Error validating impacts:", error);
    throw error;
  }

  const unvalidatedReturn = {
    budget: aggregateBudgetData(impacts.map((impact) => impact.budget)),
    /*
    constituency_impact: null, // Placeholder for constituency impact aggregation
    decile: aggregateDecileData(impacts.map(impact => impact.decile)),
    detailed_budget: null, // Placeholder for detailed budget aggregation
    inequality: aggregateInequalityData(impacts.map(impact => impact.inequality)),
    intra_decile: aggregateIntraDecileData(impacts.map(impact => impact.intra_decile)),
    intra_wealth_decile: null, // Placeholder for intra wealth decile aggregation
    labor_supply_response: aggregateLaborSupplyResponseData(impacts.map(impact => impact.labor_supply_response)),
    poverty: aggregatePovertyData(impacts.map(impact => impact.poverty)),
    poverty_by_gender: aggregatePovertyByGenderData(impacts.map(impact => impact.poverty_by_gender)),
    poverty_by_race: aggregatePovertyByRaceData(impacts.map(impact => impact.poverty_by_race)),
    wealth_decile: null, // Placeholder for wealth decile aggregation
    */
  };

  return SocietyWideImpact.cast(unvalidatedReturn);
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
  const validValues = values.filter((val) => val !== undefined && val !== null);

  if (validValues.length === 0) {
    console.error("Error aggregating values within array:", values);
    return null;
  }

  return aggregators[strategy](validValues);
}

export function aggregateBudgetData(budgets) {
  return {
    baseline_net_income: aggregateValues(
      budgets.map((b) => b?.baseline_net_income),
    ),
    benefit_spending_impact: aggregateValues(
      budgets.map((b) => b?.benefit_spending_impact),
    ),
    budgetary_impact: aggregateValues(budgets.map((b) => b?.budgetary_impact)),
    households: aggregateValues(budgets.map((b) => b?.households)),
    state_tax_revenue_impact: aggregateValues(
      budgets.map((b) => b?.state_tax_revenue_impact),
    ),
    tax_revenue_impact: aggregateValues(
      budgets.map((b) => b?.tax_revenue_impact),
    ),
  };
}

/**
 * Taking an array of SequentialResult items assumed to be
 * successful society-wide impact calculations, validate that
 * 1. each item is a succesful response and 2. that each response
 * is a valid SocietyWideImpact object, then return all in an array
 * @param {Array<SequentialResult>} sequentialResults An array of SequentialResult objects
 * @returns {Array<SocietyWideImpact>} An array of SocietyWideImpact objects
 * @throws {Error} If any of the SequentialResult objects are error responses or
 * if any of the responses are not valid SocietyWideImpact objects
 */
export async function parseSocietyWideResultsFromSequentialRequests(
  sequentialResults,
) {
  let impacts = [];

  try {
    for (let i = 0; i < sequentialResults.length; i++) {
      const result = sequentialResults[i];

      if (result.status !== "success") {
        throw new Error(`SequentialResult ${i} is not a success`);
      }

      const response = result.response;

      const responseJson = await response.json();
      const resultData = responseJson.result;

      // Validate the response
      const validImpact = SocietyWideImpact.cast(resultData);

      // Push the valid impact to the array
      impacts.push(validImpact);
    }
  } catch (error) {
    console.error("Error parsing sequential results:", error);
    throw error;
  }
  return impacts;
}
