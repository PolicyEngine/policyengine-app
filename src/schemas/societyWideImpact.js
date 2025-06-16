import * as yup from "yup";
import {
  BudgetaryImpactModule,
  DecileModule,
  InequalityModule,
  IntraDecileModule,
  PovertyByAgeModule,
  PovertyByGenderModule,
  PovertyByRaceModule,
  UKConstituencyModule,
  UKDetailedPrograms,
} from "./societyWideModules";
import { LSRModule } from "./societyWideLSR";

export const SocietyWideImpactUS = yup.object({
  budget: BudgetaryImpactModule.required(),
  decile: DecileModule.required(),
  inequality: InequalityModule.required(),
  intra_decile: IntraDecileModule.required(),
  labor_supply_response: LSRModule.required(),
  poverty: PovertyByAgeModule.required(),
  poverty_by_gender: PovertyByGenderModule.required(),
  poverty_by_race: PovertyByRaceModule.required(),
});

export const SocietyWideImpactUK = yup.object({
  budget: BudgetaryImpactModule.required(),
  constituency_impact: UKConstituencyModule.required(),
  decile: DecileModule.required(),
  detailed_budget: UKDetailedPrograms.required(),
  inequality: InequalityModule.required(),
  intra_decile: IntraDecileModule.required(),
  intra_wealth_decile: IntraDecileModule.required(),
  labor_supply_response: LSRModule.required(),
  poverty: PovertyByAgeModule.required(),
  poverty_by_gender: PovertyByGenderModule.required(),
  wealth_decile: DecileModule.required(),
});
