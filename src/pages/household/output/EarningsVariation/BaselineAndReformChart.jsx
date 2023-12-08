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
import HoverCard, { HoverCardContext } from "../../../../layout/HoverCard";
import { convertToCurrencyString } from "./convertToCurrencyString";
import { plotLayoutFont } from "pages/policy/output/utils";
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
    metadata,
  );
  const baselineArray = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaselineVariation,
    metadata,
  );
  const reformArray = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdReformVariation,
    metadata,
  );
  const currentEarnings = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdBaseline,
    metadata,
  );
  const currentValue = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdReform,
    metadata,
  );
  const baselineValue = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaseline,
    metadata,
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
    const plot = showDelta ? (
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
    );
    return (
      <>
        {toggle}
        <HoverCard>{plot}</HoverCard>
      </>
    );
  }

  return <BaselineAndReformChartWithToggle />;
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
    baselineValue,
    useHoverCard = false,
  } = props;
  const cliffs1 =
    variable === "household_net_income"
      ? getCliffs(baselineArray, earningsArray, false, "$", useHoverCard)
      : [];
  const cliffs2 =
    variable === "household_net_income"
      ? getCliffs(reformArray, earningsArray, true, "$", useHoverCard)
      : [];
  const x1 = cliffs1.reduce((p, cliff) => p.concat(cliff.x), []);
  const y1 = cliffs1.reduce((p, cliff) => p.concat(cliff.y), []);
  const x2 = cliffs2.reduce((p, cliff) => p.concat(cliff.x), []);
  const y2 = cliffs2.reduce((p, cliff) => p.concat(cliff.y), []);
  const x3 = earningsArray;
  const y3 = baselineArray;
  const y4 = reformArray;
  const x4 = [currentEarnings];
  const y5 = [currentValue];
  const y6 = [baselineValue];
  const xaxisValues = x1.concat(x2, x3, x4);
  const yaxisValues = y1.concat(y2, y3, y4, y5, y6);
  let data = [
    ...cliffs1,
    ...cliffs2,
    {
      x: x3,
      y: y3,
      type: "line",
      name: `Baseline ${variableLabel}`,
      line: {
        color: style.colors.MEDIUM_DARK_GRAY,
      },
      ...(useHoverCard
        ? {
            hoverinfo: "none",
          }
        : {
            hovertemplate:
              `<b>Baseline ${variableLabel}</b><br><br>` +
              `If you earn %{x}, your baseline<br>` +
              `${variableLabel} will be %{y}.` +
              `<extra></extra>`,
          }),
    },
    {
      x: x3,
      y: y4,
      type: "line",
      name: `Reform ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
      ...(useHoverCard
        ? {
            hoverinfo: "none",
          }
        : {
            hovertemplate:
              `<b>Reform ${variableLabel}</b><br><br>` +
              `If you earn %{x}, your reform<br>` +
              `${variableLabel} will be %{y}.` +
              `<extra></extra>`,
          }),
    },
    {
      x: x4,
      y: y5,
      type: "scatter",
      mode: "markers",
      name: `Your reform ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
      ...(useHoverCard
        ? {
            hoverinfo: "none",
          }
        : {
            hovertemplate:
              `<b>Your reform ${variableLabel}</b><br><br>` +
              `If you earn %{x}, your reform<br>` +
              `${variableLabel} will be %{y}.` +
              `<extra></extra>`,
          }),
    },
    {
      x: x4,
      y: y6,
      type: "scatter",
      mode: "markers",
      name: `Your baseline ${variableLabel}`,
      line: {
        color: style.colors.MEDIUM_DARK_GRAY,
      },
      ...(useHoverCard
        ? {
            hoverinfo: "none",
          }
        : {
            hovertemplate:
              `<b>Your baseline ${variableLabel}</b><br><br>` +
              `If you earn %{x}, your baseline<br>` +
              `${variableLabel} will be %{y}.` +
              `<extra></extra>`,
          }),
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
            ...getPlotlyAxisFormat(
              metadata.variables.employment_income.unit,
              xaxisValues,
            ),
            uirevision: metadata.variables.employment_income.unit,
          },
          yaxis: {
            title: capitalize(variableLabel),
            ...getPlotlyAxisFormat(
              metadata.variables[variable].unit,
              yaxisValues,
            ),
            uirevision: metadata.variables.household_net_income.unit,
          },
          ...(useHoverCard
            ? {}
            : {
                hoverlabel: {
                  align: "left",
                  bgcolor: "#FFF",
                  font: { size: "16" },
                },
              }),
          legend: {
            // Position above the plot
            y: 1.2,
            orientation: "h",
          },
          ...ChartLogo(mobile ? 0.97 : 1.05, mobile ? -0.25 : -0.17),
          ...plotLayoutFont,
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: "100%",
        }}
        {...(useHoverCard
          ? {
              onHover: (data) => {
                if (
                  data.points[0].x !== undefined &&
                  data.points[0].y !== undefined
                ) {
                  const variableLabelAmount = convertToCurrencyString(
                    metadata.currency,
                    data.points[0].y,
                  );
                  const employmentIncome = convertToCurrencyString(
                    metadata.currency,
                    data.points[0].x,
                  );
                  const message = `If you earn ${employmentIncome}, your ${
                    data.points[0].data.name
                      .toLocaleLowerCase()
                      .includes("reform")
                      ? "reform"
                      : "baseline"
                  } ${variableLabel} will be ${variableLabelAmount}.`;
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
                Math.min(...data.points[0].data.x),
              )} until earning 
              ${convertToCurrencyString(
                metadata.currency,
                Math.max(...data.points[0].data.x),
              )} in the 
              ${
                data.points[0].data.name.includes("reform")
                  ? "reform"
                  : "baseline"
              } scenario.`,
                  });
                }
              },
              onUnhover: () => {
                setHoverCard(null);
              },
            }
          : {})}
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
    useHoverCard = false,
  } = props;
  const x1 = earningsArray;
  const y1 = reformArray.map((value, index) => value - baselineArray[index]);
  const x2 = [currentEarnings];
  const y2 = [currentValue - baselineValue];
  const xaxisValues = x1.concat(x2);
  const yaxisValues = y1.concat(y2);
  let data = [
    {
      x: x1,
      y: y1,
      type: "line",
      name: `Change in ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
      ...(useHoverCard
        ? {
            hoverinfo: "none",
          }
        : {
            hovertemplate:
              `<b>Change in ${variableLabel}</b><br><br>` +
              `If you earn %{x}, your change in<br>` +
              `${variableLabel} will be %{y}.` +
              `<extra></extra>`,
          }),
    },
    {
      x: x2,
      y: y2,
      type: "scatter",
      mode: "markers",
      name: `Your current change in ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
      ...(useHoverCard
        ? {
            hoverinfo: "none",
          }
        : {
            hovertemplate:
              `<b>Your current change in ${variableLabel}</b><br><br>` +
              `If you earn %{x}, your change in<br>` +
              `${variableLabel} will be %{y}.` +
              `<extra></extra>`,
          }),
    },
  ];
  const plotObject = (
    <Screenshottable
      title={`Change to household net income by employment income`}
    >
      <Plot
        data={data}
        key="reform"
        layout={{
          xaxis: {
            title: "Household head employment income",
            ...getPlotlyAxisFormat(
              metadata.variables.employment_income.unit,
              xaxisValues,
            ),
            uirevision: metadata.variables.employment_income.unit,
          },
          yaxis: {
            title: `Change in ${variableLabel}`,
            ...getPlotlyAxisFormat(
              metadata.variables[variable].unit,
              yaxisValues,
            ),
            uirevision: metadata.variables[variable].unit,
          },
          ...(useHoverCard
            ? {}
            : {
                hoverlabel: {
                  align: "left",
                  bgcolor: "#FFF",
                  font: { size: "16" },
                },
              }),
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
        {...(useHoverCard
          ? {
              onHover: (data) => {
                if (
                  data.points[0].x !== undefined &&
                  data.points[0].y !== undefined
                ) {
                  const variableLabelAmount = convertToCurrencyString(
                    metadata.currency,
                    data.points[0].y,
                  );
                  const employmentIncome = convertToCurrencyString(
                    metadata.currency,
                    data.points[0].x,
                  );
                  const message = `If you earn ${employmentIncome}, your change in ${variableLabel} will be ${variableLabelAmount}.`;
                  setHoverCard({
                    title: data.points[0].data.name,
                    body: message,
                  });
                }
              },
              onUnhover: () => {
                setHoverCard(null);
              },
            }
          : {})}
      />
    </Screenshottable>
  );

  return <FadeIn>{plotObject}</FadeIn>;
}
