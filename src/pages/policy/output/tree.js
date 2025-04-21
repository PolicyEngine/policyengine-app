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
  cliffImpact: "Cliff impact",
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

export function getPolicyOutputTree(countryId, searchParams = {}) {
  // Checks if UK local areas is explicitly enabled in the URl Parameter
  const uk_local_areas_beta =
    searchParams && typeof searchParams.get === "function"
      ? searchParams.get("uk_local_areas_beta") === "true"
      : false;

  const isMultiYear =
    searchParams && typeof searchParams.get === "function"
      ? searchParams.get("simYears") &&
        !Number.isNaN(searchParams.get("simYears")) &&
        searchParams.get("simYears") > 1
      : false;

  const tree = [
    {
      name: "policyOutput",
      label: "Policy impact",
      children: [
        {
          name: "policyOutput.policyBreakdown",
          label: "Overview",
          disabled: isMultiYear,
        },
        isMultiYear
          ? {
              name: "policyOutput.budgetaryImpact",
              label: "Budgetary impact",
            }
          : {
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
          disabled: isMultiYear,
          children: [
            {
              name: "policyOutput.distributionalImpact.incomeDecile",
              label: "By income decile",
              disabled: isMultiYear,
              children: [
                {
                  name: "policyOutput.distributionalImpact.incomeDecile.relative",
                  label: "Relative",
                  disabled: isMultiYear,
                },
                {
                  name: "policyOutput.distributionalImpact.incomeDecile.average",
                  label: "Average",
                  disabled: isMultiYear,
                },
              ],
            },
            countryId === "uk" && {
              name: "policyOutput.distributionalImpact.wealthDecile",
              label: "By wealth decile",
              disabled: isMultiYear,
              children: [
                {
                  name: "policyOutput.distributionalImpact.wealthDecile.relative",
                  label: "Relative",
                  disabled: isMultiYear,
                },
                {
                  name: "policyOutput.distributionalImpact.wealthDecile.average",
                  label: "Average",
                  disabled: isMultiYear,
                },
              ],
            },
          ].filter((x) => x),
        },
        {
          name: "policyOutput.winnersAndLosers",
          label: "Winners and losers",
          disabled: isMultiYear,
          children: [
            {
              name: "policyOutput.winnersAndLosers.incomeDecile",
              label: "By income decile",
              disabled: isMultiYear,
            },
            countryId === "uk" && {
              name: "policyOutput.winnersAndLosers.wealthDecile",
              label: "By wealth decile",
              disabled: isMultiYear,
            },
            uk_local_areas_beta && {
              name: "policyOutput.winnersAndLosers.constituencies",
              label: "By parliamentary constituency",
            },
          ].filter((x) => x),
        },
        {
          name: "policyOutput.povertyImpact",
          label: "Poverty impact",
          disabled: isMultiYear,
          children: [
            {
              name: "policyOutput.povertyImpact.regular",
              label: "Regular poverty",
              disabled: isMultiYear,
              children: [
                {
                  name: "policyOutput.povertyImpact.regular.byAge",
                  label: "By age",
                  disabled: isMultiYear,
                },
                countryId === "us" && {
                  name: "policyOutput.povertyImpact.regular.byRace",
                  label: "By race",
                  disabled: isMultiYear,
                },
                {
                  name: "policyOutput.povertyImpact.regular.byGender",
                  label: "By gender",
                  disabled: isMultiYear,
                },
              ].filter((x) => x),
            },
            {
              name: "policyOutput.povertyImpact.deep",
              label: "Deep poverty",
              disabled: isMultiYear,
              children: [
                {
                  name: "policyOutput.povertyImpact.deep.byAge",
                  label: "By age",
                  disabled: isMultiYear,
                },
                {
                  name: "policyOutput.povertyImpact.deep.byGender",
                  label: "By gender",
                  disabled: isMultiYear,
                },
              ],
            },
          ],
        },
        {
          name: "policyOutput.inequalityImpact",
          label: "Inequality impact",
          disabled: isMultiYear,
        },
        {
          name: "policyOutput.cliffImpact",
          label: "Cliff impact",
          disabled: isMultiYear,
        },
        uk_local_areas_beta && {
          name: "policyOutput.constituencies",
          label: "Parliamentary constituencies (experimental)",
          disabled: isMultiYear,
          children: [
            {
              name: "policyOutput.constituencies.relative",
              label: "Relative change",
              disabled: isMultiYear,
            },
            {
              name: "policyOutput.constituencies.average",
              label: "Average change",
              disabled: isMultiYear,
            },
          ],
        },
        {
          name: "policyOutput.laborSupplyImpact",
          label:
            countryId === "uk"
              ? "Labour supply impact (experimental)"
              : "Labor supply impact (experimental)",
          disabled: isMultiYear,
          children: [
            uk_local_areas_beta && {
              name: "policyOutput.constituencies.laborSupplyFTEs",
              label: "By parliamentary constituency",
              disabled: isMultiYear,
            },
            countryId === "us" && {
              name: "policyOutput.laborSupplyImpact.hours",
              label: "Hours worked",
              disabled: isMultiYear,
            },
            {
              name: "policyOutput.laborSupplyImpact.earnings",
              label: "Earnings",
              disabled: isMultiYear,
              children: [
                {
                  name: "policyOutput.laborSupplyImpact.earnings.overall",
                  label: "Overall",
                  disabled: isMultiYear,
                  children: [
                    {
                      name: "policyOutput.laborSupplyImpact.earnings.overall.relative",
                      label: "Relative",
                      disabled: isMultiYear,
                    },
                    {
                      name: "policyOutput.laborSupplyImpact.earnings.overall.absolute",
                      label: "Absolute",
                      disabled: isMultiYear,
                    },
                  ],
                },
                {
                  name: "policyOutput.laborSupplyImpact.earnings.byDecile",
                  label: "By decile",
                  disabled: isMultiYear,
                  children: [
                    {
                      name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative",
                      label: "Relative",
                      disabled: isMultiYear,
                      children: [
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.total",
                          label: "Total",
                          disabled: isMultiYear,
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.income",
                          label: "Income effect",
                          disabled: isMultiYear,
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.relative.substitution",
                          label: "Substitution effect",
                          disabled: isMultiYear,
                        },
                      ],
                    },
                    {
                      name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute",
                      label: "Absolute",
                      disabled: isMultiYear,
                      children: [
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.total",
                          label: "Total",
                          disabled: isMultiYear,
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.income",
                          label: "Income effect",
                          disabled: isMultiYear,
                        },
                        {
                          name: "policyOutput.laborSupplyImpact.earnings.byDecile.absolute.substitution",
                          label: "Substitution effect",
                          disabled: isMultiYear,
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
          disabled: isMultiYear,
        },
        {
          name: "policyOutput.codeReproducibility",
          label: "Reproduce in Python",
          disabled: isMultiYear,
        },
      ].filter((x) => x),
    },
  ];

  return tree;
}
