import { aggregateLaborSupplyModule } from "../../../api/societyWideAggregation/aggregateLaborSupplyModule";

import {
  emptyInput,
  validLaborSupplyModuleData,
  expectedLaborSupplyModuleResult,
  expectedEmptyLaborSupplyModuleResult,
  partialLaborSupplyModuleData,
  expectedPartialLaborSupplyModuleResult,
} from "../../__setup__/sampleSocietyWideLSR";

describe("aggregateLaborSupplyModule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Prevent console error output during tests
  });

  describe("Given valid labor supply data", () => {
    test("it should return a correctly aggregated labor supply object", () => {
      expect(aggregateLaborSupplyModule(validLaborSupplyModuleData)).toEqual(
        expectedLaborSupplyModuleResult,
      );
    });
  });

  describe("Given no labor supply data", () => {
    test("it should return an object with appropriate null and empty values", () => {
      expect(aggregateLaborSupplyModule(emptyInput)).toEqual(
        expectedEmptyLaborSupplyModuleResult,
      );
    });
  });

  describe("Given partial labor supply data with missing properties", () => {
    test("it should handle missing properties correctly", () => {
      expect(aggregateLaborSupplyModule(partialLaborSupplyModuleData)).toEqual(
        expectedPartialLaborSupplyModuleResult,
      );
    });
  });
});
