import { useContext, useState } from "react";
import { Radio } from "antd";
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
import HoverCard, {HoverCardContext} from "../../../../layout/HoverCard";
import { convertToCurrencyString } from "./convertToCurrencyString";
import { plotLayoutFont } from 'pages/policy/output/utils';
import useMobile from "layout/Responsive";
import Screenshottable from "layout/Screenshottable";

export default function BaselineAndReformChart(props) {
  const {
    householdBaseline,
    householdBaselineVariation,
    householdReform,
    householdReformVariation,
    metadata,
    variable,
    variableLabel,
    policy,
  } = props;

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

  function BaselineAndReformChartWithToggle() {
    const [showDelta, setShowDelta] = useState(false);
    const options = [
      {
        label: "Baseline and reform",
        value: false,
      },
      {
        label: "Difference",
        value: true,
      },
    ];
    const onDelta = ({ target: { value } }) => {
      console.log("checked", value);
      setShowDelta(value);
    };
    const toggle = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Radio.Group
          options={options}
          onChange={onDelta}
          value={showDelta}
          buttonStyle="solid"
        />
      </div>
    );
    const plot = (
      showDelta ? (
        <BaselineReformDeltaPlot
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
        <BaselineAndReformTogetherPlot
          earningsArray={earningsArray}
          baselineArray={baselineArray}
          reformArray={reformArray}
          currentEarnings={currentEarnings}
          currentValue={currentValue}
          baselineValue={baselineValue}
          variableLabel={variableLabel}
          metadata={metadata}
          variable={variable}
          policy={policy}
        />
      )
    );
    return (
      <>
        {toggle}
        <HoverCard>{plot}</HoverCard>
      </>
    );
  }

  return <BaselineAndReformChartWithToggle/>;
}

function BaselineAndReformTogetherPlot(props) {
  const setHoverCard = useContext(HoverCardContext);
  const mobile = useMobile();
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
      hoverinfo: "none",
    },
    {
      x: earningsArray,
      y: reformArray,
      type: "line",
      name: `Reform ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
      hoverinfo: "none",
    },
    {
      x: [currentEarnings, currentEarnings],
      y: [0, currentValue],
      type: "line",
      name: `Your current ${variableLabel}`,
      line: {
        color: style.colors.MEDIUM_DARK_GRAY,
      },
      hoverinfo: "none",
    },
  ];
  const plotObject = (
    <Screenshottable title="Household net income by employment income">
    <Plot
      data={data}
      key="reform"
      layout={{
        xaxis: {
          title: "Household head employment income",
          ...getPlotlyAxisFormat(metadata.variables.employment_income.unit, 0),
          tickformat: ",.0f",
          uirevision: metadata.variables.employment_income.unit,
        },
        yaxis: {
          title: capitalize(variableLabel),
          ...getPlotlyAxisFormat(
            metadata.variables.household_net_income.unit,
            0
          ),
          tickformat: ",.0f",
          uirevision: metadata.variables.household_net_income.unit,
        },
        legend: {
          // Position above the plot
          y: 1.2,
          orientation: "h",
        },
        ...ChartLogo(mobile ? 0.97 : 1.05, mobile ? -0.25 : -0.17),
        ...plotLayoutFont
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
      }}
      onHover={(data) => {
        if (data.points[0].x !== undefined && data.points[0].y !== undefined) {
          const variableLabelAmount = convertToCurrencyString(
            metadata.currency,
            data.points[0].y
          );
          const employmentIncome = convertToCurrencyString(
            metadata.currency,
            data.points[0].x
          );
          const message = `If you earn ${employmentIncome}, your reform ${variableLabel} will be ${variableLabelAmount}.`;
          setHoverCard({
            title: data.points[0].data.name,
            body: message,
          });
        } else {
          setHoverCard({
            title: data.points[0].data.name,
            body: `Your net income falls after earning 
              ${convertToCurrencyString(
                metadata.currency,
                Math.min(...data.points[0].data.x)
              )} until earning 
              ${convertToCurrencyString(
                metadata.currency,
                Math.max(...data.points[0].data.x)
              )} in the 
              ${
                data.points[0].data.name.includes("reform")
                  ? "reform"
                  : "baseline"
              } scenario.`,
          });
        }
      }}
      onUnhover={() => {
        setHoverCard(null);
      }}
    />
    </Screenshottable>
  );

  return <FadeIn>{plotObject}</FadeIn>;
}

function BaselineReformDeltaPlot(props) {
  const setHoverCard = useContext(HoverCardContext);
  const mobile = useMobile();
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
      hoverinfo: "none",
    },
    {
      x: [currentEarnings, currentEarnings],
      y: [0, currentValue - baselineValue],
      type: "line",
      name: `Your current change in ${variableLabel}`,
      line: {
        color: style.colors.MEDIUM_DARK_GRAY,
      },
      hoverinfo: "none",
    },
  ];
  const plotObject = (
    <Screenshottable title={`Change to household net income by employment income`}>
    <Plot
      data={data}
      key="reform"
      layout={{
        xaxis: {
          title: "Household head employment income",
          ...getPlotlyAxisFormat(metadata.variables.employment_income.unit, 0),
          tickformat: ",.0f",
          uirevision: metadata.variables.employment_income.unit,
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
          uirevision: metadata.variables[variable].unit,
        },
        legend: {
          // Position above the plot
          y: 1.2,
          orientation: "h",
        },
        margin: {
          t: 0,
        },
        ...plotLayoutFont,
        ...ChartLogo(mobile ? 0.97 : 1.05, mobile ? -0.25 : -0.17),
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
        marginTop: "3rem",
      }}
      onHover={(data) => {
        if (data.points[0].x !== undefined && data.points[0].y !== undefined) {
          const variableLabelAmount = convertToCurrencyString(
            metadata.currency,
            data.points[0].y
          );
          const employmentIncome = convertToCurrencyString(
            metadata.currency,
            data.points[0].x
          );
          const message = `If you earn ${employmentIncome}, your change in ${variableLabel} will be ${variableLabelAmount}.`;
          setHoverCard({
            title: data.points[0].data.name,
            body: message,
          });
        }
      }}
      onUnhover={() => {
        setHoverCard(null);
      }}
    /></Screenshottable>
  );

  return <FadeIn>
      {plotObject}
  </FadeIn>;
}
