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

// Using integers to avoid floating point precision issues
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

// Using integers to avoid floating point precision issues
// Representing percentages as integers (e.g., 10 = 0.10 or 10%)
export const validPovertyByGenderModuleData = [
  {
    deep_poverty: {
      male: { baseline: 10, reform: 8 },
      female: { baseline: 12, reform: 10 },
    },
    poverty: {
      male: { baseline: 20, reform: 18 },
      female: { baseline: 24, reform: 20 },
    },
  },
  {
    deep_poverty: {
      male: { baseline: 14, reform: 12 },
      female: { baseline: 16, reform: 14 },
    },
    poverty: {
      male: { baseline: 24, reform: 22 },
      female: { baseline: 28, reform: 24 },
    },
  },
];

export const expectedPovertyByGenderModuleData = {
  deep_poverty: {
    male: { baseline: 12, reform: 10 },
    female: { baseline: 14, reform: 12 },
  },
  poverty: {
    male: { baseline: 22, reform: 20 },
    female: { baseline: 26, reform: 22 },
  },
};

export const emptyPovertyByGenderModuleData = [];
export const expectedEmptyPovertyByGenderModuleData = {
  deep_poverty: {
    male: {
      baseline: null,
      reform: null,
    },
    female: {
      baseline: null,
      reform: null,
    },
  },
  poverty: {
    male: {
      baseline: null,
      reform: null,
    },
    female: {
      baseline: null,
      reform: null,
    },
  },
};

// Using integers to avoid floating point precision issues
// Representing percentages as integers (e.g., 25 = 0.25 or 25%)
export const validPovertyByRaceModuleData = [
  {
    poverty: {
      black: { baseline: 24, reform: 20 },
      hispanic: { baseline: 22, reform: 18 },
      white: { baseline: 14, reform: 12 },
      other: { baseline: 20, reform: 16 },
    },
  },
  {
    poverty: {
      black: { baseline: 28, reform: 24 },
      hispanic: { baseline: 26, reform: 22 },
      white: { baseline: 18, reform: 16 },
      other: { baseline: 24, reform: 20 },
    },
  },
];

export const expectedPovertyByRaceModuleData = {
  poverty: {
    black: { baseline: 26, reform: 22 },
    hispanic: { baseline: 24, reform: 20 },
    white: { baseline: 16, reform: 14 },
    other: { baseline: 22, reform: 18 },
  },
};

export const emptyPovertyByRaceModuleData = [];
export const expectedEmptyPovertyByRaceModuleData = {
  poverty: {
    black: {
      baseline: null,
      reform: null,
    },
    hispanic: {
      baseline: null,
      reform: null,
    },
    white: {
      baseline: null,
      reform: null,
    },
    other: {
      baseline: null,
      reform: null,
    },
  },
};

