import {
  aggregateDecileComparison,
  aggregateBaselineReformComparison,
  aggregateWinnersLosersBreakdownSimple,
  aggregateWinnersLosersBreakdownDeciles,
  aggregatePovertyByAgeBreakdown,
  aggregatePovertyByGenderBreakdown,
  aggregatePovertyByRaceBreakdown,
  aggregateConstituencyData,
  aggregateValues,
} from "../../../api/societyWideAggregation/aggregateUtils";

import {
  emptyInput,
  validDecileComparisonData,
  expectedDecileComparisonSumResult,
  expectedDecileComparisonMeanResult,
  validBaselineReformData,
  expectedBaselineReformSumResult,
  expectedBaselineReformMeanResult,
  validWinnersLosersSimpleData,
  expectedWinnersLosersSimpleSumResult,
  expectedWinnersLosersSimpleMeanResult,
  validWinnersLosersDecilesData,
  expectedWinnersLosersDecilesSumResult,
  expectedWinnersLosersDecilesMeanResult,
  mixedWinnersLosersDecilesData,
  expectedMixedWinnersLosersDecilesSumResult,
  validPovertyByAgeData,
  expectedPovertyByAgeResult,
  validPovertyByGenderData,
  expectedPovertyByGenderResult,
  validPovertyByRaceData,
  expectedPovertyByRaceResult,
  validConstituencyData,
  expectedConstituencyDataResult,
  validAggregateValuesData,
  expectedAggregateValuesSumResult,
  expectedAggregateValuesMeanResult,
} from "../../__setup__/sampleSocietyWideUtils";

describe("aggregateDecileComparison", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid decile comparison data", () => {
    test("it should aggregate values using sum strategy by default", () => {
      expect(aggregateDecileComparison(validDecileComparisonData)).toEqual(
        expectedDecileComparisonSumResult,
      );
    });

    test("it should aggregate values using mean strategy when specified", () => {
      expect(
        aggregateDecileComparison(validDecileComparisonData, "mean"),
      ).toEqual(expectedDecileComparisonMeanResult);
    });
  });

  describe("Given no decile comparison data", () => {
    test("it should return an empty object", () => {
      expect(aggregateDecileComparison(emptyInput)).toEqual({});
    });
  });
});

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

    test("it should aggregate values using mean strategy when specified", () => {
      expect(
        aggregateBaselineReformComparison(
          validBaselineReformData,
          "mean",
          "mean",
        ),
      ).toEqual(expectedBaselineReformMeanResult);
    });

    test("it should support different strategies for baseline and reform", () => {
      const mixed = aggregateBaselineReformComparison(
        validBaselineReformData,
        "sum",
        "mean",
      );
      expect(mixed).toEqual({
        baseline: 600,
        reform: 220,
      });
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

describe("aggregateWinnersLosersBreakdownSimple", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid winners-losers simple data", () => {
    test("it should aggregate values using sum strategy by default", () => {
      expect(
        aggregateWinnersLosersBreakdownSimple(validWinnersLosersSimpleData),
      ).toEqual(expectedWinnersLosersSimpleSumResult);
    });

    test("it should aggregate values using mean strategy when specified", () => {
      expect(
        aggregateWinnersLosersBreakdownSimple(
          validWinnersLosersSimpleData,
          "mean",
        ),
      ).toEqual(expectedWinnersLosersSimpleMeanResult);
    });
  });

  describe("Given no winners-losers simple data", () => {
    test("it should return an object with null values for each category", () => {
      const result = aggregateWinnersLosersBreakdownSimple(emptyInput);
      expect(result).toEqual({
        "Gain less than 5%": null,
        "Gain more than 5%": null,
        "Lose less than 5%": null,
        "Lose more than 5%": null,
        "No change": null,
      });
    });
  });
});

