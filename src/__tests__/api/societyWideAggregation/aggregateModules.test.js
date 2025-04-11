import {
  aggregateBudgetModule,
  aggregateDecileModule,
  aggregateInequalityModule,
} from "../../../api/societyWideAggregation/aggregateModules";
import {
  validBudgetModuleData,
  expectedBudgetModuleData,
  validDecileModuleData,
  expectedDecileModuleData,
  validInequalityModuleData,
  expectedInequalityModuleData,
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
describe("aggregateDecileModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid decile data", () => {
    test("it should return a valid decile object", () => {
      expect(aggregateDecileModule(validDecileModuleData)).toEqual(
        expectedDecileModuleData,
      );
    });
  });
  describe("Given no decile data", () => {
    test("it should return an object with empty objects", () => {
      const emptyDecileModuleData = [];
      const expectedEmptyDecileModuleData = {
        average: {},
        relative: {},
      };

      expect(aggregateDecileModule(emptyDecileModuleData)).toEqual(
        expectedEmptyDecileModuleData,
      );
    });
  });
});
describe("aggregateInequalityModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid inequality data", () => {
    test("it should return a valid inequality object", () => {
      expect(aggregateInequalityModule(validInequalityModuleData)).toEqual(
        expectedInequalityModuleData,
      );
    });
  });
  describe("Given no inequality data", () => {
    test("it should return an object containing nulled sub-objects", () => {
      const emptyInequalityModuleData = [];
      const expectedEmptyInequalityModuleData = {
        gini: {
          baseline: null,
          reform: null,
        },
        top_10_pct_share: {
          baseline: null,
          reform: null,
        },
        top_1_pct_share: {
          baseline: null,
          reform: null,
        },
      };

      expect(aggregateInequalityModule(emptyInequalityModuleData)).toEqual(
        expectedEmptyInequalityModuleData,
      );
    });
  });
});
/*
describe("aggregateIntraDecileModule");
describe("aggregatePovertyByAgeModule");
describe("aggregatePovertyByGenderModule");
describe("aggregatePovertyByRaceModule");
describe("aggregateConstituencyModule");
describe("aggregateDetailedBudgetModule");
*/
