import { formatCurrencyAbbr } from "../../../../lang/format";
import {
  LaborSupplyDecileIncome,
  LaborSupplyDecileSubstitution,
  LaborSupplyDecileTotal,
} from "./LaborSupplyDecileCharts";

export function LaborSupplyDecileAbsoluteImpactIncome(props) {
  const { policyLabel, impact, countryId } = props;

  const decileImpact = impact.labor_supply_response;

  const data = decileImpact.decile.average;

  const incomeChanges = Object.values(data.income).slice(0, 10);

  const title = `${policyLabel}'s income effect-driven absolute ${countryId === "us" ? "labor" : "labour"} supply impact by decile`;
  const description =
    "This chart shows the estimated income effect-driven absolute " +
    `change in earnings (in ${countryId === "uk" ? "pounds" : "dollars"}) ` +
    "for each disposable income decile.";
  const yAxisTitle = "Change in earnings";
  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatCurrencyAbbr(value, countryId, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  };

  const chart = (
    <LaborSupplyDecileIncome
      title={title}
      incomeChanges={incomeChanges}
      countryId={countryId}
      description={description}
      yAxisTitle={yAxisTitle}
      numberFormatter={numberFormatter}
      yAxisTickFormat="$,.0f"
    />
  );

  return { chart: chart, csv: () => {} };
}

export function LaborSupplyDecileAbsoluteImpactSubstitution(props) {
  const { policyLabel, impact, countryId } = props;

  const decileImpact = impact.labor_supply_response;

  const data = decileImpact.decile.average;

  let substitutionChanges = Object.values(data.substitution).slice(0, 10);

  const title = `${policyLabel}'s substitution effect-driven absolute ${countryId === "us" ? "labor" : "labour"} supply impact by decile`;
  const description =
    "This chart shows the estimated substitution effect-driven " +
    `absolute change in earnings (in ${countryId === "uk" ? "pounds" : "dollars"}) ` +
    "for each disposable income decile.";
  const yAxisTitle = "Change in earnings";
  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatCurrencyAbbr(value, countryId, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  };
  const chart = (
    <LaborSupplyDecileSubstitution
      title={title}
      substitutionChanges={substitutionChanges}
      countryId={countryId}
      description={description}
      yAxisTitle={yAxisTitle}
      numberFormatter={numberFormatter}
      yAxisTickFormat="$,.0f"
    />
  );

  return { chart: chart, csv: () => {} };
}

export function LaborSupplyDecileAbsoluteImpactTotal(props) {
  const { policyLabel, impact, countryId } = props;

  const decileImpact = impact.labor_supply_response;

  const data = decileImpact.decile.average;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const title = `${policyLabel}'s absolute ${countryId === "us" ? "labor" : "labour"} supply impact by decile`;
  const description =
    "This chart shows the estimated total absolute change in earnings (in " +
    `${countryId === "uk" ? " pounds" : " dollars"}) for each disposable ` +
    "income decile.";
  const yAxisTitle = "Change in earnings";
  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatCurrencyAbbr(value, countryId, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  };

  const chart = (
    <LaborSupplyDecileTotal
      title={title}
      overallChange={overallChange}
      countryId={countryId}
      description={description}
      yAxisTitle={yAxisTitle}
      numberFormatter={numberFormatter}
      yAxisTickFormat="$,.0f"
    />
  );

  return { chart: chart, csv: () => {} };
}
