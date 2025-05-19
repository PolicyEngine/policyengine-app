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
export const validAggregateValuesData = [10, 20, 30, 40, 50];
export const expectedAggregateValuesSumResult = 150;
export const expectedAggregateValuesMeanResult = 30;
