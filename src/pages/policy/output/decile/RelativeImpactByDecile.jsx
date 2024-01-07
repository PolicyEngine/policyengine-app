import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import style from "../../../../style";
import { HoverCardContext } from "../../../../layout/HoverCard";
import { ordinal, formatPercent } from "../../../../lang/format";
import { plotLayoutFont } from "../utils";
import React from "react";
import ImpactChart, { relativeChangeMessage } from "../ImpactChart";
import { description, title } from "./common";

export function ImpactPlot(props) {
  const {
    decileType,
    xaxisTitle,
    decileRelative,
    metadata,
    mobile,
    useHoverCard,
  } = props;
  const setHoverCard = useContext(HoverCardContext);
  const formatPer = (n) =>
    formatPercent(n, metadata.countryId, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  const hoverMessage = (x, y) => {
    const obj = `the income of households in the ${ordinal(x)} ${decileType}`;
    return relativeChangeMessage("This reform", obj, y, 0.001, metadata);
  };
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
            (value) => (value >= 0 ? "+" : "") + formatPer(value),
          ),
          textangle: 0,
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: xArray.map((x, i) => {
                  const y = yArray[i];
                  return hoverMessage(x, y);
                }),
                hovertemplate: `<b>Decile %{x}</b><br><br>%{customdata}<extra></extra>`,
              }),
        },
      ]}
      layout={{
        xaxis: {
          title: xaxisTitle,
          tickvals: Object.keys(decileRelative),
        },
        yaxis: {
          title: "Relative change in household income",
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
              setHoverCard({
                title: `Decile ${data.points[0].x}`,
                body: hoverMessage(data.points[0].x, data.points[0].y),
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

export default function relativeImpactByDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const decileRelative = impact.decile.relative;
  const relativeChange =
    -impact.budget.budgetary_impact / impact.budget.baseline_net_income;
  const chart = (
    <ImpactChart
      title={title(policyLabel, relativeChange, false, metadata)}
      description={description(metadata.countryId, false)}
    >
      <ImpactPlot
        decileType={"decile"}
        xaxisTitle={"Income decile"}
        decileRelative={decileRelative}
        metadata={metadata}
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
