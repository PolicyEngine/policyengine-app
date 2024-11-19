import { formatPercent } from "../../../../lang/format";
import {
  LaborSupplyDecileIncome,
  LaborSupplyDecileSubstitution,
  LaborSupplyDecileTotal,
} from "./LaborSupplyDecileCharts";

export function LaborSupplyDecileRelativeImpactIncome(props) {
  const { policyLabel, impact, countryId } = props;

  const decileImpact = impact.labor_supply_response;

  const data = decileImpact.decile.relative;

  const incomeChanges = Object.values(data.income).slice(0, 10);

  const title = `${policyLabel}'s income effect-driven relative ${countryId === "us" ? "labor" : "labour"} supply impact by decile`;
  const description =
    "This chart shows only the income effect-driven portion of " +
    "the estimated relative change in earnings (as a percentage " +
    "of total earnings) for each disposable income decile.";
  const yAxisTitle = "Relative change";

  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatPercent(value, countryId, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
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
      yAxisTickFormat=".1%"
    />
  );

  return { chart: chart, csv: () => {} };
}

export function LaborSupplyDecileRelativeImpactSubstitution(props) {
  const { policyLabel, impact, countryId } = props;

  const decileImpact = impact.labor_supply_response;

  const data = decileImpact.decile.relative;

  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const title = `${policyLabel}'s substitution effect-driven relative ${countryId === "us" ? "labor" : "labour"} supply impact by decile`;
  const description =
    "This chart shows only the substitution effect-driven portion of " +
    "the estimated relative change in earnings (as a percentage " +
    "of total earnings) for each disposable income decile.";
  const yAxisTitle = "Relative change";
  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatPercent(value, countryId, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
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
      yAxisTickFormat=".1%"
    />
  );

  return { chart: chart, csv: () => {} };
}

export function LaborSupplyDecileRelativeImpactTotal(props) {
  const { policyLabel, impact, countryId } = props;

  const decileImpact = impact.labor_supply_response;

  const data = decileImpact.decile.relative;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const title = `${policyLabel}'s relative ${countryId === "us" ? "labor" : "labour"} supply impact by decile`;
  const description =
    "This chart shows the estimated relative change in earnings (as a " +
    "percentage of total earnings) for each disposable income decile.";
  const yAxisTitle = "Relative change";
  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatPercent(value, countryId, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
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
      yAxisTickFormat=".1%"
    />
  );

  return { chart: chart, csv: () => {} };
}
