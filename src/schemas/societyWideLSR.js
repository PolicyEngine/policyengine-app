import * as yup from 'yup';
import { DecileComparison } from './societyWideUtils';

export const LSRModule = yup.object({
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
  });