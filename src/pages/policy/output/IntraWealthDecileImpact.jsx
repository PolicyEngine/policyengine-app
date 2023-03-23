import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";
import HoverCard from "../../../layout/HoverCard";
import { cardinal, percent } from "../../../api/language";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";

export default function IntraWealthDecileImpact(props) {
  const { impact, policyLabel } = props;
  const deciles = impact.intra_wealth_decile.deciles;
  const decileNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const all = impact.intra_wealth_decile.all;
  const totalAhead = all["Gain more than 5%"] + all["Gain less than 5%"];
  const [hovercard, setHovercard] = useState(null);
  const mobile = useMobile();
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
      hoverinfo: "none",
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
          title: "Wealth decile",
          tickvals: decileNumbers,
          anchor: "x2",
          domain: [0, 0.85],
        },
        uniformtext: {
          mode: "hide",
          minsize: mobile ? 7 : 10,
        },
        showlegend: false,
        ...ChartLogo,
        margin: {
          t: 0,
          b: 80,
          l: 40,
          r: 0,
        },
        height: mobile ? 300 : 450,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
        marginBottom: !mobile && 50,
      }}
      onHover={(data) => {
        const group = data.points[0].y;
        const title = group === "All" ? "All households" : `Decile ${group}`;
        const category = data.points[0].data.name;
        const value = data.points[0].x;
        const message = `${percent(value)} of ${
          group === "All"
            ? "all households"
            : `households in the ${cardinal(group)} decile`
        } ${category.toLowerCase()}.`;
        setHovercard({
          title: title,
          body: message,
        });
      }}
      onUnhover={() => {
        setHovercard(null);
      }}
    />
  );

  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel} would benefit{" "}
          {formatVariableValue({ unit: "/1" }, totalAhead, 0)} of the population
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
      <p>
        The chart above shows percentage of of people in each household wealth
        decile who experience different outcomes. Households are sorted into ten
        equally-populated groups according to their equivalised household net
        wealth (including property and corporate holdings).
      </p>
    </>
  );
}
