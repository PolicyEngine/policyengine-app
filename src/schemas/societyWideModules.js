import * as yup from 'yup';
import { BaselineReformComparison, BaselineReformDifference, DecileComparison, PovertyByAgeBreakdown, PovertyByGenderBreakdown, PovertyByRaceBreakdown, WinnersLosersBreakdown, WinnersLosersDeciles } from './societyWideUtils';

export const BudgetaryImpactModule = yup.object({
  baseline_net_income: yup.number(),
  benefit_spending_impact: yup.number(),
  budgetary_impact: yup.number(),
  households: yup.number(),
  state_tax_revenue_impact: yup.number(),
  tax_revenue_impact: yup.number(),
});

export const DecileModule = yup.object({
  average: DecileComparison,
  relative: DecileComparison,
});

export const InequalityModule = yup.object({
    gini: BaselineReformComparison,
    top_10_pct_share: BaselineReformComparison,
    top_1_pct_share: BaselineReformComparison,
  }); 

export const IntraDecileModule = yup.object({
    all: WinnersLosersBreakdown,
    deciles: WinnersLosersDeciles,
});

export const PovertyByAgeModule = yup.object({
  deep_poverty: PovertyByAgeBreakdown,
  poverty: PovertyByAgeBreakdown,
});

export const PovertyByGenderModule = yup.object({
  deep_poverty: PovertyByGenderBreakdown,
  poverty: PovertyByGenderBreakdown,
});

export const PovertyByRaceModule = yup.object({
  poverty: PovertyByRaceBreakdown,
});

export const UKDetailedPrograms = yup.object({
  child_benefit: BaselineReformDifference,
  council_tax: BaselineReformDifference,
  fuel_duty: BaselineReformDifference,
  income_tax: BaselineReformDifference,
  national_insurance: BaselineReformDifference,
  ni_employer: BaselineReformDifference,
  pension_credit: BaselineReformDifference,
  state_pension: BaselineReformDifference,
  tax_credits: BaselineReformDifference,
  universal_credit: BaselineReformDifference,
  vat: BaselineReformDifference,
});

export const UKConstituencyModule = yup.object({
    by_constituency: yup.object().nullable().notRequired(), // This contains all 650 constituencies as keys and is impractical to profile
    outcomes_by_region: yup.object({
      england: WinnersLosersBreakdown,
      northern_ireland: WinnersLosersBreakdown,
      scotland: WinnersLosersBreakdown,
      wales: WinnersLosersBreakdown,
      uk: WinnersLosersBreakdown,
    })
  });