import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import {
  ordinal,
  localeCode,
  formatCurrency,
  precision,
} from "../../../../lang/format";
import { HoverCardContext } from "../../../../components/HoverCard";
import style from "../../../../style";
import { plotLayoutFont } from "../utils";
import React from "react";
import ImpactChart, { absoluteChangeMessage } from "../ImpactChart";
import { description, title } from "./common";

export function ImpactPlot(props) {
  const {
    decileType,
    xaxisTitle,
    decileAverage,
    metadata,
    mobile,
    useHoverCard,
  } = props;
  const setHoverCard = useContext(HoverCardContext);
  const xArray = Object.keys(decileAverage);
  const yArray = Object.values(decileAverage);
  let yvaluePrecision = precision(yArray, 1);
  if (yvaluePrecision > 0) {
    yvaluePrecision = Math.max(2, yvaluePrecision);
  }
  const ytickPrecision = precision(yArray.concat(0), 1);
  const formatCur = (y) =>
    formatCurrency(y, metadata.countryId, {
      minimumFractionDigits: yvaluePrecision,
      maximumFractionDigits: yvaluePrecision,
    });
  const hoverMessage = (x, y) =>
    absoluteChangeMessage(
      "This reform",
      `the income of households in the ${ordinal(x)} ${decileType}`,
      y,
      0,
      formatCur,
    );
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
          text: yArray.map(formatCur),
          textangle: 0,
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: xArray.map((x, i) => hoverMessage(x, yArray[i])),
                hovertemplate: `<b>Decile %{x}</b><br><br>%{customdata}<extra></extra>`,
              }),
        },
      ]}
      layout={{
        xaxis: {
          title: xaxisTitle,
          tickvals: Object.keys(decileAverage),
        },
        yaxis: {
          title: "Average change in household income",
          tickformat: `$,.${ytickPrecision}f`,
          fixedrange: true,
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
        showlegend: false,
        uniformtext: {
          mode: "hide",
          minsize: mobile ? 4 : 8,
        },
        ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
        margin: {
          t: 0,
          b: 80,
          l: 60,
          r: 20,
        },
        height: mobile ? 300 : 500,
        ...plotLayoutFont,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
        locale: localeCode(metadata.countryId),
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

export default function averageImpactByDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const decileAverage = impact.decile.average;
  const averageChange =
    -impact.budget.budgetary_impact / impact.budget.households;
  const chart = (
    <ImpactChart
      title={title(policyLabel, averageChange, true, metadata)}
      description={description(metadata.countryId, false)}
    >
      <ImpactPlot
        decileType={"decile"}
        xaxisTitle={"Income decile"}
        decileAverage={decileAverage}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    const data = Object.entries(decileAverage).map(([key, value]) => [
      `Decile ${key}`,
      value,
    ]);
    return data;
  };
  return { chart: chart, csv: csv };
}
