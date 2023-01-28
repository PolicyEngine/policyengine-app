const POLICY_OUTPUT_TREE = [
  {
    name: "policyOutput",
    label: "Policy impact",
    children: [
      {
        name: "policyOutput.netIncome",
        label: "Budgetary impact",
      },
      {
        name: "policyOutput.decileRelativeImpact",
        label: "Relative impact by decile",
      },
      {
        name: "policyOutput.decileAverageImpact",
        label: "Average impact by decile",
      },
      {
        name: "policyOutput.intraDecileImpact",
        label: "Outcomes by income decile",
      },
      {
        name: "policyOutput.povertyImpact",
        label: "Poverty impact",
      },
      {
        name: "policyOutput.deepPovertyImpact",
        label: "Deep poverty impact",
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
        name: "policyOutput.macroImpact",
        label: "Macro impact",
      },
      {
        name: "policyOutput.codeReproducibility",
        label: "Reproduce in Python",
      },
    ],
  },
];

export default POLICY_OUTPUT_TREE;
