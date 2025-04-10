import { SocietyWideImpactUK, SocietyWideImpactUS } from "../../schemas/societyWideImpact";
import { aggregateLaborSupplyModule } from "./aggregateLaborSupplyModule";
import { aggregateBudgetModule, aggregateDecileModule, aggregateInequalityModule, aggregateIntraDecileModule, aggregatePovertyByAgeModule, aggregatePovertyByGenderModule, aggregatePovertyByRaceModule } from "./aggregateModules";

export function aggregateSocietyWideImpacts(countryId, impacts) {
  validateImpacts(countryId, impacts);

  if (countryId === "uk") {
    return aggregateSocietyWideImpactsUK(impacts);
  } 
  
  if (countryId === "us") {
    return aggregateSocietyWideImpactsUS(impacts);
  }

  console.error("Invalid countryId provided to aggregateSocietyWideImpacts:", countryId);
  throw new Error("Invalid countryId provided to aggregateSocietyWideImpacts");
}


export function aggregateSocietyWideImpactsUS(impacts) {

  const unvalidatedReturn = {
    budget: aggregateBudgetModule(impacts.map((impact) => impact.budget)),
    decile: aggregateDecileModule(impacts.map(impact => impact.decile)),
    inequality: aggregateInequalityModule(impacts.map(impact => impact.inequality)),
    intra_decile: aggregateIntraDecileModule(impacts.map(impact => impact.intra_decile)),
    labor_supply_response: aggregateLaborSupplyModule(impacts.map(impact => impact.labor_supply_response)),
    poverty: aggregatePovertyByAgeModule(impacts.map(impact => impact.poverty)),
    poverty_by_gender: aggregatePovertyByGenderModule(impacts.map(impact => impact.poverty_by_gender)),
    poverty_by_race: aggregatePovertyByRaceModule(impacts.map(impact => impact.poverty_by_race)),
  };

  return SocietyWideImpactUS.cast(unvalidatedReturn);

}

export function aggregateSocietyWideImpactsUK(impacts) {

  const unvalidatedReturn = {
    budget: aggregateBudgetModule(impacts.map((impact) => impact.budget)),
    decile: aggregateDecileModule(impacts.map(impact => impact.decile)),
    inequality: aggregateInequalityModule(impacts.map(impact => impact.inequality)),
    intra_decile: aggregateIntraDecileModule(impacts.map(impact => impact.intra_decile)),
    labor_supply_response: aggregateLaborSupplyModule(impacts.map(impact => impact.labor_supply_response)),
    poverty: aggregatePovertyByAgeModule(impacts.map(impact => impact.poverty)),
    poverty_by_gender: aggregatePovertyByGenderModule(impacts.map(impact => impact.poverty_by_gender)),
  }

}

/**
 * Validate the impacts against the schema for the specified countryId
 * @param {String} countryId 
 * @param {Object} impacts 
 * @returns {Boolean} True if the impacts are valid, false otherwise
 */
export function validateImpacts(countryId, impacts) {

  const SCHEMAS = {
    uk: SocietyWideImpactUK,
    us: SocietyWideImpactUS,
  };

  try {
    SCHEMAS[countryId].validateSync(impacts);
    return true;
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
}

/**
 * Taking an array of SequentialResult items assumed to be
 * successful society-wide impact calculations, validate that
 * 1. each item is a succesful response and 2. that each response
 * is a valid SocietyWideImpact object, then return all in an array
 * @param {Array<SequentialResult>} sequentialResults An array of SequentialResult objects
 * @returns {Array<SocietyWideImpact>} An array of SocietyWideImpact objects
 * @throws {Error} If any of the SequentialResult objects are error responses or
 * if any of the responses are not valid SocietyWideImpact objects
 */
export async function parseSocietyWideResultsFromSequentialRequests(
  countryId,
  sequentialResults,
) {
  let impacts = [];

  try {
    for (let i = 0; i < sequentialResults.length; i++) {
      const result = sequentialResults[i];

      if (result.status !== "success") {
        throw new Error(`SequentialResult ${i} is not a success`);
      }

      const response = result.response;

      const responseJson = await response.json();
      const resultData = responseJson.result;

      validateImpacts(countryId, resultData);

      impacts.push(resultData);
    }
  } catch (error) {
    console.error("Error parsing sequential results:", error);
    throw error;
  }
  return impacts;
}