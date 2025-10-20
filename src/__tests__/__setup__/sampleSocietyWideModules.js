// Using integers to avoid floating point precision issues
export const validBudgetModuleData = [
  {
    baseline_net_income: 1000,
    benefit_spending_impact: 1000,
    budgetary_impact: 1000,
    households: 1000,
    state_tax_revenue_impact: 1000,
    tax_revenue_impact: 1000,
  },
  {
    baseline_net_income: 2000,
    benefit_spending_impact: 2000,
    budgetary_impact: 2000,
    households: 2000,
    state_tax_revenue_impact: 2000,
    tax_revenue_impact: 2000,
  },
  {
    baseline_net_income: 3000,
    benefit_spending_impact: 3000,
    budgetary_impact: 3000,
    households: 3000,
    state_tax_revenue_impact: 3000,
    tax_revenue_impact: 3000,
  },
];

export const expectedBudgetModuleData = {
  baseline_net_income: 6000,
  benefit_spending_impact: 6000,
  budgetary_impact: 6000,
  households: 6000,
  state_tax_revenue_impact: 6000,
  tax_revenue_impact: 6000,
};
