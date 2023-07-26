import { useContext } from "react";
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
import { plotLayoutFont } from 'pages/policy/output/utils';

import { convertToCurrencyString } from "./convertToCurrencyString";
import useMobile from "layout/Responsive";
import Screenshottable from "layout/Screenshottable";

export default function BaselineOnlyChart(props) {
  const {
    householdBaseline,
    householdBaselineVariation,
    metadata,
    variable,
    variableLabel,
  } = props;

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
    false
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

  function BaselineOnlyPlot() {
    const mobile = useMobile();
    const {setContent, setCoordinates} = useContext(HoverCardContext);

    const dataHandler = (data) => {
      const point = data.points[0];
      if (
        point.x !== undefined &&
        point.y !== undefined
      ) {
        const plotLeft = point.xaxis.d2p(point.x);
        const left = plotLeft + point.xaxis._offset;
        const top = point.yaxis.d2p(point.y) + point.yaxis._offset;
        if (plotLeft <= point.xaxis._length / 2) {
          setCoordinates(left, top);
        } else {
          setCoordinates(left, top, "bottom-right");
        }
        const variableLabelAmount = convertToCurrencyString(
          metadata.currency,
          point.y
        );
        const employmentIncome = convertToCurrencyString(
          metadata.currency,
          point.x
        );
        const message = `If you earn ${employmentIncome}, your ${variableLabel} will be ${variableLabelAmount}.`;
        setContent({
          title: point.data.name,
          body: message,
        });
      } else {
        const plotLeftMax = point.xaxis.d2p(Math.max(...point.data.x));
        const plotLeftMin = point.xaxis.d2p(Math.min(...point.data.x));
        const top = point.yaxis.d2p((point.yaxis.range[0] + point.yaxis.range.at(-1)) / 2) + point.yaxis._offset;
        if ((plotLeftMin + plotLeftMax) / 2 <= point.xaxis._length / 2) {
          const left = plotLeftMax + point.xaxis._offset;
          setCoordinates(left, top);
        } else {
          const left = plotLeftMin + point.xaxis._offset;
          setCoordinates(left, top, "top-right");
        }
        setContent({
          title: point.data.name,
          body: `Your net income falls after earning 
                ${convertToCurrencyString(
            metadata.currency,
            Math.min(...point.data.x)
          )} until earning 
                ${convertToCurrencyString(
            metadata.currency,
            Math.max(...point.data.x)
          )}.`,
        });
      }
    };

    // Add the main line, then add a 'you are here' line
    return (
      <FadeIn key="baseline">
        <Screenshottable title="Household net income by employment income">
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
              title: "Household head employment income",
              ...getPlotlyAxisFormat(metadata.variables.employment_income.unit),
              tickformat: ",.0f",
              uirevision: metadata.variables.employment_income.unit,
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
              uirevision: metadata.variables[variable].unit,
            },
            legend: {
              // Position above the plot
              y: 1.2,
              orientation: "h",
            },
            ...ChartLogo(mobile ? 0.97 : 1.05, mobile ? -0.25 : -0.17),
            margin: {
              t: 0,
            },
            ...plotLayoutFont
          }}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          style={{
            width: "100%",
          }}
          onClick={dataHandler}
          onHover={dataHandler}
          onUnhover={() => {
            setContent(null);
          }}
        />
        </Screenshottable>
      </FadeIn>
    );
  }

  return (
    <HoverCard>
      <BaselineOnlyPlot/>
    </HoverCard>
  );
}
