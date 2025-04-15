import { AggregatedSocietyWideImpact } from "../../schemas/aggregatedSocietyWideImpact";
import {
  SocietyWideImpactUK,
  SocietyWideImpactUS,
} from "../../schemas/societyWideImpact";
import { aggregateLaborSupplyModule } from "./aggregateLaborSupplyModule";
import {
  aggregateBudgetModule,
  aggregateConstituencyModule,
  aggregateDecileModule,
  aggregateDetailedBudgetModule,
  aggregateInequalityModule,
  aggregateIntraDecileModule,
  aggregatePovertyByAgeModule,
  aggregatePovertyByGenderModule,
  aggregatePovertyByRaceModule,
} from "./aggregateModules";

export function aggregateSocietyWideImpacts(countryId, impacts) {
  for (const impact of impacts) {
    validateImpacts(countryId, impact);
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

export function aggregateSocietyWideImpactsUS(impacts) {
  if (!impacts || !impacts.length) {
    throw new Error("Cannot aggregate empty or undefined impacts");
  }

  const unvalidatedReturn = {
    budget: aggregateBudgetModule(impacts.map((impact) => impact.budget)),
    decile: aggregateDecileModule(impacts.map((impact) => impact.decile)),
    inequality: aggregateInequalityModule(
      impacts.map((impact) => impact.inequality),
    ),
    intra_decile: aggregateIntraDecileModule(
      impacts.map((impact) => impact.intra_decile),
    ),
    labor_supply_response: aggregateLaborSupplyModule(
      impacts.map((impact) => impact.labor_supply_response),
    ),
    poverty: aggregatePovertyByAgeModule(
      impacts.map((impact) => impact.poverty),
    ),
    poverty_by_gender: aggregatePovertyByGenderModule(
      impacts.map((impact) => impact.poverty_by_gender),
    ),
    poverty_by_race: aggregatePovertyByRaceModule(
      impacts.map((impact) => impact.poverty_by_race),
    ),
  };

  return SocietyWideImpactUS.cast(unvalidatedReturn);
}

export function aggregateSocietyWideImpactsUK(impacts) {
  if (!impacts || !impacts.length) {
    throw new Error("Cannot aggregate empty or undefined impacts");
  }

  const unvalidatedReturn = {
    budget: aggregateBudgetModule(impacts.map((impact) => impact.budget)),
    constituency_impact: aggregateConstituencyModule(
      impacts.map((impact) => impact.constituency_impact),
    ),
    decile: aggregateDecileModule(impacts.map((impact) => impact.decile)),
    detailed_budget: aggregateDetailedBudgetModule(
      impacts.map((impact) => impact.detailed_budget),
    ),
    inequality: aggregateInequalityModule(
      impacts.map((impact) => impact.inequality),
    ),
    intra_decile: aggregateIntraDecileModule(
      impacts.map((impact) => impact.intra_decile),
    ),
    intra_wealth_decile: aggregateIntraDecileModule(
      impacts.map((impact) => impact.intra_wealth_decile),
    ),
    labor_supply_response: aggregateLaborSupplyModule(
      impacts.map((impact) => impact.labor_supply_response),
    ),
    poverty: aggregatePovertyByAgeModule(
      impacts.map((impact) => impact.poverty),
    ),
    poverty_by_gender: aggregatePovertyByGenderModule(
      impacts.map((impact) => impact.poverty_by_gender),
    ),
    wealth_decile: aggregateDecileModule(
      impacts.map((impact) => impact.wealth_decile),
    ),
  };

  return SocietyWideImpactUK.cast(unvalidatedReturn);
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

  if (!SCHEMAS[countryId]) {
    console.error(`Invalid countryId: ${countryId}`);
    return false;
  }

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
