import {
  aggregateMultiYearBudgets,
  validateImpacts,
} from "../../../api/societyWideAggregation/aggregate";
import { BudgetaryImpactModule } from "../../../schemas/societyWideModules";
import {
  testObjectsUK,
  testObjectsUS,
} from "../../__setup__/sampleSocietyWideImpacts";

describe("aggregateMultiYearBudgets", () => {
  describe("Given a valid US request", () => {
    test("it should properly call aggregate", () => {
      const impacts = testObjectsUS;
      const countryId = "us";

      expect(
        BudgetaryImpactModule.isValidSync(
          aggregateMultiYearBudgets(countryId, impacts),
        ),
      ).toBe(true);
    });
  });
  describe("Given a valid UK request", () => {
    test("it should properly call aggregateMultiYearBudgetsUK", () => {
      const impacts = testObjectsUK;
      const countryId = "uk";

      expect(
        BudgetaryImpactModule.isValidSync(
          aggregateMultiYearBudgets(countryId, impacts),
        ),
      ).toBe(true);
    });
  });
  describe("Given no impacts", () => {
    test("it should throw an error", () => {
      const impacts = [];
      const countryId = "us";
      const error = "Error in aggregateMultiYearBudgets: No impacts provided";
      console.error = jest.fn(); // Prevent console error output during tests
      expect(() => aggregateMultiYearBudgets(countryId, impacts)).toThrow(
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

      expect(() => aggregateMultiYearBudgets(countryId, impacts)).toThrow(
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

describe("aggregateSocietyWideImpactsUS", () => {
  describe("Given a valid US request", () => {
    test("it should return a SocietyWideImpactUS object", () => {
      const impacts = testObjectsUS;

      expect(
        SocietyWideImpactUS.isValidSync(aggregateSocietyWideImpactsUS(impacts)),
      ).toBe(true);
    });
  });
  describe("Given an invalid US request", () => {
    test("it should throw an error", () => {
      const impacts = [];

      expect(() => aggregateSocietyWideImpactsUS(impacts)).toThrow(
        "Cannot aggregate empty or undefined impacts",
      );
    });
  });
});

describe("aggregateSocietyWideImpactsUK", () => {
  describe("Given a valid UK request", () => {
    test("it should return a SocietyWideImpactUS object", () => {
      const impacts = testObjectsUK;

      expect(
        SocietyWideImpactUS.isValidSync(aggregateSocietyWideImpactsUK(impacts)),
      ).toBe(true);
    });
  });
  describe("Given an invalid UK request", () => {
    test("it should throw an error", () => {
      const impacts = [];

      expect(() => aggregateSocietyWideImpactsUK(impacts)).toThrow(
        "Cannot aggregate empty or undefined impacts",
      );
    });
  });
});
