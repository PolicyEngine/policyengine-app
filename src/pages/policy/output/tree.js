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

  // Add policy breakdown page, which doesn't have charts or CSVs, and thus
  // can't be added as an impact chart component like the others above
  children.unshift({
    name: "policyOutput.policyBreakdown",
    label: "Reform impact breakdown"
  });
  return [
    {
      name: "policyOutput",
      label: "Policy impact",
      children: children,
    },
  ];
}
