import style from "../../../../style";
import ImpactChart from "../ImpactChart";
import Plot from "react-plotly.js";
import { formatCurrencyAbbr, localeCode } from "../../../../lang/format";
import { ChartLogo } from "../../../../api/charts";
import { plotLayoutFont } from "pages/policy/output/utils";
import { LabourSupplyDecileIncome, LabourSupplyDecileSubstitution, LabourSupplyDecileTotal } from "./LabourSupplyDecileCharts";

export function LabourSupplyDecileAbsoluteImpactIncome(props) {
  const { policyLabel, metadata, impact, countryId } = props;

  const decileImpact = impact.labour_supply_response;

  const data = decileImpact.decile.average;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const title=`${policyLabel}'s income effect-driven absolute labor supply impact by decile`;
  const description="This chart shows the estimated income effect-driven absolute " +
    `change in earnings (in ${countryId === "uk" ? "pounds" : "dollars"}) ` +
    "for each disposable income decile."
  const yAxisTitle="Change in earnings"
  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatCurrencyAbbr(value, countryId, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  }

  const chart = (
    <LabourSupplyDecileIncome
      title={title}
      incomeChanges={incomeChanges}
      countryId={countryId}
      description={description}
      yAxisTitle={yAxisTitle}
      numberFormatter={numberFormatter}
    />);

  return { chart: chart, csv: () => {} };
}

export function LabourSupplyDecileAbsoluteImpactSubstitution(props) {
  const { policyLabel, metadata, impact, countryId } = props;

  const decileImpact = impact.labour_supply_response;

  const data = decileImpact.decile.average;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const title = `${policyLabel}'s substitution effect-driven absolute labor supply impact by decile`;
  const description = "This chart shows the estimated substitution effect-driven " +
    `absolute change in earnings (in ${countryId === "uk" ? "pounds" : "dollars"}) ` +
    "for each disposable income decile."
  const yAxisTitle = "Change in earnings";
  const numberFormatter = (value) => {
    return (
      (value >= 0 ? "+" : "") +
      formatCurrencyAbbr(value, countryId, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  }
  const chart = (
    <LabourSupplyDecileSubstitution
      title={title}
      substitutionChanges={substitutionChanges}
      countryId={countryId}
      description={description}
      yAxisTitle={yAxisTitle}
      numberFormatter={numberFormatter}
    />
  );

  return { chart: chart, csv: () => {} };
}

export function LabourSupplyDecileAbsoluteImpactTotal(props) {
  const { policyLabel, metadata, impact, countryId } = props;

  const decileImpact = impact.labour_supply_response;

  const data = decileImpact.decile.average;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const title = `${policyLabel}'s absolute labor supply impact by decile`;
  const description = "This chart shows the estimated total absolute change in earnings (in " +
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
  }


  const chart = (

    <LabourSupplyDecileTotal
      title={title}
      overallChange={overallChange}
      countryId={countryId}
      description={description}
      yAxisTitle={yAxisTitle}
      numberFormatter={numberFormatter}
    />
  );

  return { chart: chart, csv: () => {} };
}
