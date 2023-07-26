import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";
import HoverCard, {HoverCardContext} from "../../../layout/HoverCard";
import { cardinal, percent } from "../../../api/language";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import DownloadCsvButton from './DownloadCsvButton';
import { plotLayoutFont } from 'pages/policy/output/utils';
import React, { useRef } from "react";

export default function IntraDecileImpact(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const deciles = impact.intra_decile.deciles;
  const decileNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const all = impact.intra_decile.all;
  const totalAhead = all["Gain more than 5%"] + all["Gain less than 5%"];
  const mobile = useMobile();

  function IntraDecileImpactPlot() {
    const {setContent, setCoordinates} = useContext(HoverCardContext);

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

    const dataHandler = (data) => {
      const point = data.points[0];
      const group = point.y;
      const value = point.x;
      const top = point.yaxis.d2p(group) + point.yaxis._offset;
      const category = point.data.name;
      if (category.includes("Lose")) {
        setCoordinates(point.xaxis._offset, top);
      } else {
        setCoordinates(point.xaxis._length + point.xaxis._offset, top, "top-right");
      }
      const title = group === "All" ? "All households" : `Decile ${group}`;
      const message = `Of ${
        group === "All"
          ? "all households"
          : `households in the ${cardinal(group)} decile`
      }, ${policyLabel} would cause ${percent(value)} of people to
        ${category.toLowerCase()} of their net income.`;
      setContent({
        title: title,
        body: message,
      });
    };

    return (
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
            minsize: mobile ? 7 : 10,
          },
          showlegend: false,
          ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
          margin: {
            t: 0,
            b: 80,
            l: 40,
            r: 0,
          },
          height: mobile ? 300 : 450,
          ...plotLayoutFont
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: "100%",
          marginBottom: !mobile && 50,
        }}
        onClick={dataHandler}
        onHover={dataHandler}
        onUnhover={() => {
          setContent(null);
        }}
      />
    );
  }

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
  region === "us" || region === "uk"
    ? " of the population"
    : " of " + options.find((option) => option.value === region)?.label + " residents";
  const screenshotRef = useRef();
  const csvHeader = [
    "Decile",
    "Gain more than 5%",
    "Gain less than 5%",
    "No change",
    "Lose less than 5%",
    "Lose more than 5%"
  ];
  const csvData = [
    csvHeader,
    ...decileNumbers.map((decile) => {
      return [
        decile,
        deciles["Gain more than 5%"][decile - 1],
        deciles["Gain less than 5%"][decile - 1],
        deciles["No change"][decile - 1],
        deciles["Lose less than 5%"][decile - 1],
        deciles["Lose more than 5%"][decile - 1]
      ];
    }),
    [
      "All",
      all["Gain more than 5%"],
      all["Gain less than 5%"],
      all["No change"],
      all["Lose less than 5%"],
      all["Lose more than 5%"]
    ]
  ];
  const downloadButtonStyle = {
    position: "absolute",
    bottom: "47px",
    left: "46px",
  };

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2>
          {policyLabel} would benefit{" "}
          {formatVariableValue({ unit: "/1" }, totalAhead, 0)}{label}
        </h2>
        <HoverCard>
          <IntraDecileImpactPlot/>
        </HoverCard>
      </DownloadableScreenshottable>
        <div className="chart-container">
          {!mobile && (
            <DownloadCsvButton preparingForScreenshot={preparingForScreenshot}
              content={csvData}
              filename={`intraDecileImpact${policyLabel}.csv`}
              style={downloadButtonStyle}
            />
          )}
        </div>
      <p>
        The chart above shows percentage of of people in each household income
        decile who experience different outcomes. Households are sorted into ten
        equally-populated groups according to their equivalised household net
        income.
      </p>
    </>
  );
}
