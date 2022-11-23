import Plot from "react-plotly.js";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";

export default function IntraDecileImpact(props) {
  const { impact, policyLabel } = props;
  const deciles = impact.intra_decile.deciles;
  const decileNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const all = impact.intra_decile.all;
  const totalAhead = all["Gain more than 5%"] + all["Gain less than 5%"];

  const data = [
    {
      type: "bar",
      y: decileNumbers,
      x: deciles["Gain more than 5%"],
      name: "Gain more than 5%",
      marker: {
        color: style.colors.DARK_GREEN,
      },
      orientation: "h",
    },
    {
      type: "bar",
      y: decileNumbers,
      x: deciles["Gain less than 5%"],
      name: "Gain less than 5%",
      marker: {
        color: style.colors.LIGHT_GREEN,
      },
      orientation: "h",
    },
    {
      type: "bar",
      y: decileNumbers,
      x: deciles["No change"],
      name: "No change",
      marker: {
        color: style.colors.LIGHT_GRAY,
      },
      orientation: "h",
    },
    {
      type: "bar",
      y: decileNumbers,
      x: deciles["Lose less than 5%"],
      name: "Lose less than 5%",
      marker: {
        color: style.colors.GRAY,
      },
      orientation: "h",
    },
    {
      type: "bar",
      y: decileNumbers,
      x: deciles["Lose more than 5%"],
      name: "Lose more than 5%",
      marker: {
        color: style.colors.DARK_GRAY,
      },
      orientation: "h",
    },
  ];

  const chart = (
    <Plot
      data={data}
      layout={{
        barmode: "stack",
        orientation: "h",
        yaxis: {
          title: "Income decile",
          tickvals: decileNumbers,
        },
        xaxis: {
          title: "Population share",
          tickformat: ".0%",
        },
      }}
      config={{
        displayModeBar: false,
      }}
      style={{
        width: "100%",
      }}
    />
  );

  return (
    <>
      <h2>
        {policyLabel} benefits{" "}
        {formatVariableValue({ unit: "/1" }, totalAhead, 0)} of the population
      </h2>
      {chart}
    </>
  );
}
