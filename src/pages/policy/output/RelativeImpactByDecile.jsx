import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import style from "../../../style";
import { HoverCardContext } from "../../../layout/HoverCard";
import { cardinal, formatPercent } from "../../../api/language";
import { plotLayoutFont } from "./utils";
import React from "react";
import ImpactChart, { relativeChangeMessage } from "./ImpactChart";
import { COUNTRY_NAMES } from "pages/statusPageDefaults";

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
    formatPercent(n, metadata, { maximumFractionDigits: 1 });
  const hoverMessage = (x, y) => {
    const obj = `the income of households in the ${cardinal(x)} ${decileType}`;
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

const description = (
  <p>
    The chart above shows the relative change in income for each income decile.
    Households are sorted into ten equally-populated groups according to their
    equivalised household net income.
  </p>
);

export function title(policyLabel, change, metadata) {
  const term1 = "the net income of households";
  const term2 = formatPercent(Math.abs(change), metadata, {
    maximumFractionDigits: 1,
  });
  const signTerm = change > 0 ? "increase" : "decrease";
  const countryId = metadata.countryId;
  const countryPhrase =
    countryId === "us" || countryId === "uk"
      ? ""
      : `in ${COUNTRY_NAMES(countryId)}`;
  // TODO: a tolerance should be used to decide the sign.
  const msg =
    change === 0
      ? `${policyLabel} would have no effect on ${term1} on average ${countryPhrase}`
      : `${policyLabel} would ${signTerm} ${term1} by ${term2} on average ${countryPhrase}`;
  return msg;
}

export default function relativeImpactByDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const decileRelative = impact.decile.relative;
  const relativeChange =
    -impact.budget.budgetary_impact / impact.budget.baseline_net_income;
  const chart = (
    <ImpactChart
      title={title(policyLabel, relativeChange, metadata)}
      description={description}
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
