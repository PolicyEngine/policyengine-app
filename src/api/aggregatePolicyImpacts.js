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
      console.log("Impact inside validator:", impact);
      await SocietyWideImpact.validate(impact, {abortEarly: false});
      console.log("Impact validated:", impact);
    }
  } catch (err) {
    console.error("Error validating impacts:", err);
    throw err;
  }

  const unvalidatedReturn = {
    budget: aggregateBudgetData(impacts.map((impact) => impact.budget)),
    // constituency_impact: null, // Placeholder for constituency impact aggregation
    decile: aggregateDecileData(impacts.map(impact => impact.decile)),
    // detailed_budget: null, // Placeholder for detailed budget aggregation
    inequality: aggregateInequalityData(impacts.map(impact => impact.inequality)),
    /*
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


function aggregateDecileData(deciles) {
  return {
    average: {
      ...aggregateDecileComparison(deciles.map(d => d?.average)),
    },
    relative: {
      ...aggregateDecileComparison(deciles.map(d => d?.relative), "mean"),
    },
  };
}

function aggregateInequalityData(inequalityData) {
  // Average approach for inequality metrics
  return {
    gini: aggregateBaselineReformComparison(inequalityData.map(i => i?.gini), 'mean', 'mean'),
    top_10_pct_share: aggregateBaselineReformComparison(inequalityData.map(i => i?.top_10_pct_share), 'mean', 'mean'),
    top_1_pct_share: aggregateBaselineReformComparison(inequalityData.map(i => i?.top_1_pct_share), 'mean', 'mean'),
  };
}

function aggregateBaselineReformComparison(comparisons, baselineStrategy = 'sum', reformStrategy = 'sum') {
  return {
    baseline: aggregateValues(comparisons.map(c => c?.baseline), baselineStrategy),
    reform: aggregateValues(comparisons.map(c => c?.reform), reformStrategy),
  };
}

function aggregateDecileComparison(decileData, strategy = "sum") {
  const deciles = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = {};
  
  deciles.forEach(decile => {
    // Convert to string for property access
    const decileKey = String(decile);
    const values = decileData.map(d => d?.[decileKey]).filter(v => v !== undefined);
    
    if (values.length > 0) {
      result[decileKey] = aggregateValues(values, strategy);
    }
  });
  
  return result;
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
