import { impactLabels } from "./ImpactTypes";

export function getPolicyOutputTree(countryId) {
  const map = Object.assign({}, impactLabels);
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
