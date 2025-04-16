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

export const validIntraDecileModuleData = [
  {
    all: {
      "Gain less than 5%": 26,
      "Gain more than 5%": 16,
      "Lose less than 5%": 20,
      "Lose more than 5%": 10,
      "No change": 30,
    },
    deciles: {
      "Gain less than 5%": [10, 10, 20, 20, 30, 30, 40, 40, 50, 50],
      "Gain more than 5%": [0, 10, 10, 20, 20, 30, 30, 40, 40, 50],
      "Lose less than 5%": [40, 30, 30, 20, 20, 10, 10, 0, 0, 0],
      "Lose more than 5%": [20, 20, 10, 10, 0, 0, 0, 0, 0, 0],
      "No change": [20, 20, 20, 20, 20, 10, 10, 0, 0, 0],
    },
  },
  {
    all: {
      "Gain less than 5%": 20,
      "Gain more than 5%": 20,
      "Lose less than 5%": 16,
      "Lose more than 5%": 16,
      "No change": 30,
    },
    deciles: {
      "Gain less than 5%": [10, 20, 20, 30, 20, 20, 10, 10, 0, 0],
      "Gain more than 5%": [10, 10, 20, 20, 30, 20, 20, 10, 10, 0],
      "Lose less than 5%": [30, 30, 20, 20, 10, 10, 10, 0, 0, 0],
      "Lose more than 5%": [20, 10, 10, 10, 10, 10, 10, 20, 20, 30],
      "No change": [20, 20, 20, 10, 20, 20, 40, 50, 50, 60],
    },
  },
];

export const expectedIntraDecileModuleData = {
  all: {
    "Gain less than 5%": 23,
    "Gain more than 5%": 18,
    "Lose less than 5%": 18,
    "Lose more than 5%": 13,
    "No change": 30,
  },
  deciles: {
    "Gain less than 5%": [10, 15, 20, 25, 25, 25, 25, 25, 25, 25],
    "Gain more than 5%": [5, 10, 15, 20, 25, 25, 25, 25, 25, 25],
    "Lose less than 5%": [35, 30, 25, 20, 15, 10, 10, 0, 0, 0],
    "Lose more than 5%": [20, 15, 10, 10, 5, 5, 5, 10, 10, 15],
    "No change": [20, 20, 20, 15, 20, 15, 25, 25, 25, 30],
  },
};

// Using integers to avoid floating point precision issues
// Representing percentages as integers (e.g., 10 = 0.10 or 10%)
export const validPovertyByAgeModuleData = [
  {
    deep_poverty: {
      adult: { baseline: 10, reform: 8 },
      all: { baseline: 12, reform: 9 },
      child: { baseline: 14, reform: 12 },
      senior: { baseline: 8, reform: 6 },
    },
    poverty: {
      adult: { baseline: 22, reform: 18 },
      all: { baseline: 24, reform: 20 },
      child: { baseline: 28, reform: 24 },
      senior: { baseline: 18, reform: 16 },
    },
  },
  {
    deep_poverty: {
      adult: { baseline: 12, reform: 10 },
      all: { baseline: 14, reform: 11 },
      child: { baseline: 18, reform: 16 },
      senior: { baseline: 10, reform: 8 },
    },
    poverty: {
      adult: { baseline: 24, reform: 20 },
      all: { baseline: 26, reform: 22 },
      child: { baseline: 30, reform: 26 },
      senior: { baseline: 20, reform: 18 },
    },
  },
];

export const expectedPovertyByAgeModuleData = {
  deep_poverty: {
    adult: { baseline: 11, reform: 9 },
    all: { baseline: 13, reform: 10 },
    child: { baseline: 16, reform: 14 },
    senior: { baseline: 9, reform: 7 },
  },
  poverty: {
    adult: { baseline: 23, reform: 19 },
    all: { baseline: 25, reform: 21 },
    child: { baseline: 29, reform: 25 },
    senior: { baseline: 19, reform: 17 },
  },
};

export const emptyPovertyByAgeModuleData = [];
export const expectedEmptyPovertyByAgeModuleData = {
  deep_poverty: {
    adult: {
      baseline: null,
      reform: null,
    },
    all: {
      baseline: null,
      reform: null,
    },
    child: {
      baseline: null,
      reform: null,
    },
    senior: {
      baseline: null,
      reform: null,
    },
  },
  poverty: {
    adult: {
      baseline: null,
      reform: null,
    },
    all: {
      baseline: null,
      reform: null,
    },
    child: {
      baseline: null,
      reform: null,
    },
    senior: {
      baseline: null,
      reform: null,
    },
  },
};

export const emptyIntraDecileModuleData = [];
export const expectedEmptyIntraDecileModuleData = {
  all: {
    "Gain less than 5%": null,
    "Gain more than 5%": null,
    "Lose less than 5%": null,
    "Lose more than 5%": null,
    "No change": null,
  },
  deciles: {
    "Gain less than 5%": [],
    "Gain more than 5%": [],
    "Lose less than 5%": [],
    "Lose more than 5%": [],
    "No change": [],
  },
};
