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
    console.error(err?.errors);
    throw err;
  }

  const unvalidatedReturn = {
    budget: aggregateBudgetData(impacts.map((impact) => impact.budget)),
    constituency_impact: aggregateConstituencyImpactData(impacts.map((impact) => impact.constituency_impact)),
    decile: aggregateDecileData(impacts.map(impact => impact.decile)),
    detailed_budget: aggregateDetailedBudgetData(impacts.map(impact => impact.detailed_budget)),
    inequality: aggregateInequalityData(impacts.map(impact => impact.inequality)),
    intra_decile: aggregateIntraDecileData(impacts.map(impact => impact.intra_decile)),
    intra_wealth_decile: aggregateIntraDecileData(impacts.map(impact => impact.intra_wealth_decile)),
    labor_supply_response: aggregateLaborSupplyData(impacts.map(impact => impact.labor_supply_response)),
    poverty: aggregatePovertyData(impacts.map(impact => impact.poverty)),
    poverty_by_gender: aggregatePovertyByGenderData(impacts.map(impact => impact.poverty_by_gender)),
    poverty_by_race: aggregatePovertyByRaceData(impacts.map(impact => impact.poverty_by_race)),
    wealth_decile: aggregateDecileData(impacts.map(impact => impact.wealth_decile)),
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
  if (!deciles || !deciles.length) {
    return null;
  }

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

function aggregateWinnersLosersBreakdownSimple(breakdowns, strategy = "sum") {
  const categories = [
    "Gain less than 5%",
    "Gain more than 5%",
    "Lose less than 5%",
    "Lose more than 5%",
    "No change"
  ];
  
  const result = {};
  
  categories.forEach(category => {
    
    result[category] = aggregateValues(
      breakdowns.map(b => b?.[category]),
      strategy
    );
  });
  
  return result;
}

function aggregateWinnersLosersBreakdownDeciles(breakdowns, strategy = "sum") {
  const categories = [
    "Gain less than 5%",
    "Gain more than 5%",
    "Lose less than 5%",
    "Lose more than 5%",
    "No change"
  ];
  
  const result = {};
  
  categories.forEach(category => {
    // Initialize with an empty array if no valid data is found
    if (!breakdowns.some(b => Array.isArray(b?.[category]))) {
      result[category] = [];
      return;
    }
    
    // Get the first non-null array to determine length
    const firstValidArray = breakdowns.find(b => Array.isArray(b?.[category]))?.[category];
    if (!firstValidArray) {
      result[category] = [];
      return;
    }
    
    // Create an array of the same length with aggregated values at each position
    result[category] = Array(firstValidArray.length).fill(0).map((_, index) => {
      const valuesAtIndex = breakdowns
        .filter(b => Array.isArray(b?.[category]) && b[category].length > index)
        .map(b => b[category][index]);
      
      return aggregateValues(valuesAtIndex, strategy);
    });
  });
  
  return result;
}

function aggregateIntraDecileData(intraDecileData) {
  if (!intraDecileData || !intraDecileData.length) {
    return null;
  }

  return {
    all: aggregateWinnersLosersBreakdownSimple(
      intraDecileData.map(d => d?.all),
      "mean",
    ),
    deciles: aggregateWinnersLosersBreakdownDeciles(
      intraDecileData.map(d => d?.deciles),
      "mean",
    )
  };
}

function aggregatePovertyData(povertyData) {
  return {
    deep_poverty: aggregatePovertyByAgeBreakdown(povertyData.map(p => p?.deep_poverty)),
    poverty: aggregatePovertyByAgeBreakdown(povertyData.map(p => p?.poverty)),
  };
}

function aggregatePovertyByAgeBreakdown(ageBreakdowns) {
  return {
    adult: aggregateBaselineReformComparison(ageBreakdowns.map(b => b?.adult), 'mean', 'mean'),
    all: aggregateBaselineReformComparison(ageBreakdowns.map(b => b?.all), 'mean', 'mean'),
    child: aggregateBaselineReformComparison(ageBreakdowns.map(b => b?.child), 'mean', 'mean'),
    senior: aggregateBaselineReformComparison(ageBreakdowns.map(b => b?.senior), 'mean', 'mean'),
  };
}

function aggregatePovertyByGenderData(povertyByGenderData) {
  return {
    deep_poverty: aggregatePovertyByGenderBreakdown(povertyByGenderData.map(p => p?.deep_poverty)),
    poverty: aggregatePovertyByGenderBreakdown(povertyByGenderData.map(p => p?.poverty)),
  };
}

function aggregatePovertyByGenderBreakdown(genderBreakdowns) {
  return {
    male: aggregateBaselineReformComparison(genderBreakdowns.map(b => b?.male), 'mean', 'mean'),
    female: aggregateBaselineReformComparison(genderBreakdowns.map(b => b?.female), 'mean', 'mean'),
  };
}

function aggregatePovertyByRaceData(povertyByRaceData) {
  if (!povertyByRaceData || !povertyByRaceData.length) {
    return null;
  }
  return {
    poverty: aggregatePovertyByRaceBreakdown(povertyByRaceData.map(p => p?.poverty)),
  }
}

function aggregatePovertyByRaceBreakdown(raceBreakdowns) {
  return {
    black: aggregateBaselineReformComparison(raceBreakdowns.map(b => b?.black), 'mean', 'mean'),
    hispanic: aggregateBaselineReformComparison(raceBreakdowns.map(b => b?.hispanic), 'mean', 'mean'),
    white: aggregateBaselineReformComparison(raceBreakdowns.map(b => b?.white), 'mean', 'mean'),
    other: aggregateBaselineReformComparison(raceBreakdowns.map(b => b?.other), 'mean', 'mean'),
  }
}

function aggregateLaborSupplyData(laborSupplyData) {
  return {
    hours: {
      baseline: aggregateValues(laborSupplyData.map(l => l?.hours?.baseline)),
      change: aggregateValues(laborSupplyData.map(l => l?.hours?.change)),
      income_effect: aggregateValues(laborSupplyData.map(l => l?.hours?.income_effect)),
      reform: aggregateValues(laborSupplyData.map(l => l?.hours?.reform)),
      substitution_effect: aggregateValues(laborSupplyData.map(l => l?.hours?.substitution_effect)),
    },
    income_lsr: aggregateValues(laborSupplyData.map(l => l?.income_lsr)), 
    substitution_lsr: aggregateValues(laborSupplyData.map(l => l?.substitution_lsr)),
    total_change: aggregateValues(laborSupplyData.map(l => l?.total_change)),
    revenue_change: aggregateValues(laborSupplyData.map(l => l?.revenue_change)),
    decile: {
      average: {
        income: aggregateDecileComparison(laborSupplyData.map(l => l?.decile?.average?.income)),
        substitution: aggregateDecileComparison(laborSupplyData.map(l => l?.decile?.average?.substitution)),
      },
      relative: {
        income: aggregateDecileComparison(laborSupplyData.map(l => l?.decile?.relative?.income), 'mean'),
        substitution: aggregateDecileComparison(laborSupplyData.map(l => l?.decile?.relative?.substitution), 'mean'),
      },
    },
    relative_lsr: {
      income: aggregateValues(laborSupplyData.map(l => l?.relative_lsr?.income), 'mean'),
      substitution: aggregateValues(laborSupplyData.map(l => l?.relative_lsr?.substitution), 'mean'),
    },
  };
}

function aggregateConstituencyImpactData(impacts) {
  if (!impacts || !impacts.length) {
    throw new Error('Cannot aggregate empty or undefined impacts');
  }

  return {
    by_constituency: aggregateConstituencyData(impacts.by_constituency),
    outcomes_by_region: {
      england: aggregateWinnersLosersBreakdownSimple(impacts.map(i => i?.outcomes_by_region?.england), "mean"),
      northern_ireland: aggregateWinnersLosersBreakdownSimple(impacts.map(i => i?.outcomes_by_region?.northern_ireland), "mean"),
      scotland: aggregateWinnersLosersBreakdownSimple(impacts.map(i => i?.outcomes_by_region?.scotland), "mean"),
      wales: aggregateWinnersLosersBreakdownSimple(impacts.map(i => i?.outcomes_by_region?.wales), "mean"),
      uk: aggregateWinnersLosersBreakdownSimple(impacts.map(i => i?.outcomes_by_region?.uk), "mean"),
    }
  }
}

function aggregateConstituencyData(impacts) {
  if (!impacts || !impacts.length) {
    return null;
  }

  const validConstituencyImpacts = impacts
    .map(impact => impact.constituency_impact)
    .filter(impact => impact !== null && impact !== undefined);

  if (validConstituencyImpacts.length === 0) {
    return null; 
  }

  const constituencyMap = new Map();

  validConstituencyImpacts.forEach(constituencyImpact => {
    Object.keys(constituencyImpact).forEach(constituencyName => {
      const constituencyData = constituencyImpact[constituencyName];
      
      if (!constituencyMap.has(constituencyName)) {
        // Initialize constituency data if it doesn't exist yet
        constituencyMap.set(constituencyName, {
          // Using snake_case to reflect original data schema
          average_household_income_changes: [],
          relative_household_income_changes: [],
          x: constituencyData.x,
          y: constituencyData.y
        });
      }
      
      const mapEntry = constituencyMap.get(constituencyName);
      mapEntry.averageHouseholdIncomeChanges.push(constituencyData.average_household_income_change);
      mapEntry.relativeHouseholdIncomeChanges.push(constituencyData.relative_household_income_change);
    });
  });

  const aggregatedConstituencies = {};
  
  constituencyMap.forEach((data, constituencyName) => {
    aggregatedConstituencies[constituencyName] = {
      average_household_income_change: aggregateValues(
        data.average_household_income_changes,
        'mean'
      ),
      relative_household_income_change: aggregateValues(
        data.relative_household_income_changes,
        'mean'
      ),
      x: data.x,
      y: data.y
    };
  });

  return aggregatedConstituencies;
}

function aggregateDetailedBudgetData(detailedBudgets) {
  if (!detailedBudgets || !detailedBudgets.length) {
    return null;
  }

  const validBudgets = detailedBudgets.filter(budget => 
    budget !== null && budget !== undefined
  );
  
  if (validBudgets.length === 0) {
    return {};
  }
  
  // Identify all unique budget line items across all impact objects
  const allLineItems = new Set();
  validBudgets.forEach(budget => {
    Object.keys(budget).forEach(lineItem => {
      allLineItems.add(lineItem);
    });
  });
  
  const aggregatedBudget = {};
  
  allLineItems.forEach(lineItem => {
    // Extract values for this line item from all budgets
    const lineItemData = validBudgets.map(budget => budget[lineItem] || null)
      .filter(data => data !== null);
      
    if (lineItemData.length === 0) {
      return;
    }
    
    aggregatedBudget[lineItem] = {
      baseline: aggregateValues(lineItemData.map(data => data.baseline)),
      difference: aggregateValues(lineItemData.map(data => data.difference)),
      reform: aggregateValues(lineItemData.map(data => data.reform))
    };
  });
  
  return aggregatedBudget;
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

      const validImpact = SocietyWideImpact.cast(resultData);

      impacts.push(validImpact);
    }
  } catch (error) {
    console.error("Error parsing sequential results:", error);
    throw error;
  }
  return impacts;
}
