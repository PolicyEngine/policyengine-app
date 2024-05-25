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
  laborSupplyDecileRelativeImpact:
    "Labor supply relative impact by decile (experimental)",
  laborSupplyDecileAbsoluteImpact:
    "Labor supply absolute impact by decile (experimental)",
  analysis: "AI summary (experimental)",
  codeReproducibility: "Reproduce in Python",
};

export function getPolicyOutputTree(countryId) {
  const tree = [
    {
      name: "policyOutput",
      label: "Policy impact",
      children: [
        {
          name: "policyOutput.policyBreakdown",
          label: "Overview",
        },
        {
          name: "policyOutput.budgetaryImpact",
          label: "Budgetary impact",
          children: [
            {
              name: "policyOutput.budgetaryImpact.overall",
              label: "Overall",
            },
            countryId === "uk" && {
              name: "policyOutput.budgetaryImpact.byProgram",
              label: "By program",
            },
          ].filter((x) => x),
        },
        {
          name: "policyOutput.distributionalImpact",
          label: "Distributional impact",
          children: [
            {
              name: "policyOutput.distributionalImpact.incomeDecile",
              label: "By income decile",
              children: [
                {
                  name: "policyOutput.distributionalImpact.incomeDecile.relative",
                  label: "Relative",
                },
                {
                  name: "policyOutput.distributionalImpact.incomeDecile.average",
                  label: "Average",
                },
              ],
            },
            countryId === "uk" && {
              name: "policyOutput.distributionalImpact.wealthDecile",
              label: "By wealth decile",
              children: [
                {
                  name: "policyOutput.distributionalImpact.wealthDecile.relative",
                  label: "Relative",
                },
                {
                  name: "policyOutput.distributionalImpact.wealthDecile.average",
                  label: "Average",
                },
              ],
            },
          ].filter((x) => x),
        },
        {
          name: "policyOutput.winnersAndLosers",
          label: "Winners and losers",
          children: [
            {
              name: "policyOutput.winnersAndLosers.incomeDecile",
              label: "By income decile",
            },
            countryId === "uk" && {
              name: "policyOutput.winnersAndLosers.wealthDecile",
              label: "By wealth decile",
            },
          ].filter((x) => x),
        },
        {
          name: "policyOutput.povertyImpact",
          label: "Poverty impact",
          children: [
            {
              name: "policyOutput.povertyImpact.regular",
              label: "Regular poverty",
              children: [
                {
                  name: "policyOutput.povertyImpact.regular.byAge",
                  label: "By age",
                },
                countryId === "us" && {
                  name: "policyOutput.povertyImpact.regular.byRace",
                  label: "By race",
                },
                {
                  name: "policyOutput.povertyImpact.regular.byGender",
                  label: "By gender",
                },
              ].filter((x) => x),
            },
            {
              name: "policyOutput.povertyImpact.deep",
              label: "Deep poverty",
              children: [
                {
                  name: "policyOutput.povertyImpact.deep.byAge",
                  label: "By age",
                },
                {
                  name: "policyOutput.povertyImpact.deep.byGender",
                  label: "By gender",
                },
              ],
            },
          ],
        },
        {
          name: "policyOutput.inequalityImpact",
          label: "Inequality impact",
        },
        {
          name: "policyOutput.laborSupplyImpact",
          label:
            countryId === "uk"
              ? "Labour supply impact (experimental)"
              : "Labor supply impact (experimental)",
          children: [
            {
              name: "policyOutput.laborSupplyImpact.overall",
              label: "Overall",
            },
            countryId === "us" && {
              name: "policyOutput.laborSupplyImpact.hours",
              label: "Hours worked",
            },
            {
              name: "policyOutput.laborSupplyImpact.byDecile",
              label: "By decile",
              children: [
                {
                  name: "policyOutput.laborSupplyImpact.byDecile.relative",
                  label: "Relative",
                  children: [
                    {
                      name: "policyOutput.laborSupplyImpact.byDecile.relative.total",
                      label: "Total",
                    },
                    {
                      name: "policyOutput.laborSupplyImpact.byDecile.relative.income",
                      label: "Income effect",
                    },
                    {
                      name: "policyOutput.laborSupplyImpact.byDecile.relative.substitution",
                      label: "Substitution effect",
                    },
                  ],
                },
                {
                  name: "policyOutput.laborSupplyImpact.byDecile.absolute",
                  label: "Absolute",
                  children: [
                    {
                      name: "policyOutput.laborSupplyImpact.byDecile.absolute.total",
                      label: "Total",
                    },
                    {
                      name: "policyOutput.laborSupplyImpact.byDecile.absolute.income",
                      label: "Income effect",
                    },
                    {
                      name: "policyOutput.laborSupplyImpact.byDecile.absolute.substitution",
                      label: "Substitution effect",
                    },
                  ],
                },
              ],
            },
          ].filter((x) => x),
        },
        {
          name: "policyOutput.analysis",
          label: "AI summary (experimental)",
        },
        {
          name: "policyOutput.codeReproducibility",
          label: "Reproduce in Python",
        },
      ],
    },
  ];

  return tree;
}
