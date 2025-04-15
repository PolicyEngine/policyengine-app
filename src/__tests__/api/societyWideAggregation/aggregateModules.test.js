import {
  aggregateBudgetModule,
  aggregateIntraDecileModule,
  aggregatePovertyByAgeModule,
} from "../../../api/societyWideAggregation/aggregateModules";

import {
  validBudgetModuleData,
  expectedBudgetModuleData,
  validIntraDecileModuleData,
  expectedIntraDecileModuleData,
  validPovertyByAgeModuleData,
  expectedPovertyByAgeModuleData,
  emptyPovertyByAgeModuleData,
  expectedEmptyPovertyByAgeModuleData,
  emptyIntraDecileModuleData,
  expectedEmptyIntraDecileModuleData,
} from "../../__setup__/sampleSocietyWideModules";

describe("aggregateBudgetModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid budget data", () => {
    test("it should return a valid budget object", () => {
      expect(aggregateBudgetModule(validBudgetModuleData)).toEqual(
        expectedBudgetModuleData,
      );
    });
  });

  describe("Given no budget data", () => {
    test("it should return an object with all keys and null values", () => {
      const emptyBudgetModuleData = [];
      const expectedEmptyBudgetModuleData = {
        baseline_net_income: null,
        benefit_spending_impact: null,
        budgetary_impact: null,
        households: null,
        state_tax_revenue_impact: null,
        tax_revenue_impact: null,
      };

      expect(aggregateBudgetModule(emptyBudgetModuleData)).toEqual(
        expectedEmptyBudgetModuleData,
      );
    });
  });
});

describe("aggregateIntraDecileModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid intra decile data", () => {
    test("it should return a valid intra decile object", () => {
      expect(aggregateIntraDecileModule(validIntraDecileModuleData)).toEqual(
        expectedIntraDecileModuleData,
      );
    });
  });

  describe("Given no intra decile data", () => {
    test("it should return an object with properly structured nulls and empty arrays", () => {
      expect(aggregateIntraDecileModule(emptyIntraDecileModuleData)).toEqual(
        expectedEmptyIntraDecileModuleData,
      );
    });
  });
});

describe("aggregatePovertyByAgeModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid poverty by age data", () => {
    test("it should return a valid poverty by age object", () => {
      expect(aggregatePovertyByAgeModule(validPovertyByAgeModuleData)).toEqual(
        expectedPovertyByAgeModuleData,
      );
    });
  });

  describe("Given no poverty by age data", () => {
    test("it should return an object with nulled sub-objects", () => {
      expect(aggregatePovertyByAgeModule(emptyPovertyByAgeModuleData)).toEqual(
        expectedEmptyPovertyByAgeModuleData,
      );
    });
  });
});
