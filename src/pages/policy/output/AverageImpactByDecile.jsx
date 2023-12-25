import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { cardinal, localeCode, currencyCode } from "../../../api/language";
import { formatVariableValue } from "../../../api/variables";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "./utils";
import React from "react";
import ImpactChart, { impactTitle } from "./ImpactChart";

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
          text: yArray.map((value) =>
            value.toLocaleString(localeCode(metadata.countryId), {
              style: "currency",
              currency: currencyCode(metadata.countryId),
              maximumFractionDigits: 0,
            }),
          ),
          textangle: 0,
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: xArray.map((x, i) => {
                  const decile = cardinal(x);
                  const change = yArray[i];
                  return change > 0.0001
                    ? `This reform raises the income<br>of households in the ${decile} ${decileType}<br>by an average of ${formatVariableValue(
                        metadata.variables.household_net_income,
                        change,
                        0,
                      )} per year.`
                    : change < -0.0001
                      ? `This reform lowers the income<br>of households in the ${decile} ${decileType}<br>by an average of ${formatVariableValue(
                          metadata.variables.household_net_income,
                          -change,
                          0,
                        )} per year.`
                      : change === 0
                        ? `This reform has no impact on the income<br>of households in the ${decile} ${decileType}.`
                        : (change > 0
                            ? "This reform raises "
                            : "This reform lowers ") +
                          `the income<br>of households in the ${decile} ${decileType}<br>by less than 0.01%.`;
                }),
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
              const decile = cardinal(data.points[0].x);
              const change = data.points[0].y;
              const message =
                change > 0.0001
                  ? `This reform raises the income of households in the ${decile} ${decileType} by an average of ${formatVariableValue(
                      metadata.variables.household_net_income,
                      change,
                      0,
                    )} per year.`
                  : change < -0.0001
                    ? `This reform lowers the income of households in the ${decile} ${decileType} by an average of ${formatVariableValue(
                        metadata.variables.household_net_income,
                        -change,
                        0,
                      )} per year.`
                    : change === 0
                      ? `This reform has no impact on the income of households in the ${decile} ${decileType}.`
                      : (change > 0
                          ? "This reform raises "
                          : "This reform lowers ") +
                        ` the income of households in the ${decile} ${decileType} by less than 0.01%.`;
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

export default function averageImpactByDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const decileAverage = impact.decile.average;
  const averageImpactPerHousehold =
    -impact.budget.budgetary_impact / impact.budget.households;
  const title = impactTitle(
    policyLabel,
    averageImpactPerHousehold,
    formatVariableValue(
      metadata.variables.household_net_income,
      Math.abs(averageImpactPerHousehold),
      0,
    ),
    "the net income of households",
    "on average",
    metadata,
  );
  const chart = (
    <ImpactChart title={title} description={description}>
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
