import { SequentialResult } from "./makeSequentialRequests";
import * as yup from "yup";

export const BaselineReformComparison = yup.object({
  baseline: yup.number(),
  reform: yup.number(),
});

export const DecileComparison = yup.object({
  "-1": yup.number().notRequired().default(undefined),
  1: yup.number().required(),
  2: yup.number().required(),
  3: yup.number().required(),
  4: yup.number().required(),
  5: yup.number().required(),
  6: yup.number().required(),
  7: yup.number().required(),
  8: yup.number().required(),
  9: yup.number().required(),
  10: yup.number().required(),
});

export const PovertyByAgeBreakdown = yup.object({
  adult: BaselineReformComparison,
  all: BaselineReformComparison,
  child: BaselineReformComparison,
  senior: BaselineReformComparison,
});

export const PovertyByGenderBreakdown = yup.object({
  male: BaselineReformComparison,
  female: BaselineReformComparison,
});

export const PovertyByRaceBreakdown = yup.object({
  black: BaselineReformComparison,
  hispanic: BaselineReformComparison,
  white: BaselineReformComparison,
  other: BaselineReformComparison,
});

export const WinnersLosersBreakdown = yup.object({
  "Gain less than 5%": yup.number(),
  "Gain more than 5%": yup.number(),
  "Lose less than 5%": yup.number(),
  "Lose more than 5%": yup.number(),
  "No change": yup.number(),
});

export const SocietyWideImpact = yup.object({
  budget: yup.object({
    baseline_net_income: yup.number(),
    benefit_spending_impact: yup.number(),
    budgetary_impact: yup.number(),
    households: yup.number(),
    state_tax_revenue_impact: yup.number(),
    tax_revenue_impact: yup.number(),
  }),
  constituency_impact: yup.object().nullable(),
  decile: yup.object({
    average: DecileComparison,
    relative: DecileComparison,
  }),
  detailed_budget: yup.object().notRequired(),
  inequality: yup.object({
    gini: BaselineReformComparison,
    top_10_pct_share: BaselineReformComparison,
    top_1_pct_share: BaselineReformComparison,
  }),
  intra_decile: yup.object({
    all: WinnersLosersBreakdown,
    deciles: WinnersLosersBreakdown,
  }),
  intra_wealth_decile: yup.object().notRequired(),
  labor_supply_response: yup.object({
    decile: yup.object({
      average: yup.object({
        income: DecileComparison,
        substitution: DecileComparison,
      }),
      relative: yup.object({
        income: DecileComparison,
        substitution: DecileComparison,
      }),
    }),
    hours: {
      baseline: yup.number().default(0),
      change: yup.number().default(0),
      income_effect: yup.number().default(0),
      reform: yup.number().default(0),
      substitution_effect: yup.number().default(0),
    },
    income_lsr: yup.number().default(0),
    relative_lsr: {
      income: yup.number().default(0),
      substitution: yup.number().default(0),
    },
    revenue_change: yup.number().default(0),
    substitution_lsr: yup.number().default(0),
    total_change: yup.number().default(0),
  }),
  poverty: yup.object({
    deep_poverty: PovertyByAgeBreakdown,
    poverty: PovertyByAgeBreakdown,
  }),
  poverty_by_gender: yup.object({
    deep_poverty: PovertyByGenderBreakdown,
    poverty: PovertyByGenderBreakdown,
  }),
  poverty_by_race: yup
    .object({
      poverty: PovertyByRaceBreakdown,
    })
    .notRequired()
    .default(null),
  wealth_decile: yup.object().notRequired(),
});

/**
 * Aggregate a series of policy impact objects (this is a set
 * type, but unfortunately not documented, only implicit)
 * @param {Array<Object>} impacts An array of policy impact objects
 * @returns {Object} An object with the following properties:
 */
export function aggregatePolicyImpacts() {
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
