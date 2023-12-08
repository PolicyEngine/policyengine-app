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
import HoverCard, { HoverCardContext } from "../../../../layout/HoverCard";
import { plotLayoutFont } from "pages/policy/output/utils";

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
    metadata,
  );
  const baselineArray = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaselineVariation,
    metadata,
    false,
  );
  const currentEarnings = getValueFromHousehold(
    "employment_income",
    "2023",
    "you",
    householdBaseline,
    metadata,
  );
  const currentBaseline = getValueFromHousehold(
    variable,
    "2023",
    null,
    householdBaseline,
    metadata,
  );

  function BaselineOnlyPlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const mobile = useMobile();
    const { useHoverCard = false } = props;
    const cliffs =
      variable === "household_net_income"
        ? getCliffs(baselineArray, earningsArray, false, "$", useHoverCard)
        : [];
    const x1 = cliffs.reduce((p, cliff) => p.concat(cliff.x), []);
    const y1 = cliffs.reduce((p, cliff) => p.concat(cliff.y), []);
    const x2 = earningsArray;
    const y2 = baselineArray;
    const x3 = [currentEarnings];
    const y3 = [currentBaseline];
    const xaxisValues = x1.concat(x2, x3);
    const yaxisValues = y1.concat(y2, y3);

    // Add the main line, then add a 'you are here' line
    return (
      <FadeIn key="baseline">
        <Screenshottable title="Household net income by employment income">
          <Plot
            key="baseline"
            data={[
              ...cliffs,
              {
                x: x2,
                y: y2,
                type: "line",
                name: capitalize(variableLabel),
                line: {
                  color: style.colors.BLUE,
                },
                ...(useHoverCard
                  ? {
                      hoverinfo: "none",
                    }
                  : {
                      hovertemplate:
                        `<b>${capitalize(variableLabel)}</b><br><br>` +
                        `If you earn %{x}, your<br>` +
                        `${variableLabel} will be %{y}.` +
                        `<extra></extra>`,
                    }),
              },
              {
                x: x3,
                y: y3,
                type: "line",
                mode: "markers",
                name: `Your current ${variableLabel}`,
                line: {
                  color: style.colors.BLUE,
                },
                ...(useHoverCard
                  ? {
                      hoverinfo: "none",
                    }
                  : {
                      hovertemplate:
                        `<b>Your current ${variableLabel}</b><br><br>` +
                        `If you earn %{x}, your<br>` +
                        `${variableLabel} will be %{y}.` +
                        `<extra></extra>`,
                    }),
              },
            ]}
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
                title: {
                  text: capitalize(variableLabel),
                },
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
              ...ChartLogo(mobile ? 0.97 : 1.05, mobile ? -0.25 : -0.17),
              margin: {
                t: 0,
              },
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
                      const message = `If you earn ${employmentIncome}, your ${variableLabel} will be ${variableLabelAmount}.`;
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
                )}.`,
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
      </FadeIn>
    );
  }

  return (
    <HoverCard>
      <BaselineOnlyPlot />
    </HoverCard>
  );
}
