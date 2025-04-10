import * as yup from "yup";

export const BaselineReformComparison = yup.object({
  baseline: yup.number(),
  reform: yup.number(),
});

export const BaselineReformComparisonNullable = yup.object({
  baseline: yup.number().nullable(),
  reform: yup.number().nullable(),
})

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
  black: BaselineReformComparisonNullable.nullable(),
  hispanic: BaselineReformComparisonNullable.nullable(),
  white: BaselineReformComparisonNullable.nullable(),
  other: BaselineReformComparisonNullable.nullable(),
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

export const BaselineReformDifferenceNullable = yup.object({
  baseline: yup.number().nullable(),
  reform: yup.number().nullable(),
  difference: yup.number().nullable(),
});

export const UKDetailedPrograms = yup.object({
  child_benefit: BaselineReformDifferenceNullable.nullable(),
  council_tax: BaselineReformDifferenceNullable.nullable(),
  fuel_duty: BaselineReformDifferenceNullable.nullable(),
  income_tax: BaselineReformDifferenceNullable.nullable(),
  national_insurance: BaselineReformDifferenceNullable.nullable(),
  ni_employer: BaselineReformDifferenceNullable.nullable(),
  pension_credit: BaselineReformDifferenceNullable.nullable(),
  state_pension: BaselineReformDifferenceNullable.nullable(),
  tax_credits: BaselineReformDifferenceNullable.nullable(),
  universal_credit: BaselineReformDifferenceNullable.nullable(),
  vat: BaselineReformDifferenceNullable.nullable(),
}).nullable();

export const SocietyWideImpact = yup.object({
  budget: yup.object({
    baseline_net_income: yup.number(),
    benefit_spending_impact: yup.number(),
    budgetary_impact: yup.number(),
    households: yup.number(),
    state_tax_revenue_impact: yup.number(),
    tax_revenue_impact: yup.number(),
  }),
  constituency_impact: yup.object({
    by_constituency: yup.object(), // This contains all 650 constituencies as keys and is impractical to profile
    outcomes_by_region: yup.object({
      england: WinnersLosersBreakdown,
      northern_ireland: WinnersLosersBreakdown,
      scotland: WinnersLosersBreakdown,
      wales: WinnersLosersBreakdown,
      uk: WinnersLosersBreakdown,
    })
  }).notRequired(),
  decile: yup.object({
    average: DecileComparison,
    relative: DecileComparison,
  }),
  detailed_budget: UKDetailedPrograms.nullable(),
  inequality: yup.object({
    gini: BaselineReformComparison,
    top_10_pct_share: BaselineReformComparison,
    top_1_pct_share: BaselineReformComparison,
  }),
  intra_decile: yup.object({
    all: WinnersLosersBreakdown,
    deciles: WinnersLosersDeciles,
  }),
  // intra_wealth_decile: yup.object().notRequired(),
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
    hours: yup.object({
      baseline: yup.number().default(0),
      change: yup.number().default(0),
      income_effect: yup.number().default(0),
      reform: yup.number().default(0),
      substitution_effect: yup.number().default(0),
    }),
    income_lsr: yup.number().default(0),
    relative_lsr: yup.object({
      income: yup.number().default(0),
      substitution: yup.number().default(0),
    }),
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
      poverty: PovertyByRaceBreakdown.nullable(),
    })
    .nullable()
    .notRequired()
  // wealth_decile: yup.object().notRequired(),
});
