import {
  aggregateBaselineReformComparison,
  aggregateValues,
} from "../../../api/societyWideAggregation/aggregateUtils";

import {
  emptyInput,
  expectedAggregateValuesSumResult,
  expectedBaselineReformSumResult,
  validAggregateValuesData,
  validBaselineReformData,
} from "../../__setup__/sampleSocietyWideUtils";

describe("aggregateBaselineReformComparison", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid baseline-reform comparison data", () => {
    test("it should aggregate values using sum strategy by default", () => {
      expect(
        aggregateBaselineReformComparison(validBaselineReformData),
      ).toEqual(expectedBaselineReformSumResult);
    });
  });

  describe("Given no baseline-reform comparison data", () => {
    test("it should return an object with null values", () => {
      expect(aggregateBaselineReformComparison(emptyInput)).toEqual({
        baseline: null,
        reform: null,
      });
    });
  });
});

describe("aggregateValues", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid values", () => {
    test("it should aggregate using sum strategy by default", () => {
      expect(aggregateValues(validAggregateValuesData)).toBe(
        expectedAggregateValuesSumResult,
      );
    });
  });

  describe("Given invalid strategy", () => {
    test("it should throw an error", () => {
      expect(() => {
        aggregateValues(validAggregateValuesData, "invalid_strategy");
      }).toThrow("Invalid aggregation strategy: invalid_strategy");
    });
  });

  describe("Given no values", () => {
    test("it should return null and log an error", () => {
      expect(aggregateValues(emptyInput)).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Given values with undefined or null", () => {
    test("it should filter out undefined and null values", () => {
      const mixedValues = [10, undefined, 20, null, 30];
      expect(aggregateValues(mixedValues)).toBe(60);
    });
  });
});
