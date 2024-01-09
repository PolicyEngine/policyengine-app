import { useContext, useState } from "react";
import { Radio } from "antd";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { capitalize, localeCode } from "../../../../lang/format";
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
    year
  } = props;

  const earningsArray = getValueFromHousehold(
    "employment_income",
    year,
    "you",
    householdBaselineVariation,
    metadata,
  );
  const baselineArray = getValueFromHousehold(
    variable,
    year,
    null,
    householdBaselineVariation,
    metadata,
  );
  const reformArray = getValueFromHousehold(
    variable,
    year,
    null,
    householdReformVariation,
    metadata,
  );
  const currentEarnings = getValueFromHousehold(
    "employment_income",
    year,
    "you",
    householdBaseline,
    metadata,
  );
  const currentValue = getValueFromHousehold(
    variable,
    year,
    null,
    householdReform,
    metadata,
  );
  const baselineValue = getValueFromHousehold(
    variable,
    year,
    null,
    householdBaseline,
    metadata,
  );
  function BaselineAndReformChartWithToggle() {
    const [viewMode, setViewMode] = useState("absoluteChange");

    const options = [
      {
        label: "Baseline and reform",
        value: "baselineAndReform",
      },
      {
        label: "Absolute change",
        value: "absoluteChange",
      },
      {
        label: "Relative change",
        value: "relativeChange",
      },
    ];

    const onViewModeChange = ({ target: { value } }) => {
      setViewMode(value);
    };

    const toggle = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Radio.Group
          options={options}
          onChange={onViewModeChange}
          value={viewMode}
          buttonStyle="solid"
        />
      </div>
    );

    const getPlotComponent = (viewMode, sharedProps) => {
      switch (viewMode) {
        case "baselineAndReform":
          return <BaselineAndReformTogetherPlot {...sharedProps} />;
        case "absoluteChange":
          return (
            <BaselineReformDeltaPlot {...sharedProps} showPercentage={false} />
          );
        case "relativeChange":
          return (
            <BaselineReformDeltaPlot {...sharedProps} showPercentage={true} />
          );
        default:
          return <div>Unknown view mode</div>;
      }
    };

    let sharedProps = {
      earningsArray,
      baselineArray,
      reformArray,
      currentEarnings,
      currentValue,
      baselineValue,
      variableLabel,
      metadata,
      variable,
      policy,
    };

    let plot = getPlotComponent(viewMode, sharedProps);

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
  const yaxisFormat = getPlotlyAxisFormat(
    metadata.variables[variable].unit,
    baselineArray.concat(reformArray, currentValue, baselineValue),
  );
  const cliffs1 =
    variable === "household_net_income"
      ? getCliffs(
          baselineArray,
          earningsArray,
          yaxisFormat.range,
          false,
          "$",
          useHoverCard,
        )
      : [];
  const cliffs2 =
    variable === "household_net_income"
      ? getCliffs(
          reformArray,
          earningsArray,
          yaxisFormat.range,
          true,
          "$",
          useHoverCard,
        )
      : [];
  let data = [
    ...cliffs1,
    ...cliffs2,
    {
      x: earningsArray,
      y: baselineArray,
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
      x: earningsArray,
      y: reformArray,
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
      x: [currentEarnings],
      y: [currentValue],
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
      x: [currentEarnings],
      y: [baselineValue],
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
              earningsArray.concat(currentEarnings),
            ),
            uirevision: metadata.variables.employment_income.unit,
          },
          yaxis: {
            title: capitalize(variableLabel),
            ...yaxisFormat,
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
          locale: localeCode(metadata.countryId),
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
    showPercentage,
  } = props;
  // Calculate delta values
  const deltaArray = reformArray.map(
    (value, index) => value - baselineArray[index],
  );
  // Calculate percentage differences, avoiding divide by zero
  const percentageDeltaArray = reformArray.map((value, index) => {
    const baselineValue = baselineArray[index];
    return baselineValue !== 0 ? (value - baselineValue) / baselineValue : null;
  });
  const currentDelta = currentValue - baselineValue;
  const currentPercentageDelta = currentDelta / baselineValue;
  let data = [
    {
      x: earningsArray,
      y: showPercentage ? percentageDeltaArray : deltaArray,
      type: "line",
      name: `Change in ${variableLabel}`,
      line: {
        color: style.colors.BLUE,
      },
      hoverinfo: "text",
      text: earningsArray.map((earnings, index) => {
        const deltaValue = showPercentage
          ? percentageDeltaArray[index]
          : deltaArray[index];
        const formattedEarnings = convertToCurrencyString(
          metadata.currency,
          earnings,
        );

        if (deltaValue === 0) {
          return `If you earn ${formattedEarnings}, your ${variableLabel} will have no change.`;
        } else {
          const direction = deltaValue > 0 ? "rise" : "fall";
          const absoluteDeltaValue = Math.abs(deltaValue);
          const formattedDelta = showPercentage
            ? `${(absoluteDeltaValue * 100).toFixed(1)}%`
            : convertToCurrencyString(metadata.currency, absoluteDeltaValue);
          return `If you earn ${formattedEarnings}, your ${variableLabel} will ${direction} by ${formattedDelta}.`;
        }
      }),
    },
    {
      x: [currentEarnings],
      // Apply delta or % delta based on selection.
      y: showPercentage ? [currentPercentageDelta] : [currentDelta],
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
              earningsArray.concat(currentEarnings),
            ),
            uirevision: metadata.variables.employment_income.unit,
          },
          yaxis: {
            title: showPercentage
              ? `Relative change in ${variableLabel}`
              : `Absolute change in ${variableLabel}`,
            tickformat: showPercentage ? ".0%" : ".2s",
            ...getPlotlyAxisFormat(
              showPercentage ? "%" : metadata.variables[variable].unit,
              showPercentage
                ? percentageDeltaArray
                : deltaArray.concat(currentDelta),
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
          locale: localeCode(metadata.countryId),
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