// Using integers to avoid floating point precision issues
// Representing percentages as integers (e.g., 5 = 0.05 or 5%)
export const validConstituencyModuleData = [
  {
    by_constituency: {
      "Constituency 1": {
        average_household_income_change: 500,
        relative_household_income_change: 5,
        x: 100,
        y: 200,
      },
      "Constituency 2": {
        average_household_income_change: -200,
        relative_household_income_change: -2,
        x: 150,
        y: 250,
      },
    },
    outcomes_by_region: {
      england: {
        "Gain less than 5%": 30,
        "Gain more than 5%": 20,
        "Lose less than 5%": 10,
        "Lose more than 5%": 5,
        "No change": 35,
      },
      northern_ireland: {
        "Gain less than 5%": 25,
        "Gain more than 5%": 15,
        "Lose less than 5%": 20,
        "Lose more than 5%": 10,
        "No change": 30,
      },
      scotland: {
        "Gain less than 5%": 28,
        "Gain more than 5%": 22,
        "Lose less than 5%": 15,
        "Lose more than 5%": 8,
        "No change": 26,
      },
      wales: {
        "Gain less than 5%": 30,
        "Gain more than 5%": 25,
        "Lose less than 5%": 15,
        "Lose more than 5%": 5,
        "No change": 25,
      },
      uk: {
        "Gain less than 5%": 29,
        "Gain more than 5%": 21,
        "Lose less than 5%": 15,
        "Lose more than 5%": 7,
        "No change": 28,
      },
    },
  },
  {
    by_constituency: {
      "Constituency 1": {
        average_household_income_change: 600,
        relative_household_income_change: 7,
        x: 100,
        y: 200,
      },
      "Constituency 3": {
        average_household_income_change: 300,
        relative_household_income_change: 3,
        x: 200,
        y: 300,
      },
    },
    outcomes_by_region: {
      england: {
        "Gain less than 5%": 36,
        "Gain more than 5%": 24,
        "Lose less than 5%": 12,
        "Lose more than 5%": 3,
        "No change": 25,
      },
      northern_ireland: {
        "Gain less than 5%": 27,
        "Gain more than 5%": 17,
        "Lose less than 5%": 18,
        "Lose more than 5%": 8,
        "No change": 30,
      },
      scotland: {
        "Gain less than 5%": 32,
        "Gain more than 5%": 24,
        "Lose less than 5%": 13,
        "Lose more than 5%": 4,
        "No change": 26,
      },
      wales: {
        "Gain less than 5%": 32,
        "Gain more than 5%": 27,
        "Lose less than 5%": 13,
        "Lose more than 5%": 7,
        "No change": 21,
      },
      uk: {
        "Gain less than 5%": 31,
        "Gain more than 5%": 23,
        "Lose less than 5%": 13,
        "Lose more than 5%": 5,
        "No change": 28,
      },
    },
  },
];

export const expectedConstituencyModuleData = {
  by_constituency: {
    "Constituency 1": {
      average_household_income_change: 550,
      relative_household_income_change: 6,
      x: 100,
      y: 200,
    },
    "Constituency 2": {
      average_household_income_change: -200,
      relative_household_income_change: -2,
      x: 150,
      y: 250,
    },
    "Constituency 3": {
      average_household_income_change: 300,
      relative_household_income_change: 3,
      x: 200,
      y: 300,
    },
  },
  outcomes_by_region: {
    england: {
      "Gain less than 5%": 33,
      "Gain more than 5%": 22,
      "Lose less than 5%": 11,
      "Lose more than 5%": 4,
      "No change": 30,
    },
    northern_ireland: {
      "Gain less than 5%": 26,
      "Gain more than 5%": 16,
      "Lose less than 5%": 19,
      "Lose more than 5%": 9,
      "No change": 30,
    },
    scotland: {
      "Gain less than 5%": 30,
      "Gain more than 5%": 23,
      "Lose less than 5%": 14,
      "Lose more than 5%": 6,
      "No change": 26,
    },
    wales: {
      "Gain less than 5%": 31,
      "Gain more than 5%": 26,
      "Lose less than 5%": 14,
      "Lose more than 5%": 6,
      "No change": 23,
    },
    uk: {
      "Gain less than 5%": 30,
      "Gain more than 5%": 22,
      "Lose less than 5%": 14,
      "Lose more than 5%": 6,
      "No change": 28,
    },
  },
};

export const emptyConstituencyModuleData = [];

export const validDetailedBudgetModuleData = [
  {
    "Income Tax": {
      baseline: 1000000,
      difference: -100000,
      reform: 900000,
    },
    VAT: {
      baseline: 800000,
      difference: 0,
      reform: 800000,
    },
    "Child Benefit": {
      baseline: 300000,
      difference: 50000,
      reform: 350000,
    },
  },
  {
    "Income Tax": {
      baseline: 1100000,
      difference: -120000,
      reform: 980000,
    },
    "Corporation Tax": {
      baseline: 500000,
      difference: 50000,
      reform: 550000,
    },
  },
];

export const expectedDetailedBudgetModuleData = {
  "Income Tax": {
    baseline: 2100000,
    difference: -220000,
    reform: 1880000,
  },
  VAT: {
    baseline: 800000,
    difference: 0,
    reform: 800000,
  },
  "Child Benefit": {
    baseline: 300000,
    difference: 50000,
    reform: 350000,
  },
  "Corporation Tax": {
    baseline: 500000,
    difference: 50000,
    reform: 550000,
  },
};

export const emptyDetailedBudgetModuleData = [];
export const expectedEmptyDetailedBudgetModuleData = {};

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
