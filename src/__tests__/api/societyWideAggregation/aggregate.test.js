import {
  aggregateSocietyWideImpacts,
  aggregateSocietyWideImpactsUK,
  aggregateSocietyWideImpactsUS,
} from "../../../api/societyWideAggregation/aggregate";
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
        "Invalid countryId provided to aggregateSocietyWideImpacts: ",
        countryId,
      );
    });
  });
});
