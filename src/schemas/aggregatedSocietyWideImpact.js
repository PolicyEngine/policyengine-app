import * as yup from "yup";
import {
  BudgetaryImpactModule,
  IntraDecileModule,
  PovertyByAgeModule,
} from "./societyWideModules";

export const AggregatedSocietyWideImpact = yup.object({
  budget: BudgetaryImpactModule.required(),
  poverty: PovertyByAgeModule.required(),
  intra_decile: IntraDecileModule.required(),
});
