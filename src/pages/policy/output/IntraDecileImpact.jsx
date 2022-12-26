import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
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
      y: ["All"],
      x: [all["Gain more than 5%"]],
      name: "Gain more than 5%",
      legendgroup: "Gain more than 5%",
      offsetgroup: "Gain more than 5%",
      marker: {
        color: style.colors.DARK_GREEN,
      },
      orientation: "h",
      text: [all["Gain more than 5%"]].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x",
      yaxis: "y",
      showlegend: false,
    },
    {
      type: "bar",
      y: ["All"],
      x: [all["Gain less than 5%"]],
      name: "Gain less than 5%",
      marker: {
        color: style.colors.LIGHT_GREEN,
      },
      orientation: "h",
      text: [all["Gain less than 5%"]].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x",
      yaxis: "y",
      showlegend: false,
    },
    {
      type: "bar",
      y: ["All"],
      x: [all["No change"]],
      name: "No change",
      marker: {
        color: style.colors.LIGHT_GRAY,
      },
      orientation: "h",
      text: [all["No change"]].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x",
      yaxis: "y",
      showlegend: false,
    },
    {
      type: "bar",
      y: ["All"],
      x: [all["Lose less than 5%"]],
      name: "Lose less than 5%",
      marker: {
        color: style.colors.GRAY,
      },
      orientation: "h",
      text: [all["Lose less than 5%"]].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x",
      yaxis: "y",
      showlegend: false,
    },
    {
      type: "bar",
      y: ["All"],
      x: [all["Lose more than 5%"]],
      name: "Lose more than 5%",
      marker: {
        color: style.colors.DARK_GRAY,
      },
      orientation: "h",
      text: [all["Lose more than 5%"]].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x",
      yaxis: "y",
      showlegend: false,
    },
    {
      type: "bar",
      y: decileNumbers,
      x: deciles["Gain more than 5%"],
      name: "Gain more than 5%",
      marker: {
        color: style.colors.DARK_GREEN,
      },
      orientation: "h",
      text: deciles["Gain more than 5%"].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x2",
      yaxis: "y2",
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
      text: deciles["Gain less than 5%"].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x2",
      yaxis: "y2",
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
      text: deciles["No change"].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x2",
      yaxis: "y2",
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
      text: deciles["Lose less than 5%"].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x2",
      yaxis: "y2",
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
      text: deciles["Lose more than 5%"].map(
        (value) => (value * 100).toFixed(0).toString() + "%"
      ),
      textposition: "inside",
      textangle: 0,
      xaxis: "x2",
      yaxis: "y2",
    },
  ];

  const chart = (
    <Plot
      data={data}
      layout={{
        barmode: "stack",
        orientation: "h",
        grid: {
          rows: 2,
          columns: 1,
        },
        yaxis: {
          title: "",
          tickvals: ["All"],
          domain: [0.91, 1],
        },
        xaxis: {
          title: "",
          tickformat: ".0%",
          anchor: "y",
          matches: "x2",
          showgrid: false,
          showticklabels: false,
        },
        xaxis2: {
          title: "Population share",
          tickformat: ".0%",
          anchor: "y2",
        },
        yaxis2: {
          title: "Income decile",
          tickvals: decileNumbers,
          anchor: "x2",
          domain: [0, 0.85],
        },
        uniformtext: {
          mode: "hide",
          minsize: 10,
        },
        legend: {
          // Position on the top going left
          x: 0,
          y: -0.3,
          orientation: "h",
        },
        height: 600,
        ...ChartLogo,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
        height: 700,
      }}
    />
  );

  return (
    <>
      <h2>
        {policyLabel} benefits{" "}
        {formatVariableValue({ unit: "/1" }, totalAhead, 0)} of the population
      </h2>
      <p>
        The chart below shows percentage of of people in each household income decile who experience different outcome categories. Households are sorted into ten equally-populated groups according to
        their equivalised household net income.
      </p>
      {chart}
    </>
  );
}
