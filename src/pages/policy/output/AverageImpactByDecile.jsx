import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { cardinal, localeCode, formatCurrency } from "../../../api/language";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "./utils";
import React from "react";
import ImpactChart, { absoluteChangeMessage } from "./ImpactChart";
import { COUNTRY_NAMES } from "pages/statusPageDefaults";

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
  const formatCur = (y) =>
    formatCurrency(y, metadata, { maximumFractionDigits: 0 });
  const hoverMessage = (x, y) =>
    absoluteChangeMessage(
      "This reform",
      `the income of households in the ${cardinal(x)} ${decileType}`,
      y,
      0,
      formatCur,
    );
  const xArray = Object.keys(decileAverage);
  const yArray = Object.values(decileAverage);
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
          title: "Average change",
          tickformat: "$,.0f",
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

export function title(policyLabel, relativeChange, metadata) {
  const term1 = "the net income of households";
  const term2 = formatCurrency(Math.abs(relativeChange), metadata, {
    maximumFractionDigits: 0,
  });
  const signTerm = relativeChange > 0 ? "increase" : "decrease";
  const countryId = metadata.countryId;
  const countryPhrase =
    countryId === "us" || countryId === "uk"
      ? ""
      : `in ${COUNTRY_NAMES(countryId)}`;
  const msg =
    relativeChange === 0
      ? `${policyLabel} would have no effect on ${term1} on average ${countryPhrase}`
      : `${policyLabel} would ${signTerm} ${term1} by ${term2} on average ${countryPhrase}`;
  return msg;
}

const description = (
  <p>
    The chart above shows the relative change in income for each income decile.
    Households are sorted into ten equally-populated groups according to their
    equivalised household net income.
  </p>
);

export default function averageImpactByDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const decileAverage = impact.decile.average;
  const relativeChange =
    -impact.budget.budgetary_impact / impact.budget.households;
  const chart = (
    <ImpactChart
      title={title(policyLabel, relativeChange, metadata)}
      description={description}
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
