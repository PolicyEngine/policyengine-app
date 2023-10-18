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

    const gainMoreThan5ForAll = [all["Gain more than 5%"]];
    const gainLessThan5ForAll = [all["Gain less than 5%"]];
    const noChangeForAll = [all["No change"]];
    const loseLessThan5ForAll = [all["Lose less than 5%"]];
    const loseMoreThan5ForAll = [all["Lose more than 5%"]];

    const gainMoreThan5ForDeciles = deciles["Gain more than 5%"];
    const gainLessThan5ForDeciles = deciles["Gain less than 5%"];
    const noChangeForDeciles = deciles["No change"];
    const loseLessThan5ForDeciles = deciles["Lose less than 5%"];
    const loseMoreThan5ForDeciles = deciles["Lose more than 5%"];

    const data = [
      {
        type: "bar",
        y: ["All"],
        x: gainMoreThan5ForAll,
        name: "Gain more than 5%",
        legendgroup: "Gain more than 5%",
        offsetgroup: "Gain more than 5%",
        marker: {
          color: style.colors.BLUE,
        },
        orientation: "h",
        text: gainMoreThan5ForAll.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x",
        yaxis: "y",
        showlegend: false,
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: gainMoreThan5ForAll.map((x) => percent(x)),
              hovertemplate:
                `<b>All households</b><br><br>` +
                `Of all households, ${policyLabel}<br>would cause ` +
                `%{customdata} of people to gain<br>more than 5% of their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: ["All"],
        x: gainLessThan5ForAll,
        name: "Gain less than 5%",
        marker: {
          color: style.colors.BLUE_98,
        },
        orientation: "h",
        text: gainLessThan5ForAll.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x",
        yaxis: "y",
        showlegend: false,
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: gainLessThan5ForAll.map((x) => percent(x)),
              hovertemplate:
                `<b>All households</b><br><br>` +
                `Of all households, ${policyLabel}<br>would cause ` +
                `%{customdata} of people to gain<br>less than 5% of their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: ["All"],
        x: noChangeForAll,
        name: "No change",
        marker: {
          color: style.colors.LIGHT_GRAY,
        },
        orientation: "h",
        text: noChangeForAll.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x",
        yaxis: "y",
        showlegend: false,
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: noChangeForAll.map((x) => percent(x)),
              hovertemplate:
                `<b>All households</b><br><br>` +
                `Of all households, ${policyLabel}<br>would cause ` +
                `%{customdata} of people to<br>neither gain nor lose their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: ["All"],
        x: loseLessThan5ForAll,
        name: "Lose less than 5%",
        marker: {
          color: style.colors.GRAY,
        },
        orientation: "h",
        text: loseLessThan5ForAll.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x",
        yaxis: "y",
        showlegend: false,
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: loseLessThan5ForAll.map((x) => percent(x)),
              hovertemplate:
                `<b>All households</b><br><br>` +
                `Of all households, ${policyLabel}<br>would cause ` +
                `%{customdata} of people to lose<br>less than 5% their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: ["All"],
        x: loseMoreThan5ForAll,
        name: "Lose more than 5%",
        marker: {
          color: style.colors.DARK_GRAY,
        },
        orientation: "h",
        text: loseMoreThan5ForAll.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x",
        yaxis: "y",
        showlegend: false,
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: loseMoreThan5ForAll.map((x) => percent(x)),
              hovertemplate:
                `<b>All households</b><br><br>` +
                `Of all households, ${policyLabel}<br>would cause ` +
                `%{customdata} of people to lose<br>more than 5% their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: decileNumbers,
        x: gainMoreThan5ForDeciles,
        name: "Gain more than 5%",
        marker: {
          color: style.colors.BLUE,
        },
        orientation: "h",
        text: gainMoreThan5ForDeciles.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x2",
        yaxis: "y2",
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: gainMoreThan5ForDeciles.map((x, i) => {
                return {
                  group: cardinal(decileNumbers[i]),
                  value: percent(x),
                };
              }),
              hovertemplate:
                `<b>Decile %{y}</b><br><br>` +
                `Of households in the %{customdata.group} decile,<br>` +
                `${policyLabel} would cause<br>` +
                `%{customdata.value}of people to gain more<br>` +
                `than 5% of their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: decileNumbers,
        x: gainLessThan5ForDeciles,
        name: "Gain less than 5%",
        marker: {
          color: style.colors.BLUE_98,
        },
        orientation: "h",
        text: gainLessThan5ForDeciles.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x2",
        yaxis: "y2",
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: gainLessThan5ForDeciles.map((x, i) => {
                return {
                  group: cardinal(decileNumbers[i]),
                  value: percent(x),
                };
              }),
              hovertemplate:
                `<b>Decile %{y}</b><br><br>` +
                `Of households in the %{customdata.group} decile,<br>` +
                `${policyLabel} would cause<br>` +
                `%{customdata.value} of people to gain less<br>` +
                `than 5% of their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: decileNumbers,
        x: noChangeForDeciles,
        name: "No change",
        marker: {
          color: style.colors.LIGHT_GRAY,
        },
        orientation: "h",
        text: noChangeForDeciles.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x2",
        yaxis: "y2",
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: noChangeForDeciles.map((x, i) => {
                return {
                  group: cardinal(decileNumbers[i]),
                  value: percent(x),
                };
              }),
              hovertemplate:
                `<b>Decile %{y}</b><br><br>` +
                `Of households in the %{customdata.group} decile,<br>` +
                `${policyLabel} would cause<br>` +
                `%{customdata.value} of people to neither gain nor<br>` +
                `lose their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: decileNumbers,
        x: loseLessThan5ForDeciles,
        name: "Lose less than 5%",
        marker: {
          color: style.colors.GRAY,
        },
        orientation: "h",
        text: loseLessThan5ForDeciles.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x2",
        yaxis: "y2",
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: loseLessThan5ForDeciles.map((x, i) => {
                return {
                  group: cardinal(decileNumbers[i]),
                  value: percent(x),
                };
              }),
              hovertemplate:
                `<b>Decile %{y}</b><br><br>` +
                `Of households in the %{customdata.group} decile,<br>` +
                `${policyLabel} would cause<br>` +
                `%{customdata.value} of people to lose less<br>` +
                `than 5% of their net income.` +
                `<extra></extra>`,
            }),
      },
      {
        type: "bar",
        y: decileNumbers,
        x: loseMoreThan5ForDeciles,
        name: "Lose more than 5%",
        marker: {
          color: style.colors.DARK_GRAY,
        },
        orientation: "h",
        text: loseMoreThan5ForDeciles.map(
          (value) => (value * 100).toFixed(0).toString() + "%",
        ),
        textposition: "inside",
        textangle: 0,
        xaxis: "x2",
        yaxis: "y2",
        ...(useHoverCard
          ? {
              hoverinfo: "none",
            }
          : {
              customdata: loseMoreThan5ForDeciles.map((x, i) => {
                return {
                  group: cardinal(decileNumbers[i]),
                  value: percent(x),
                };
              }),
              hovertemplate:
                `<b>Decile %{y}</b><br><br>` +
                `Of households in the %{customdata.group} decile,<br>` +
                `${policyLabel} would cause<br>` +
                `%{customdata.value} of people to lose more<br>` +
                `than 5% of their net income.` +
                `<extra></extra>`,
            }),
      },
    ];

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
          showlegend: false,
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