describe("aggregateWinnersLosersBreakdownDeciles", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid winners-losers deciles data", () => {
    test("it should aggregate values using sum strategy by default", () => {
      expect(
        aggregateWinnersLosersBreakdownDeciles(validWinnersLosersDecilesData),
      ).toEqual(expectedWinnersLosersDecilesSumResult);
    });

    test("it should aggregate values using mean strategy when specified", () => {
      expect(
        aggregateWinnersLosersBreakdownDeciles(
          validWinnersLosersDecilesData,
          "mean",
        ),
      ).toEqual(expectedWinnersLosersDecilesMeanResult);
    });
  });

  describe("Given mixed winners-losers deciles data with missing categories", () => {
    test("it should handle missing arrays correctly", () => {
      const result = aggregateWinnersLosersBreakdownDeciles(
        mixedWinnersLosersDecilesData,
      );
      expect(result).toEqual(expectedMixedWinnersLosersDecilesSumResult);
    });
  });

  describe("Given no winners-losers deciles data", () => {
    test("it should return an object with empty arrays for each category", () => {
      const result = aggregateWinnersLosersBreakdownDeciles(emptyInput);
      expect(result).toEqual({
        "Gain less than 5%": [],
        "Gain more than 5%": [],
        "Lose less than 5%": [],
        "Lose more than 5%": [],
        "No change": [],
      });
    });
  });
});

describe("aggregatePovertyByAgeBreakdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid poverty by age data", () => {
    test("it should correctly aggregate using mean strategy", () => {
      expect(aggregatePovertyByAgeBreakdown(validPovertyByAgeData)).toEqual(
        expectedPovertyByAgeResult,
      );
    });
  });

  describe("Given no poverty by age data", () => {
    test("it should return an object with null values", () => {
      const result = aggregatePovertyByAgeBreakdown(emptyInput);
      expect(result).toEqual({
        adult: { baseline: null, reform: null },
        all: { baseline: null, reform: null },
        child: { baseline: null, reform: null },
        senior: { baseline: null, reform: null },
      });
    });
  });
});

describe("aggregatePovertyByGenderBreakdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid poverty by gender data", () => {
    test("it should correctly aggregate using mean strategy", () => {
      expect(
        aggregatePovertyByGenderBreakdown(validPovertyByGenderData),
      ).toEqual(expectedPovertyByGenderResult);
    });
  });

  describe("Given no poverty by gender data", () => {
    test("it should return an object with null values", () => {
      const result = aggregatePovertyByGenderBreakdown(emptyInput);
      expect(result).toEqual({
        male: { baseline: null, reform: null },
        female: { baseline: null, reform: null },
      });
    });
  });
});

describe("aggregatePovertyByRaceBreakdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid poverty by race data", () => {
    test("it should correctly aggregate using mean strategy", () => {
      expect(aggregatePovertyByRaceBreakdown(validPovertyByRaceData)).toEqual(
        expectedPovertyByRaceResult,
      );
    });
  });

  describe("Given no poverty by race data", () => {
    test("it should return an object with null values", () => {
      const result = aggregatePovertyByRaceBreakdown(emptyInput);
      expect(result).toEqual({
        black: { baseline: null, reform: null },
        hispanic: { baseline: null, reform: null },
        white: { baseline: null, reform: null },
        other: { baseline: null, reform: null },
      });
    });
  });
});

describe("aggregateConstituencyData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid constituency data", () => {
    test("it should correctly aggregate constituency values", () => {
      expect(aggregateConstituencyData(validConstituencyData)).toEqual(
        expectedConstituencyDataResult,
      );
    });
  });

  describe("Given no constituency data", () => {
    test("it should return null", () => {
      expect(aggregateConstituencyData(emptyInput)).toBeNull();
    });

    test("it should return null for undefined input", () => {
      expect(aggregateConstituencyData(undefined)).toBeNull();
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

    test("it should aggregate using mean strategy when specified", () => {
      expect(aggregateValues(validAggregateValuesData, "mean")).toBe(
        expectedAggregateValuesMeanResult,
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
