import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { capitalize } from "../../../../api/language";
import {
  getPlotlyAxisFormat,
  getValueFromHousehold,
} from "../../../../api/variables";
import FadeIn from "../../../../layout/FadeIn";
import style from "../../../../style";
import { getCliffs } from "./cliffs";
import HoverCard from "../../../../layout/HoverCard";

export default function BaselineOnlyChart(props) {
  const {
    householdBaseline,
    householdBaselineVariation,
    metadata,
    variable,
    variableLabel,
  } = props;
  const [hovercard, setHoverCard] = useState(null);

  const earningsArray = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdBaselineVariation,
    metadata
  );
  const netIncomeArray = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaselineVariation,
    metadata,
    true
  );
  const currentEarnings = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdBaseline,
    metadata
  );
  const currentNetIncome = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaseline,
    metadata
  );
  // Add the main line, then add a 'you are here' line
  const plot = (
    <FadeIn key="baseline">
      <Plot
        key="baseline"
        data={[
          ...(variable === "household_net_income"
            ? getCliffs(netIncomeArray, earningsArray)
            : []),
          {
            x: earningsArray,
            y: netIncomeArray,
            type: "line",
            name: capitalize(variableLabel),
            line: {
              color: style.colors.BLUE,
            },
            hoverinfo: "none",
          },
          {
            x: [currentEarnings, currentEarnings],
            y: [0, currentNetIncome],
            type: "line",
            name: `Your current ${variableLabel}`,
            line: {
              color: style.colors.MEDIUM_DARK_GRAY,
            },
            hoverinfo: "none",
          },
        ]}
        layout={{
          xaxis: {
            title: "Employment income",
            ...getPlotlyAxisFormat(metadata.variables.employment_income.unit),
            tickformat: ",.0f",
          },
          yaxis: {
            title: {
              text: capitalize(variableLabel),
            },
            ...getPlotlyAxisFormat(
              metadata.variables[variable].unit,
              0,
              null,
              metadata.variables[variable].valueType
            ),
            tickformat: ",.0f",
          },
          legend: {
            // Position above the plot
            y: 1.2,
            orientation: "h",
          },
          ...ChartLogo,
          margin: {
            t: 0,
          },
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: "100%",
        }}
        onHover={(data) => {
          // console.log(metadata, metadata.variables)
          const netIncome = 
            metadata.currency + 
            data.points[0].y?.toLocaleString("en-GB", { maximumFractionDigits: 0 });
          const employmentIncome = 
            metadata.currency + 
            data.points[0].x?.toLocaleString("en-GB", { maximumFractionDigits: 0 });
          const message = `If you earn ${employmentIncome}, your ${variableLabel} will be ${netIncome}.`
            if (data.points[0].x && data.points[0].y) {
              setHoverCard({
                title: data.points[0].y === currentNetIncome
                ? `Your current ${variableLabel}` 
                : capitalize(variableLabel),
                body: message,
              });
            }
        }}
      />
    </FadeIn>
  );
  return <HoverCard content={hovercard}>{plot}</HoverCard>
}
