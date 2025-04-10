import {
  aggregateBaselineReformComparison,
  aggregateConstituencyData,
  aggregateDecileComparison,
  aggregatePovertyByAgeBreakdown,
  aggregatePovertyByGenderBreakdown,
  aggregatePovertyByRaceBreakdown,
  aggregateValues,
  aggregateWinnersLosersBreakdownDeciles,
  aggregateWinnersLosersBreakdownSimple,
} from "./aggregateUtils";

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
      ...aggregateDecileComparison(deciles.map((d) => d?.average)),
    },
    relative: {
      ...aggregateDecileComparison(
        deciles.map((d) => d?.relative),
        "mean",
      ),
    },
  };
}

export function aggregateInequalityModule(inequalityData) {
  // Average approach for inequality metrics
  return {
    gini: aggregateBaselineReformComparison(
      inequalityData.map((i) => i?.gini),
      "mean",
      "mean",
    ),
    top_10_pct_share: aggregateBaselineReformComparison(
      inequalityData.map((i) => i?.top_10_pct_share),
      "mean",
      "mean",
    ),
    top_1_pct_share: aggregateBaselineReformComparison(
      inequalityData.map((i) => i?.top_1_pct_share),
      "mean",
      "mean",
    ),
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
      intraDecileData.map((d) => d?.all),
      "mean",
    ),
    deciles: aggregateWinnersLosersBreakdownDeciles(
      intraDecileData.map((d) => d?.deciles),
      "mean",
    ),
  };
}

export function aggregatePovertyByAgeModule(povertyData) {
  return {
    deep_poverty: aggregatePovertyByAgeBreakdown(
      povertyData.map((p) => p?.deep_poverty),
    ),
    poverty: aggregatePovertyByAgeBreakdown(povertyData.map((p) => p?.poverty)),
  };
}

export function aggregatePovertyByGenderModule(povertyByGenderData) {
  return {
    deep_poverty: aggregatePovertyByGenderBreakdown(
      povertyByGenderData.map((p) => p?.deep_poverty),
    ),
    poverty: aggregatePovertyByGenderBreakdown(
      povertyByGenderData.map((p) => p?.poverty),
    ),
  };
}

export function aggregatePovertyByRaceModule(povertyByRaceData) {
  return {
    poverty: aggregatePovertyByRaceBreakdown(
      povertyByRaceData.map((p) => p?.poverty),
    ),
  };
}

export function aggregateConstituencyModule(impacts) {
  if (!impacts || !impacts.length) {
    throw new Error("Cannot aggregate empty or undefined impacts");
  }

  return {
    by_constituency: aggregateConstituencyData(impacts.by_constituency),
    outcomes_by_region: {
      england: aggregateWinnersLosersBreakdownSimple(
        impacts.map((i) => i?.outcomes_by_region?.england),
        "mean",
      ),
      northern_ireland: aggregateWinnersLosersBreakdownSimple(
        impacts.map((i) => i?.outcomes_by_region?.northern_ireland),
        "mean",
      ),
      scotland: aggregateWinnersLosersBreakdownSimple(
        impacts.map((i) => i?.outcomes_by_region?.scotland),
        "mean",
      ),
      wales: aggregateWinnersLosersBreakdownSimple(
        impacts.map((i) => i?.outcomes_by_region?.wales),
        "mean",
      ),
      uk: aggregateWinnersLosersBreakdownSimple(
        impacts.map((i) => i?.outcomes_by_region?.uk),
        "mean",
      ),
    },
  };
}

export function aggregateDetailedBudgetModule(detailedBudgets) {
  const validBudgets = detailedBudgets.filter(
    (budget) => budget !== null && budget !== undefined,
  );

  if (validBudgets.length === 0) {
    return {};
  }

  // Identify all unique budget line items across all impact objects
  const allLineItems = new Set();
  validBudgets.forEach((budget) => {
    Object.keys(budget).forEach((lineItem) => {
      allLineItems.add(lineItem);
    });
  });

  const aggregatedBudget = {};

  allLineItems.forEach((lineItem) => {
    // Extract values for this line item from all budgets
    const lineItemData = validBudgets
      .map((budget) => budget[lineItem] || null)
      .filter((data) => data !== null);

    if (lineItemData.length === 0) {
      return;
    }

    aggregatedBudget[lineItem] = {
      baseline: aggregateValues(lineItemData.map((data) => data.baseline)),
      difference: aggregateValues(lineItemData.map((data) => data.difference)),
      reform: aggregateValues(lineItemData.map((data) => data.reform)),
    };
  });

  return aggregatedBudget;
}
