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

export const impactLabels = {
  // Add policyBreakdown as a label (and menu item),
  // but not as a chart or CSV in "map" below
  policyBreakdown: "Policy breakdown",
  netIncome: "Budgetary impact",
  detailedBudgetaryImpact: "Budgetary impact by program",
  decileAverageImpact: "Absolute impact by income decile",
  wealthDecileAverageImpact: "Absolute impact by wealth decile",
  decileRelativeImpact: "Relative impact by income decile",
  wealthDecileRelativeImpact: "Relative impact by wealth decile",
  intraDecileImpact: "Outcomes by income decile",
  intraWealthDecileImpact: "Outcomes by wealth decile",
  povertyImpact: "Poverty impact by age",
  deepPovertyImpact: "Deep poverty impact by age",
  genderPovertyImpact: "Poverty impact by sex",
  genderDeepPovertyImpact: "Deep poverty impact by sex",
  racialPovertyImpact: "Poverty impact by race and ethnicity",
  inequalityImpact: "Income inequality impact",
  // cliffImpact: "Cliff impact",
  codeReproducibility: "Reproduce in Python",
  analysis: "Analysis",
  laborSupplyImpact: "Labor supply impact",
};

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
