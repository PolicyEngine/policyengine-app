import {
  aggregateSocietyWideImpacts,
  validateImpacts,
} from "../../../api/societyWideAggregation/aggregate";
import { AggregatedSocietyWideImpact } from "../../../schemas/aggregatedSocietyWideImpact";
import {
  testObjectsUK,
  testObjectsUS,
} from "../../__setup__/sampleSocietyWideImpacts";

describe("aggregateSocietyWideImpacts", () => {
  describe("Given a valid US request", () => {
    test("it should properly call aggregate", () => {
      const impacts = testObjectsUS;
      const countryId = "us";

      expect(
        AggregatedSocietyWideImpact.isValidSync(
          aggregateSocietyWideImpacts(countryId, impacts),
        ),
      ).toBe(true);
    });
  });
  describe("Given a valid UK request", () => {
    test("it should properly call aggregateSocietyWideImpactsUK", () => {
      const impacts = testObjectsUK;
      const countryId = "uk";

      expect(
        AggregatedSocietyWideImpact.isValidSync(
          aggregateSocietyWideImpacts(countryId, impacts),
        ),
      ).toBe(true);
    });
  });
  describe("Given no impacts", () => {
    test("it should throw an error", () => {
      const impacts = [];
      const countryId = "us";
      const error = "Error in aggregateSocietyWideImpacts: No impacts provided";
      console.error = jest.fn(); // Prevent console error output during tests
      expect(() => aggregateSocietyWideImpacts(countryId, impacts)).toThrow(
        error,
      );
    });
  });
  describe("Given an invalid country ID", () => {
    test("it should throw an error", () => {
      const impacts = [
        {
          budget: {
            baseline_net_income: 1000,
            benefit_spending_impact: 1000,
            budgetary_impact: 1000,
            households: 1000,
            state_tax_revenue_impact: 1000,
            tax_revenue_impact: 1000,
          },
        },
      ];
      const countryId = "invalid_country";

      expect(() => aggregateSocietyWideImpacts(countryId, impacts)).toThrow(
        `Invalid country ID: ${countryId}`,
      );
    });
  });
});

describe("validateImpacts", () => {
  describe("Given a valid US impact and US country ID", () => {
    test("it should return true", () => {
      const impact = testObjectsUS[0];
      const countryId = "us";

      expect(validateImpacts(countryId, impact)).toBe(true);
    });
  });
  describe("Given a valid UK impact and UK country ID", () => {
    test("it should return true", () => {
      const impact = testObjectsUK[0];
      const countryId = "uk";

      expect(validateImpacts(countryId, impact)).toBe(true);
    });
  });
  describe("Given a valid US impact and UK country ID", () => {
    test("it should throw", () => {
      const impact = testObjectsUS[0];
      const countryId = "uk";

      expect(() => validateImpacts(countryId, impact)).toThrow(
        "is a required field",
      );
    });
  });
  describe("Given an invalid country ID and US impact", () => {
    test("it should throw", () => {
      const impact = testObjectsUS[0];
      const countryId = "invalid_country";

      expect(() => validateImpacts(countryId, impact)).toThrow(
        "Invalid country ID: invalid_country",
      );
    });
  });
  describe("Given a valid country ID and invalid impact", () => {
    test("it should throw", () => {
      const impact = {};
      const countryId = "uk";

      expect(() => validateImpacts(countryId, impact)).toThrow(
        "is a required field",
      );
    });
  });
});
