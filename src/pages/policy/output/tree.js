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
  "laborSupplyImpact.byDecile.relative.total":
    "Labor supply impact by decile (relative)",
  "laborSupplyImpact.byDecile.relative.income":
    "Labor supply income effect impact by decile (relative)",
  "laborSupplyImpact.byDecile.relative.substitution":
    "Labor supply substitution effect impact by decile (relative)",
  "laborSupplyImpact.byDecile.absolute.total":
    "Labor supply impact by decile (absolute)",
  "laborSupplyImpact.byDecile.absolute.income":
    "Labor supply income effect impact by decile (absolute)",
  "laborSupplyImpact.byDecile.absolute.substitution":
    "Labor supply substitution effect impact by decile (absolute)",
  "laborSupplyImpact.hours": "Labor supply impact upon hours worked",
  "laborSupplyImpact.overall": "Overall labor supply impact",
  "povertyImpact.regular.byAge": "Regular poverty impact by age",
  "povertyImpact.regular.byRace": "Regular poverty impact by race",
  "povertyImpact.regular.byGender": "Regular poverty impact by gender",
  "povertyImpact.deep.byAge": "Deep poverty impact by age",
  "povertyImpact.deep.byGender": "Deep poverty impact by gender",
  "winnersAndLosers.incomeDecile": "Winners and losers by income decile",
  "distributionalImpact.incomeDecile.relative":
    "Distributional impact by income decile (relative)",
  "distributionalImpact.incomeDecile.average":
    "Distributional impact by income decile (average)",
  "budgetaryImpact.overall": "Overall budgetary impact",
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
            countryId === "us" && {
              name: "policyOutput.laborSupplyImpact.hours",
              label: "Hours worked",
            },
            {
              name: "policyOutput.laborSupplyImpact.earnings",
              label: "Earnings",
              children: [
                {
                  name: "policyOutput.laborSupplyImpact.earnings.overall",
                  label: "Overall",
                },
                {
                  name: "policyOutput.laborSupplyImpact.earnings.byDecile",
                  label: "By decile",
                  children: [
                    /*
                    {
                      name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative",
                      label: "Relative",
                      children: [
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.total",
                          label: "Total",
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.income",
                          label: "Income effect",
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.substitution",
                          label: "Substitution effect",
                        },
                      ],
                    },
                    */
                    {
                      name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute",
                      label: "Absolute",
                      children: [
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.total",
                          label: "Total",
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.income",
                          label: "Income effect",
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.substitution",
                          label: "Substitution effect",
                        },
                      ],
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
