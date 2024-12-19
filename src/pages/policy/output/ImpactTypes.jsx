import averageImpactByDecile from "./decile/AverageImpactByDecile";
import averageImpactByWealthDecile from "./decile/AverageImpactByWealthDecile";
import budgetaryImpact from "./budget/BudgetaryImpact";
import cliffImpact from "./CliffImpact";
import deepPovertyImpact from "./poverty/DeepPovertyImpact";
import deepPovertyImpactByGender from "./poverty/DeepPovertyImpactByGender";
import detailedBudgetaryImpact from "./budget/DetailedBudgetaryImpact";
import inequalityImpact from "./InequalityImpact";
import intraDecileImpact from "./decile/IntraDecileImpact";
import intraWealthDecileImpact from "./decile/IntraWealthDecileImpact";
import povertyImpact from "./poverty/PovertyImpact";
import povertyImpactByGender from "./poverty/PovertyImpactByGender";
import povertyImpactByRace from "./poverty/PovertyImpactByRace";
import relativeImpactByDecile from "./decile/RelativeImpactByDecile";
import relativeImpactByWealthDecile from "./decile/RelativeImpactByWealthDecile";
import LaborSupplyResponseAbsolute from "./laborSupply/LaborSupplyResponseAbsolute";
import LaborSupplyResponseRelative from "./laborSupply/LaborSupplyResponseRelative";
import lsrHoursImpact from "./laborSupply/LaborSupplyHoursImpact";
import {
  LaborSupplyDecileAbsoluteImpactIncome,
  LaborSupplyDecileAbsoluteImpactSubstitution,
  LaborSupplyDecileAbsoluteImpactTotal,
} from "./laborSupply/LaborSupplyDecileAbsoluteImpacts";
import {
  LaborSupplyDecileRelativeImpactIncome,
  LaborSupplyDecileRelativeImpactSubstitution,
  LaborSupplyDecileRelativeImpactTotal,
} from "./laborSupply/LaborSupplyDecileRelativeImpacts";
import Analysis from "./Analysis";

const map = {
  "budgetaryImpact.overall": budgetaryImpact,
  "budgetaryImpact.byProgram": detailedBudgetaryImpact,
  "distributionalImpact.incomeDecile.average": averageImpactByDecile,
  "distributionalImpact.wealthDecile.average": averageImpactByWealthDecile,
  "distributionalImpact.incomeDecile.relative": relativeImpactByDecile,
  "distributionalImpact.wealthDecile.relative": relativeImpactByWealthDecile,
  "winnersAndLosers.incomeDecile": intraDecileImpact,
  "winnersAndLosers.wealthDecile": intraWealthDecileImpact,
  "povertyImpact.regular.byAge": povertyImpact,
  "povertyImpact.deep.byAge": deepPovertyImpact,
  "povertyImpact.regular.byGender": povertyImpactByGender,
  "povertyImpact.deep.byGender": deepPovertyImpactByGender,
  "povertyImpact.regular.byRace": povertyImpactByRace,
  inequalityImpact: inequalityImpact,
  cliffImpact: cliffImpact,
  "laborSupplyImpact.earnings.overall.absolute": LaborSupplyResponseAbsolute,
  "laborSupplyImpact.earnings.overall.relative": LaborSupplyResponseRelative,
  "laborSupplyImpact.earnings.byDecile.relative.total":
    LaborSupplyDecileRelativeImpactTotal,
  "laborSupplyImpact.earnings.byDecile.relative.income":
    LaborSupplyDecileRelativeImpactIncome,
  "laborSupplyImpact.earnings.byDecile.relative.substitution":
    LaborSupplyDecileRelativeImpactSubstitution,
  "laborSupplyImpact.earnings.byDecile.absolute.total":
    LaborSupplyDecileAbsoluteImpactTotal,
  "laborSupplyImpact.earnings.byDecile.absolute.income":
    LaborSupplyDecileAbsoluteImpactIncome,
  "laborSupplyImpact.earnings.byDecile.absolute.substitution":
    LaborSupplyDecileAbsoluteImpactSubstitution,
  "laborSupplyImpact.hours": lsrHoursImpact,
  analysis: Analysis,
};

// get representations of the impact as a chart and a csv. The returned object
// has type {chart: <a react component>, csv: <an array>}.
export const getImpactReps = (impactKey, props) => {
  try {
    return map[impactKey](props);
  } catch (e) {
    throw new Error(`Impact type ${impactKey} not found`);
  }
};

export const impactKeys = Object.keys(map);
