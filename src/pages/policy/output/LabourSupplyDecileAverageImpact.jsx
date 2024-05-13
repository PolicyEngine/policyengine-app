import style from "../../../style";
import ImpactChart from "./ImpactChart";
import Plot from "react-plotly.js";
import { formatPercent, localeCode } from "../../../lang/format";
import { ChartLogo } from "../../../api/charts";
import { plotLayoutFont } from "pages/policy/output/utils";
import { Switch } from "antd";
import RadioButton from "../../../controls/RadioButton";
import { useState } from "react";

export default function LabourSupplyDecileAverageImpact(props) {
  const { policyLabel, metadata, impact } = props;

  const decileImpact = impact.labour_supply_response;

  const data = decileImpact.decile.average;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const chart = (
    <ImpactChart
      title={`${policyLabel}'s average labor supply impact by decile`}
    >
      <p>
        This chart shows the estimated average change in earnings (as a
        percentage of market income) for each disposable income decile, and
        split by the substitution and income effects.
      </p>
      {
        <Plot
          data={[
            {
              type: "bar",
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              y: substitutionChanges,
              marker: {
                color: substitutionChanges.map((value) =>
                  value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
                ),
              },
              text: substitutionChanges.map(
                (value) => (value >= 0 ? "+" : "") + formatPercent(value),
              ),
              name: "Substitution effect",
            },
            {
              type: "bar",
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              y: incomeChanges,
              marker: {
                color: incomeChanges.map((value) =>
                  value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
                ),
              },
              text: incomeChanges.map(
                (value) => (value >= 0 ? "+" : "") + formatPercent(value),
              ),
              name: "Income effect",
            },
            // Scattered points (square) for overall change
            {
              type: "line",
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              y: overallChange,
              mode: "markers+lines",
              // line should be the same color as the marker
              line: {
                color: style.colors.TEAL_ACCENT,
              },
              marker: {
                color: style.colors.TEAL_ACCENT,
                size: 10,
                symbol: "diamond",
                // white border to distinguish
                line: {
                  color: "white",
                  width: 1,
                },
              },
              text: overallChange.map(
                (value) => (value >= 0 ? "+" : "") + formatPercent(value),
              ),
              name: "Overall change",
            },
          ]}
          layout={{
            xaxis: {
              title: "Household income decile",
              tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            yaxis: {
              title: "Change in earnings",
              tickformat: "$,.0f",
              fixedrange: true,
            },
            uniformtext: {
              mode: "hide",
              minsize: 12,
            },
            ...ChartLogo(0.97, -0.15),
            margin: {
              t: 0,
              b: 100,
              r: 0,
            },
            height: 500,
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
        />
      }
    </ImpactChart>
  );

  return { chart: chart, csv: () => {} };
}
