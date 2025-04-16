import {
  aggregatePovertyByAgeBreakdown,
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

export function aggregateIntraDecileModule(intraDecileData) {
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
