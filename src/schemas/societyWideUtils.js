import * as yup from "yup";

export const BaselineReformComparison = yup.object({
  baseline: yup.number(),
  reform: yup.number(),
});

export const BaselineReformDifference = yup.object({
  baseline: yup.number(),
  reform: yup.number(),
  difference: yup.number(),
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

export const WinnersLosersBreakdown = yup.object({
  "Gain less than 5%": yup.number(),
  "Gain more than 5%": yup.number(),
  "Lose less than 5%": yup.number(),
  "Lose more than 5%": yup.number(),
  "No change": yup.number(),
});

export const WinnersLosersDeciles = yup.object({
  "Gain less than 5%": yup.array().of(yup.number()),
  "Gain more than 5%": yup.array().of(yup.number()),
  "Lose less than 5%": yup.array().of(yup.number()),
  "Lose more than 5%": yup.array().of(yup.number()),
  "No change": yup.array().of(yup.number()),
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