import { AggregatedSocietyWideImpact } from "../../schemas/aggregatedSocietyWideImpact";
import {
  SocietyWideImpactUK,
  SocietyWideImpactUS,
} from "../../schemas/societyWideImpact";
import {
  aggregateBudgetModule,
  aggregateIntraDecileModule,
  aggregatePovertyByAgeModule,
} from "./aggregateModules";

export function aggregateSocietyWideImpacts(countryId, impacts) {
  if (!impacts || impacts.length === 0) {
    const error = "Error in aggregateSocietyWideImpacts: No impacts provided";
    console.log(error);
    throw new Error(error);
  }

  try {
    for (const impact of impacts) {
      validateImpacts(countryId, impact);
    }
  } catch (err) {
    console.log("Error validating impacts");
    throw err;
  }

  try {
    const unvalidatedReturn = {
      budget: aggregateBudgetModule(impacts.map((impact) => impact.budget)),
      poverty: aggregatePovertyByAgeModule(
        impacts.map((impact) => impact.poverty),
      ),
      intra_decile: aggregateIntraDecileModule(
        impacts.map((impact) => impact.intra_decile),
      ),
    };

    return AggregatedSocietyWideImpact.cast(unvalidatedReturn);
  } catch (error) {
    console.error("Error validating impacts:", error);
    throw error;
  }
}

/**
 * Validate the impacts against the schema for the specified countryId
 * @param {String} countryId
 * @param {Object} impacts
 * @returns {Boolean} True if the impacts are valid
 * @throws {Error} If the countryId is invalid or if the impacts are not valid
 */
export function validateImpacts(countryId, impacts) {
  const SCHEMAS = {
    uk: SocietyWideImpactUK,
    us: SocietyWideImpactUS,
  };

  if (!SCHEMAS[countryId]) {
    const error = `Invalid country ID: ${countryId}`;
    console.error(error);
    throw new Error(error);
  }

  try {
    SCHEMAS[countryId].validateSync(impacts);
    return true;
  } catch (error) {
    console.error("Validation error:", error);
    throw error;
  }
}

/**
 * Taking an array of SequentialResult items assumed to be
 * successful society-wide impact calculations, validate that
 * 1. each item is a succesful response and 2. that each response
 * is a valid SocietyWideImpact object, then return all in an array
 * @param {Array<SequentialResult>} sequentialResults An array of SequentialResult objects
 * @returns {Array<SocietyWideImpactUK | SocietyWideImpactUS>} An array of SocietyWideImpact objects
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
