import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";
import { HoverCardContext } from "../../../layout/HoverCard";
import { cardinal, percent } from "../../../api/language";
import { plotLayoutFont } from "./utils";
import React from "react";
import ImpactChart, { impactTitle } from "./ImpactChart";

function ImpactPlot(props) {
  const { decileRelative, mobile, useHoverCard } = props;
  const setHoverCard = useContext(HoverCardContext);
  const xArray = Object.keys(decileRelative);
  const yArray = Object.values(decileRelative);
  // Decile bar chart. Bars are grey if negative, green if positive.
  return (
    <Plot
      data={[
        {
          x: xArray,
          y: yArray,
          type: "bar",
          marker: {
            color: yArray.map((value) =>
              value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
            ),
          },
          text: yArray.map(
            (value) =>
              (value >= 0 ? "+" : "") +
              (value * 100).toFixed(1).toString() +
              "%",
          ),
          textangle: 0,
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: xArray.map((x, i) => {
                  const decile = cardinal(x);
                  const relativeChange = yArray[i];
                  return relativeChange > 0.001
                    ? `This reform would raise the income<br>of households in the ${decile} decile<br>by an average of ${percent(
                        relativeChange,
                      )}.`
                    : relativeChange < -0.001
                      ? `This reform would lower the income<br>of households in the ${decile} decile<br>by an average of ${percent(
                          -relativeChange,
                        )}.`
                      : relativeChange === 0
                        ? `This reform would not impact the income<br>of households in the ${decile} decile.`
                        : (relativeChange > 0
                            ? "This reform would raise "
                            : "This reform would lower ") +
                          `the income<br>of households in the ${decile} decile<br>by less than 0.1%.`;
                }),
                hovertemplate: `<b>Decile %{x}</b><br><br>%{customdata}<extra></extra>`,
              }),
        },
      ]}
      layout={{
        xaxis: {
          title: "Income decile",
          tickvals: Object.keys(decileRelative),
        },
        yaxis: {
          title: "Relative change",
          tickformat: "+,.0%",
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
        uniformtext: {
          mode: "hide",
          minsize: 8,
        },
        showlegend: false,
        ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
        margin: {
          t: 0,
          b: 80,
          r: 20,
          l: 60,
        },
        height: mobile ? 300 : 500,
        ...plotLayoutFont,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
        marginBottom: !mobile && 50,
      }}
      {...(useHoverCard
        ? {
            onHover: (data) => {
              const decile = cardinal(data.points[0].x);
              const relativeChange = data.points[0].y;
              const message =
                relativeChange > 0.001
                  ? `This reform would raise the income of households in the ${decile} decile by an average of ${percent(
                      relativeChange,
                    )}.`
                  : relativeChange < -0.001
                    ? `This reform would lower the income of households in the ${decile} decile by an average of ${percent(
                        -relativeChange,
                      )}.`
                    : relativeChange === 0
                      ? `This reform would not impact the income of households in the ${decile} decile.`
                      : (relativeChange > 0
                          ? "This reform would raise "
                          : "This reform would lower ") +
                        ` the income of households in the ${decile} decile by less than 0.1%.`;
              setHoverCard({
                title: `Decile ${data.points[0].x}`,
                body: message,
              });
            },
            onUnhover: () => {
              setHoverCard(null);
            },
          }
        : {})}
    />
  );
}

const description = (
  <p>
    The chart above shows the relative change in income for each income decile.
    Households are sorted into ten equally-populated groups according to their
    equivalised household net income.
  </p>
);

export default function relativeImpactByDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const decileRelative = impact.decile.relative;
  const averageImpact =
    -impact.budget.budgetary_impact / impact.budget.baseline_net_income;
  const title = impactTitle(
    policyLabel,
    averageImpact,
    formatVariableValue({ unit: "/1" }, Math.abs(averageImpact), 1),
    "the net income of households",
    "on average",
    metadata,
  );
  const chart = (
    <ImpactChart title={title} description={description}>
      <ImpactPlot
        decileRelative={decileRelative}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    const header = ["Income Decile", "Relative Change"];
    const data = [
      header,
      ...Object.entries(decileRelative).map(([decile, relativeChange]) => {
        return [decile, relativeChange];
      }),
    ];
    return data;
  };
  return { chart: chart, csv: csv };
}
