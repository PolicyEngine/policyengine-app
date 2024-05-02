export const policyOutputs = {
  policyBreakdown: "Overview",
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
  laborSupplyImpact: "Labor supply impact (experimental)",
  analysis: "AI summary (experimental)",
  codeReproducibility: "Reproduce in Python",
};

export function getPolicyOutputTree(countryId) {
  const map = Object.assign({}, policyOutputs);
  if (countryId !== "uk") {
    [
      "detailedBudgetaryImpact",
      "wealthDecileAverageImpact",
      "wealthDecileRelativeImpact",
      "intraWealthDecileImpact",
    ].forEach((key) => {
      delete map[key];
    });
  }
  if (countryId !== "us") {
    ["racialPovertyImpact"].forEach((key) => {
      delete map[key];
    });
  }
  const children = Object.keys(map).map((key) => {
    return { name: `policyOutput.${key}`, label: map[key] };
  });

  return [
    {
      name: "policyOutput",
      label: "Policy impact",
      children: children,
    },
  ];
}
