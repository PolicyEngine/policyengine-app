import {
  aggregateSocietyWideImpacts,
  aggregateSocietyWideImpactsUK,
  aggregateSocietyWideImpactsUS,
  validateImpacts,
} from "../../../api/societyWideAggregation/aggregate";
import { AggregatedSocietyWideImpact } from "../../../schemas/aggregatedSocietyWideImpact";
import {
  testObjectsUK,
  testObjectsUS,
} from "../../__setup__/sampleSocietyWideImpacts";

describe("aggregateSocietyWideImpacts", () => {
  describe("Given a valid US request", () => {
    test("it should properly call aggregateSocietyWideImpactsUS", () => {
      const impacts = testObjectsUS;
      const countryId = "us";

      expect(aggregateSocietyWideImpacts(countryId, impacts)).toEqual(
        aggregateSocietyWideImpactsUS(impacts),
      );
    });
  });
  describe("Given a valid UK request", () => {
    test("it should properly call aggregateSocietyWideImpactsUK", () => {
      const impacts = testObjectsUK;
      const countryId = "uk";

      expect(aggregateSocietyWideImpacts(countryId, impacts)).toEqual(
        aggregateSocietyWideImpactsUK(impacts),
      );
    });
  });
  describe("Given an invalid country ID", () => {
    test("it should throw an error", () => {
      const impacts = [];
      const countryId = "invalid_country";

      expect(() => aggregateSocietyWideImpacts(countryId, impacts)).toThrow(
        "Invalid countryId : ",
        countryId,
      );
    });
  });
});

describe("aggregateSocietyWideImpactsUS", () => {
  describe("Given a valid US request", () => {
    test("it should return an AggregatedSocietyWideImpact object", () => {
      const impacts = testObjectsUS;

      expect(
        AggregatedSocietyWideImpact.isValidSync(
          aggregateSocietyWideImpactsUS(impacts),
        ),
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
    test("it should return an AggregatedSocietyWideImpacts object", () => {
      const impacts = testObjectsUK;

      expect(
        AggregatedSocietyWideImpact.isValidSync(
          aggregateSocietyWideImpactsUK(impacts),
        ),
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
    test("it should return false", () => {
      const impact = testObjectsUS[0];
      const countryId = "uk";

      expect(validateImpacts(countryId, impact)).toBe(false);
    });
  });
  describe("Given an invalid country ID and US impact", () => {
    test("it should return false", () => {
      const impact = testObjectsUS[0];
      const countryId = "invalid_country";

      expect(validateImpacts(countryId, impact)).toBe(false);
    });
  });
  describe("Given a valid country ID and invalid impact", () => {
    test("it should return false", () => {
      const impact = {};
      const countryId = "uk";

      expect(validateImpacts(countryId, impact)).toBe(false);
    });
  });
});
