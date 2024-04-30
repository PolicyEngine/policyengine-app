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
import laborSupplyImpact from "./LaborSupplyResponse";
import LabourSupplyDecileImpact from "./LabourSupplyDecileImpact";

const map = {
  netIncome: budgetaryImpact,
  detailedBudgetaryImpact: detailedBudgetaryImpact,
  laborSupplyImpact: laborSupplyImpact,
  decileAverageImpact: averageImpactByDecile,
  wealthDecileAverageImpact: averageImpactByWealthDecile,
  decileRelativeImpact: relativeImpactByDecile,
  wealthDecileRelativeImpact: relativeImpactByWealthDecile,
  intraDecileImpact: intraDecileImpact,
  intraWealthDecileImpact: intraWealthDecileImpact,
  povertyImpact: povertyImpact,
  deepPovertyImpact: deepPovertyImpact,
  genderPovertyImpact: povertyImpactByGender,
  genderDeepPovertyImpact: deepPovertyImpactByGender,
  racialPovertyImpact: povertyImpactByRace,
  inequalityImpact: inequalityImpact,
  // cliffImpact: cliffImpact,
  labourSupplyDecileImpact: LabourSupplyDecileImpact,
};

// get representations of the impact as a chart and a csv. The returned object
// has type {chart: <a react component>, csv: <an array>}.
export const getImpactReps = (impactKey, props) => {
  return map[impactKey](props);
};
