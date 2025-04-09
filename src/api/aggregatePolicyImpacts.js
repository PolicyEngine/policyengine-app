import { SequentialResult } from "./makeSequentialRequests";
import { SocietyWideImpact } from "./societyWideImpact";

/**
 * Aggregate a series of SocietyWideImpact items and return the aggregated result
 * @param {Array<SocietyWideImpact>} impacts An array of policy impact objects
 * @returns {SocietyWideImpact} An object with the following properties:
 */
export function aggregatePolicyImpacts(impacts) {
  return;
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

      // Validate the response
      const validImpact = SocietyWideImpact.cast(resultData);

      // Push the valid impact to the array
      impacts.push(validImpact);
    }
  } catch (error) {
    console.error("Error parsing sequential results:", error);
    throw error;
  }
  return impacts;
}
