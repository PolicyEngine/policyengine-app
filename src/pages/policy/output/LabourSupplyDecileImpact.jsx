import style from "../../../style";
import ImpactChart from "./ImpactChart";
import Plot from "react-plotly.js";
import { formatPercent, localeCode } from "../../../lang/format";
import { ChartLogo } from "../../../api/charts";
import { plotLayoutFont } from "pages/policy/output/utils";

export default function LabourSupplyDecileImpact(props) {
  const { policyLabel, metadata, impact, timePeriod, region } = props;

  const decileImpact = impact.labour_supply_response;

  const incomeChanges = Object.values(decileImpact.decile.income).slice(0, 10);
  let substitutionChanges = Object.values(decileImpact.decile.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const chart = <ImpactChart title={`${policyLabel}'s labour supply impact by decile`}>
    {<Plot
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
            color: overallChange.map((value) =>
              value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
            ),
          },
          marker: {
            color: overallChange.map((value) =>
              value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
            ),
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
          title: "",
        },
        yaxis: {
          title: "Relative change",
          tickformat: `,.0%`,
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
    />}
  </ImpactChart>

  return { chart: chart, csv: () => {} };
}