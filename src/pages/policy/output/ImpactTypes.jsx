import averageImpactByDecile from "./AverageImpactByDecile";
import averageImpactByWealthDecile from "./AverageImpactByWealthDecile";
import budgetaryImpact from "./BudgetaryImpact";
// import cliffImpact from "./CliffImpact";
import deepPovertyImpact from "./DeepPovertyImpact";
import deepPovertyImpactByGender from "./DeepPovertyImpactByGender";
import detailedBudgetaryImpact from "./DetailedBudgetaryImpact";
import inequalityImpact from "./InequalityImpact";
import intraDecileImpact from "./IntraDecileImpact";
import intraWealthDecileImpact from "./IntraWealthDecileImpact";
import povertyImpact from "./PovertyImpact";
import povertyImpactByGender from "./PovertyImpactByGender";
import povertyImpactByRace from "./PovertyImpactByRace";
import relativeImpactByDecile from "./RelativeImpactByDecile";
import relativeImpactByWealthDecile from "./RelativeImpactByWealthDecile";
import laborSupplyImpact from "./LaborSupplyResponse";

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
};

// get representations of the impact as a chart and a csv. The returned object
// has type {chart: <a react component>, csv: <an array>}.
export const getImpactReps = (impactKey, props) => {
  return map[impactKey](props);
};
