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

export const validDecileModuleData = [
  {
    average: {
      1: 4,
      2: 4,
      3: 4,
      4: 4,
      5: 4,
      6: 4,
      7: 4,
      8: 4,
      9: 4,
      10: 4,
    },
    relative: {
      1: 4,
      2: 4,
      3: 4,
      4: 4,
      5: 4,
      6: 4,
      7: 4,
      8: 4,
      9: 4,
      10: 4,
    },
  },
  {
    average: {
      1: 5,
      2: 5,
      3: 5,
      4: 5,
      5: 5,
      6: 5,
      7: 5,
      8: 5,
      9: 5,
      10: 5,
    },
    relative: {
      1: 5,
      2: 5,
      3: 5,
      4: 5,
      5: 5,
      6: 5,
      7: 5,
      8: 5,
      9: 5,
      10: 5,
    },
  },
  {
    average: {
      1: 9,
      2: 9,
      3: 9,
      4: 9,
      5: 9,
      6: 9,
      7: 9,
      8: 9,
      9: 9,
      10: 9,
    },
    relative: {
      1: 9,
      2: 9,
      3: 9,
      4: 9,
      5: 9,
      6: 9,
      7: 9,
      8: 9,
      9: 9,
      10: 9,
    },
  },
];

export const expectedDecileModuleData = {
  average: {
    1: 18,
    2: 18,
    3: 18,
    4: 18,
    5: 18,
    6: 18,
    7: 18,
    8: 18,
    9: 18,
    10: 18,
  },
  relative: {
    1: 6,
    2: 6,
    3: 6,
    4: 6,
    5: 6,
    6: 6,
    7: 6,
    8: 6,
    9: 6,
    10: 6,
  },
};

// Test using integers to avoid floating point precision issues
export const validInequalityModuleData = [
  {
    gini: {
      baseline: 4,
      reform: 4,
    },
    top_10_pct_share: {
      baseline: 4,
      reform: 4,
    },
    top_1_pct_share: {
      baseline: 4,
      reform: 4,
    },
  },
  {
    gini: {
      baseline: 5,
      reform: 5,
    },
    top_10_pct_share: {
      baseline: 5,
      reform: 5,
    },
    top_1_pct_share: {
      baseline: 5,
      reform: 5,
    },
  },
  {
    gini: {
      baseline: 9,
      reform: 9,
    },
    top_10_pct_share: {
      baseline: 9,
      reform: 9,
    },
    top_1_pct_share: {
      baseline: 9,
      reform: 9,
    },
  },
];
export const expectedInequalityModuleData = {
  gini: {
    baseline: 6,
    reform: 6,
  },
  top_10_pct_share: {
    baseline: 6,
    reform: 6,
  },
  top_1_pct_share: {
    baseline: 6,
    reform: 6,
  },
};
