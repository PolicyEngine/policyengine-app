import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import { cardinal, percent } from "../../../api/language";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import DownloadCsvButton from "./DownloadCsvButton";
import { plotLayoutFont } from "pages/policy/output/utils";
import React, { useRef } from "react";

export default function IntraDecileImpact(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const deciles = impact.intra_decile.deciles;
  const decileNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const all = impact.intra_decile.all;
  const totalAhead = all["Gain more than 5%"] + all["Gain less than 5%"];
  const mobile = useMobile();

  function IntraDecileImpactPlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;

    const colorMap = {
      "Gain more than 5%": style.colors.BLUE,
      "Gain less than 5%": style.colors.BLUE_98,
      "No change": style.colors.LIGHT_GRAY,
      "Lose less than 5%": style.colors.GRAY,
      "Lose more than 5%": style.colors.DARK_GRAY,
    };
    const hoverTextMap = {
      "Gain more than 5%": "gain more than 5% of",
      "Gain less than 5%": "gain less than 5% of",
      "No change": "neither gain nor lose",
      "Lose less than 5%": "lose less than 5% of",
      "Lose more than 5%": "lose more than 5% of",
    };
    const legendTextMap = {
      "Gain more than 5%": "Gain more than 5%",
      "Gain less than 5%": "Gain less than 5%",
      "No change": "No change",
      "Lose less than 5%": "Loss less than 5%",
      "Lose more than 5%": "Loss more than 5%",
    };

    // type1: "all" | "deciles"
    // type2: "Gain more than 5%" | "Gain less than 5%" | "No change" | "Lose less than 5%" | "Lose more than 5%"

    function hoverTemplate(type1, type2) {
      const hdr =
        type1 === "all"
          ? `<b>All households</b><br><br>`
          : `<b>Decile %{y}</b><br><br>`;
      const body =
        type1 === "all"
          ? `Of all households, ${policyLabel} would cause<br>%{customdata} of people to ` +
            hoverTextMap[type2] +
            ` of<br>their net income.<extra></extra>`
          : `Of households in the %{customdata.group} decile,<br>` +
            `${policyLabel} would cause %{customdata.value} of<br>people to ` +
            hoverTextMap[type2] +
            ` their net<br>income.<extra></extra>`;
      return hdr + body;
    }

    function trace(type1, type2) {
      const x = type1 === "all" ? [all[type2]] : deciles[type2];
      return {
        x: x,
        y: type1 === "all" ? ["All"] : decileNumbers,
        xaxis: type1 === "all" ? "x" : "x2",
        yaxis: type1 === "all" ? "y" : "y2",
        type: "bar",
        name: legendTextMap[type2],
        legendgroup: type2,
        showlegend: type1 === "decile",
        marker: {
          color: colorMap[type2],
        },
        orientation: "h",
        text: x.map((value) => (value * 100).toFixed(0).toString() + "%"),
        textposition: "inside",
        textangle: 0,
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata:
                type1 === "all"
                  ? x.map((x) => percent(x))
                  : x.map((e, i) => {
                      return {
                        group: cardinal(decileNumbers[i]),
                        value: percent(e),
                      };
                    }),
              hovertemplate: hoverTemplate(type1, type2),
            }),
      };
    }

    const product = (a, b) =>
      a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);

    const data = product(
      ["all", "decile"],
      [
        "Gain more than 5%",
        "Gain less than 5%",
        "No change",
        "Lose less than 5%",
        "Lose more than 5%",
      ],
    );

    return (
      <Plot
        data={data.map((types) => trace(types[0], types[1]))}
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
            minsize: mobile ? 7 : 10,
          },
          showlegend: true,
          legend: {
            title: {
              text: "Change in income<br />",
              font: {
                family: "Roboto Serif",
              }
            },
            //# add spacing between title and entries
            tracegroupgap: 10,
            font: {
              family: "Roboto Serif",
            }
          },
          ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
          margin: {
            t: 0,
            b: 80,
            l: 40,
            r: 0,
          },
          height: mobile ? 300 : 450,
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
                const group = data.points[0].y;
                const title =
                  group === "All" ? "All households" : `Decile ${group}`;
                const category = data.points[0].data.name;
                const value = data.points[0].x;
                const message = `Of ${
                  group === "All"
                    ? "all households"
                    : `households in the ${cardinal(group)} decile`
                }, ${policyLabel} would cause ${percent(value)} of people to
        ${category.toLowerCase()} of their net income.`;
                setHoverCard({
                  title: title,
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

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? " of the population"
      : " of " +
        options.find((option) => option.value === region)?.label +
        " residents";
  const screenshotRef = useRef();
  const csvHeader = [
    "Decile",
    "Gain more than 5%",
    "Gain less than 5%",
    "No change",
    "Lose less than 5%",
    "Lose more than 5%",
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
        deciles["Lose more than 5%"][decile - 1],
      ];
    }),
    [
      "All",
      all["Gain more than 5%"],
      all["Gain less than 5%"],
      all["No change"],
      all["Lose less than 5%"],
      all["Lose more than 5%"],
    ],
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
          {formatVariableValue({ unit: "/1" }, totalAhead, 0)}
          {label}
        </h2>
        <HoverCard>
          <IntraDecileImpactPlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
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
