import averageImpactByDecile from "./decile/AverageImpactByDecile";
import averageImpactByWealthDecile from "./decile/AverageImpactByWealthDecile";
import budgetaryImpact from "./budget/BudgetaryImpact";
// import cliffImpact from "./CliffImpact";
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
import laborSupplyImpact from "./labourSupply/LaborSupplyResponse";
import lsrHoursImpact from "./labourSupply/LaborSupplyHoursImpact";
import LabourSupplyDecileAbsoluteImpactSubstitution from "./labourSupply/LabourSupplyDecileAbsoluteImpactSubstitution";
import LabourSupplyDecileAbsoluteImpactTotal from "./labourSupply/LabourSupplyDecileAbsoluteImpactTotal";
import { LabourSupplyDecileAbsoluteImpactIncome } from "./labourSupply/LabourSupplyDecileAbsoluteImpacts";
import LabourSupplyDecileRelativeImpactTotal from "./labourSupply/LabourSupplyDecileRelativeImpactTotal";
import { LabourSupplyDecileRelativeImpactIncome } from "./labourSupply/LabourSupplyDecileRelativeImpacts";
import LabourSupplyDecileRelativeImpactSubstitution from "./labourSupply/LabourSupplyDecileRelativeImpactSubstitution";
import Analysis from "./Analysis";

const map = {
  "budgetaryImpact.overall": budgetaryImpact,
  "budgetaryImpact.byProgram": detailedBudgetaryImpact,
  "laborSupplyImpact.overall": laborSupplyImpact,
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
  // cliffImpact: cliffImpact,
  "laborSupplyImpact.byDecile.relative.total": LabourSupplyDecileRelativeImpactTotal,
  "laborSupplyImpact.byDecile.relative.income": LabourSupplyDecileRelativeImpactIncome,
  "laborSupplyImpact.byDecile.relative.substitution": LabourSupplyDecileRelativeImpactSubstitution,
  "laborSupplyImpact.byDecile.absolute.total": LabourSupplyDecileAbsoluteImpactTotal,
  "laborSupplyImpact.byDecile.absolute.income": LabourSupplyDecileAbsoluteImpactIncome,
  "laborSupplyImpact.byDecile.absolute.substitution": LabourSupplyDecileAbsoluteImpactSubstitution,
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
