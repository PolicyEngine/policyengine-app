const getPolicyOutputTree = (countryId) => {
  const shouldShowWealth = countryId === "uk";
  return [
    {
      name: "policyOutput",
      label: "Policy impact",
      children: [
        {
          name: "policyOutput.netIncome",
          label: "Budgetary impact",
        },
        {
          name: "policyOutput.decileAverageImpact",
          label: "Absolute impact by income decile",
        },
        shouldShowWealth && {
          name: "policyOutput.wealthDecileAverageImpact",
          label: "Absolute impact by wealth decile",
        },
        {
          name: "policyOutput.decileRelativeImpact",
          label: "Relative impact by income decile",
        },
        shouldShowWealth && {
          name: "policyOutput.wealthDecileRelativeImpact",
          label: "Relative impact by wealth decile",
        },
        {
          name: "policyOutput.intraDecileImpact",
          label: "Outcomes by income decile",
        },
        shouldShowWealth && {
          name: "policyOutput.intraWealthDecileImpact",
          label: "Outcomes by wealth decile",
        },
        {
          name: "policyOutput.povertyImpact",
          label: "Poverty impact by age",
        },
        {
          name: "policyOutput.deepPovertyImpact",
          label: "Deep poverty impact by age",
        },
        {
          name: "policyOutput.genderPovertyImpact",
          label: "Poverty impact by sex",
        },
        {
          name: "policyOutput.genderDeepPovertyImpact",
          label: "Deep poverty impact by sex",
        },
        {
          name: "policyOutput.inequalityImpact",
          label: "Income inequality impact",
        },
        {
          name: "policyOutput.cliffImpact",
          label: "Cliff impact",
        },
        {
          name: "policyOutput.codeReproducibility",
          label: "Reproduce in Python",
          skipImpacts: true,
        },
        {
          name: "policyOutput.analysis",
          label: "Analysis",
        },
      ].filter(Boolean),
    },
  ];
};

export default getPolicyOutputTree;
