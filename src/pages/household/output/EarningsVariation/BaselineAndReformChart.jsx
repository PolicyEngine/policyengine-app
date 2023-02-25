import { Switch } from "antd";
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

export default function BaselineAndReformChart(props) {
  const {
    householdBaseline,
    householdBaselineVariation,
    householdReform,
    householdReformVariation,
    metadata,
    variable,
    variableLabel,
  } = props;
  const [showDelta, setShowDelta] = useState(false);
  const toggle = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={{ marginRight: 10 }}>Show baseline and reform</span>
      <Switch
        checked={showDelta}
        onChange={(checked) => setShowDelta(checked)}
      />
      <span style={{ marginLeft: 10 }}>Show difference</span>
    </div>
  );
  const earningsArray = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdBaselineVariation,
    metadata
  );
  const baselineArray = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaselineVariation,
    metadata
  );
  const reformArray = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdReformVariation,
    metadata
  );
  const currentEarnings = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdBaseline,
    metadata
  );
  const currentValue = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdReform,
    metadata
  );
  const baselineValue = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaseline,
    metadata
  );
  return (
    <>
      {toggle}
      {showDelta ? (
        <BaselineReformDeltaChart
          earningsArray={earningsArray}
          baselineArray={baselineArray}
          reformArray={reformArray}
          currentEarnings={currentEarnings}
          currentValue={currentValue}
          baselineValue={baselineValue}
          variableLabel={variableLabel}
          metadata={metadata}
          variable={variable}
        />
      ) : (
        <BaselineAndReformTogetherChart
          earningsArray={earningsArray}
          baselineArray={baselineArray}
          reformArray={reformArray}
          currentEarnings={currentEarnings}
          currentValue={currentValue}
          baselineValue={baselineValue}
          variableLabel={variableLabel}
          metadata={metadata}
          variable={variable}
        />
      )}
    </>
  );
}

function BaselineAndReformTogetherChart(props) {
  const {
    earningsArray,
    baselineArray,
    reformArray,
    currentEarnings,
    currentValue,
    variableLabel,
    metadata,
    variable,
  } = props;
  let data = [
    ...(variable === "household_net_income"
      ? getCliffs(baselineArray, earningsArray)
      : []),
    ...(variable === "household_net_income"
      ? getCliffs(reformArray, earningsArray, true)
      : []),
    {
      x: earningsArray,
      y: baselineArray,
      type: "line",
      name: `Baseline ${variableLabel}`,
      line: {
        color: style.colors.MEDIUM_DARK_GRAY,
      },
    },
    {
      x: earningsArray,
      y: reformArray,
      type: "line",
      name: `Reform ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
    },
    {
      x: [currentEarnings, currentEarnings],
      y: [0, currentValue],
      type: "line",
      name: `Your current ${variableLabel}`,
      line: {
        color: style.colors.MEDIUM_DARK_GRAY,
      },
    },
  ];
  const plotObject = (
    <Plot
      data={data}
      key="reform"
      layout={{
        xaxis: {
          title: "Employment income",
          ...getPlotlyAxisFormat(metadata.variables.employment_income.unit, 0),
          tickformat: ",.0f",
        },
        yaxis: {
          title: capitalize(variableLabel),
          ...getPlotlyAxisFormat(
            metadata.variables.household_net_income.unit,
            0
          ),
          tickformat: ",.0f",
        },
        legend: {
          // Position above the plot
          y: 1.2,
          orientation: "h",
        },
        ...ChartLogo,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
      }}
    />
  );

  return <FadeIn>{plotObject}</FadeIn>;
}

function BaselineReformDeltaChart(props) {
  const {
    earningsArray,
    baselineArray,
    reformArray,
    currentEarnings,
    currentValue,
    baselineValue,
    variableLabel,
    metadata,
    variable,
  } = props;
  let data = [
    {
      x: earningsArray,
      y: reformArray.map((value, index) => value - baselineArray[index]),
      type: "line",
      name: `Change in ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
    },
    {
      x: [currentEarnings, currentEarnings],
      y: [0, currentValue - baselineValue],
      type: "line",
      name: `Your current change in ${variableLabel}`,
      line: {
        color: style.colors.MEDIUM_DARK_GRAY,
      },
    },
  ];
  const plotObject = (
    <Plot
      data={data}
      key="reform"
      layout={{
        xaxis: {
          title: "Employment income",
          ...getPlotlyAxisFormat(metadata.variables.employment_income.unit, 0),
          tickformat: ",.0f",
        },
        yaxis: {
          title: `Change in ${variableLabel}`,
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
    />
  );

  return <FadeIn>{plotObject}</FadeIn>;
}
