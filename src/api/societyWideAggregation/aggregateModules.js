import { aggregateBaselineReformComparison, aggregateDecileComparison, aggregatePovertyByAgeBreakdown, aggregatePovertyByGenderBreakdown, aggregatePovertyByRaceBreakdown, aggregateWinnersLosersBreakdownDeciles, aggregateWinnersLosersBreakdownSimple } from "./aggregateUtils";
import { SequentialResult } from "./makeSequentialRequests";
// import { SocietyWideImpact } from "../schemas/societyWideImpact";
import { aggregators } from "./simpleAggregators";


export function aggregateBudgetModule(budgets) {
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

export function aggregateDecileModule(deciles) {

  return {
    average: {
      ...aggregateDecileComparison(deciles.map(d => d?.average)),
    },
    relative: {
      ...aggregateDecileComparison(deciles.map(d => d?.relative), "mean"),
    },
  };
}

export function aggregateInequalityModule(inequalityData) {
  // Average approach for inequality metrics
  return {
    gini: aggregateBaselineReformComparison(inequalityData.map(i => i?.gini), 'mean', 'mean'),
    top_10_pct_share: aggregateBaselineReformComparison(inequalityData.map(i => i?.top_10_pct_share), 'mean', 'mean'),
    top_1_pct_share: aggregateBaselineReformComparison(inequalityData.map(i => i?.top_1_pct_share), 'mean', 'mean'),
  };
}

export function aggregateIntraDecileModule(intraDecileData) {
  console.log("Aggregating intra decile data");
  console.log(intraDecileData);

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

export function aggregatePovertyByAgeModule(povertyData) {
  return {
    deep_poverty: aggregatePovertyByAgeBreakdown(povertyData.map(p => p?.deep_poverty)),
    poverty: aggregatePovertyByAgeBreakdown(povertyData.map(p => p?.poverty)),
  };
}

export function aggregatePovertyByGenderModule(povertyByGenderData) {
  return {
    deep_poverty: aggregatePovertyByGenderBreakdown(povertyByGenderData.map(p => p?.deep_poverty)),
    poverty: aggregatePovertyByGenderBreakdown(povertyByGenderData.map(p => p?.poverty)),
  };
}

export function aggregatePovertyByRaceModule(povertyByRaceData) {
  return {
    poverty: aggregatePovertyByRaceBreakdown(povertyByRaceData.map(p => p?.poverty)),
  }
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
