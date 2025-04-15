// Test data for aggregation utility functions

// Shared empty input for all tests
export const emptyInput = [];

// Using integers to avoid floating point precision issues
export const validBaselineReformData = [
  {
    baseline: 100,
    reform: 110,
  },
  {
    baseline: 200,
    reform: 220,
  },
  {
    baseline: 300,
    reform: 330,
  },
];

export const expectedBaselineReformSumResult = {
  baseline: 600,
  reform: 660,
};

export const expectedBaselineReformMeanResult = {
  baseline: 200,
  reform: 220,
};

// Using integers to avoid floating point precision issues
export const validWinnersLosersSimpleData = [
  {
    "Gain less than 5%": 100,
    "Gain more than 5%": 200,
    "Lose less than 5%": 50,
    "Lose more than 5%": 30,
    "No change": 120,
  },
  {
    "Gain less than 5%": 110,
    "Gain more than 5%": 190,
    "Lose less than 5%": 60,
    "Lose more than 5%": 40,
    "No change": 100,
  },
];

export const expectedWinnersLosersSimpleSumResult = {
  "Gain less than 5%": 210,
  "Gain more than 5%": 390,
  "Lose less than 5%": 110,
  "Lose more than 5%": 70,
  "No change": 220,
};

export const expectedWinnersLosersSimpleMeanResult = {
  "Gain less than 5%": 105,
  "Gain more than 5%": 195,
  "Lose less than 5%": 55,
  "Lose more than 5%": 35,
  "No change": 110,
};

// Using integers to avoid floating point precision issues
export const validWinnersLosersDecilesData = [
  {
    "Gain less than 5%": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    "Gain more than 5%": [15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
    "Lose less than 5%": [12, 22, 32, 42, 52, 62, 72, 82, 92, 102],
    "Lose more than 5%": [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
    "No change": [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
  },
  {
    "Gain less than 5%": [20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
    "Gain more than 5%": [25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
    "Lose less than 5%": [22, 32, 42, 52, 62, 72, 82, 92, 102, 112],
    "Lose more than 5%": [18, 28, 38, 48, 58, 68, 78, 88, 98, 108],
    "No change": [15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
  },
];

export const expectedWinnersLosersDecilesSumResult = {
  "Gain less than 5%": [30, 50, 70, 90, 110, 130, 150, 170, 190, 210],
  "Gain more than 5%": [40, 60, 80, 100, 120, 140, 160, 180, 200, 220],
  "Lose less than 5%": [34, 54, 74, 94, 114, 134, 154, 174, 194, 214],
  "Lose more than 5%": [26, 46, 66, 86, 106, 126, 146, 166, 186, 206],
  "No change": [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
};

export const expectedWinnersLosersDecilesMeanResult = {
  "Gain less than 5%": [15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
  "Gain more than 5%": [20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
  "Lose less than 5%": [17, 27, 37, 47, 57, 67, 77, 87, 97, 107],
  "Lose more than 5%": [13, 23, 33, 43, 53, 63, 73, 83, 93, 103],
  "No change": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
};

// Mixed test data with missing array for some categories
export const mixedWinnersLosersDecilesData = [
  {
    "Gain less than 5%": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    "Gain more than 5%": [15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
    "Lose less than 5%": [12, 22, 32, 42, 52, 62, 72, 82, 92, 102],
    "Lose more than 5%": [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
    "No change": [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
  },
  {
    "Gain less than 5%": [20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
    "Gain more than 5%": [25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
    // Missing "Lose less than 5%", "Lose more than 5%", and "No change"
  },
];

export const expectedMixedWinnersLosersDecilesSumResult = {
  "Gain less than 5%": [30, 50, 70, 90, 110, 130, 150, 170, 190, 210],
  "Gain more than 5%": [40, 60, 80, 100, 120, 140, 160, 180, 200, 220],
  "Lose less than 5%": [12, 22, 32, 42, 52, 62, 72, 82, 92, 102],
  "Lose more than 5%": [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
  "No change": [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
};

// Using integers to avoid floating point precision issues
export const validPovertyByAgeData = [
  {
    adult: { baseline: 20, reform: 18 },
    all: { baseline: 25, reform: 22 },
    child: { baseline: 30, reform: 26 },
    senior: { baseline: 15, reform: 12 },
  },
  {
    adult: { baseline: 22, reform: 16 },
    all: { baseline: 27, reform: 24 },
    child: { baseline: 32, reform: 24 },
    senior: { baseline: 17, reform: 14 },
  },
];

export const expectedPovertyByAgeResult = {
  adult: { baseline: 21, reform: 17 },
  all: { baseline: 26, reform: 23 },
  child: { baseline: 31, reform: 25 },
  senior: { baseline: 16, reform: 13 },
};

// Using integers to avoid floating point precision issues
export const validAggregateValuesData = [10, 20, 30, 40, 50];
export const expectedAggregateValuesSumResult = 150;
export const expectedAggregateValuesMeanResult = 30;
