// Using integers to avoid floating point precision issues
export const emptyInput = [];

export const validLaborSupplyModuleData = [
  {
    hours: {
      baseline: 1000,
      change: 50,
      income_effect: -20,
      reform: 1050,
      substitution_effect: 70,
    },
    income_lsr: 10,
    substitution_lsr: 30,
    total_change: 50,
    revenue_change: 200,
    decile: {
      average: {
        income: {
          "-1": 5,
          1: 10,
          2: 20,
          3: 30,
          4: 40,
          5: 50,
          6: 60,
          7: 70,
          8: 80,
          9: 90,
          10: 100,
        },
        substitution: {
          "-1": 10,
          1: 15,
          2: 25,
          3: 35,
          4: 45,
          5: 55,
          6: 65,
          7: 75,
          8: 85,
          9: 95,
          10: 105,
        },
      },
      relative: {
        income: {
          "-1": 1,
          1: 2,
          2: 3,
          3: 4,
          4: 5,
          5: 6,
          6: 7,
          7: 8,
          8: 9,
          9: 10,
          10: 11,
        },
        substitution: {
          "-1": 2,
          1: 3,
          2: 4,
          3: 5,
          4: 6,
          5: 7,
          6: 8,
          7: 9,
          8: 10,
          9: 11,
          10: 12,
        },
      },
    },
    relative_lsr: {
      income: 5,
      substitution: 15,
    },
  },
  {
    hours: {
      baseline: 2000,
      change: 100,
      income_effect: -40,
      reform: 2100,
      substitution_effect: 140,
    },
    income_lsr: 20,
    substitution_lsr: 60,
    total_change: 100,
    revenue_change: 400,
    decile: {
      average: {
        income: {
          "-1": 15,
          1: 20,
          2: 30,
          3: 40,
          4: 50,
          5: 60,
          6: 70,
          7: 80,
          8: 90,
          9: 100,
          10: 110,
        },
        substitution: {
          "-1": 20,
          1: 25,
          2: 35,
          3: 45,
          4: 55,
          5: 65,
          6: 75,
          7: 85,
          8: 95,
          9: 105,
          10: 115,
        },
      },
      relative: {
        income: {
          "-1": 3,
          1: 4,
          2: 5,
          3: 6,
          4: 7,
          5: 8,
          6: 9,
          7: 10,
          8: 11,
          9: 12,
          10: 13,
        },
        substitution: {
          "-1": 4,
          1: 5,
          2: 6,
          3: 7,
          4: 8,
          5: 9,
          6: 10,
          7: 11,
          8: 12,
          9: 13,
          10: 14,
        },
      },
    },
    relative_lsr: {
      income: 7,
      substitution: 21,
    },
  },
];

export const expectedLaborSupplyModuleResult = {
  hours: {
    baseline: 3000,
    change: 150,
    income_effect: -60,
    reform: 3150,
    substitution_effect: 210,
  },
  income_lsr: 30,
  substitution_lsr: 90,
  total_change: 150,
  revenue_change: 600,
  decile: {
    average: {
      income: {
        "-1": 20,
        1: 30,
        2: 50,
        3: 70,
        4: 90,
        5: 110,
        6: 130,
        7: 150,
        8: 170,
        9: 190,
        10: 210,
      },
      substitution: {
        "-1": 30,
        1: 40,
        2: 60,
        3: 80,
        4: 100,
        5: 120,
        6: 140,
        7: 160,
        8: 180,
        9: 200,
        10: 220,
      },
    },
    relative: {
      income: {
        "-1": 2,
        1: 3,
        2: 4,
        3: 5,
        4: 6,
        5: 7,
        6: 8,
        7: 9,
        8: 10,
        9: 11,
        10: 12,
      },
      substitution: {
        "-1": 3,
        1: 4,
        2: 5,
        3: 6,
        4: 7,
        5: 8,
        6: 9,
        7: 10,
        8: 11,
        9: 12,
        10: 13,
      },
    },
  },
  relative_lsr: {
    income: 6,
    substitution: 18,
  },
};

export const expectedEmptyLaborSupplyModuleResult = {
  hours: {
    baseline: null,
    change: null,
    income_effect: null,
    reform: null,
    substitution_effect: null,
  },
  income_lsr: null,
  substitution_lsr: null,
  total_change: null,
  revenue_change: null,
  decile: {
    average: {
      income: {},
      substitution: {},
    },
    relative: {
      income: {},
      substitution: {},
    },
  },
  relative_lsr: {
    income: null,
    substitution: null,
  },
};

// Partial data missing some properties
export const partialLaborSupplyModuleData = [
  {
    hours: {
      baseline: 1000,
      change: 50,
      // Missing income_effect
      reform: 1050,
      substitution_effect: 70,
    },
    income_lsr: 10,
    // Missing substitution_lsr
    total_change: 50,
    revenue_change: 200,
    decile: {
      average: {
        income: {
          "-1": 5,
          1: 10,
          2: 20,
          3: 30,
          4: 40,
          5: 50,
          6: 60,
          7: 70,
          8: 80,
          9: 90,
          10: 100,
        },
        // Missing substitution
      },
      // Missing relative
    },
    relative_lsr: {
      income: 5,
      // Missing substitution
    },
  },
];

export const expectedPartialLaborSupplyModuleResult = {
  hours: {
    baseline: 1000,
    change: 50,
    income_effect: null,
    reform: 1050,
    substitution_effect: 70,
  },
  income_lsr: 10,
  substitution_lsr: null,
  total_change: 50,
  revenue_change: 200,
  decile: {
    average: {
      income: {
        "-1": 5,
        1: 10,
        2: 20,
        3: 30,
        4: 40,
        5: 50,
        6: 60,
        7: 70,
        8: 80,
        9: 90,
        10: 100,
      },
      substitution: {},
    },
    relative: {
      income: {},
      substitution: {},
    },
  },
  relative_lsr: {
    income: 5,
    substitution: null,
  },
};
