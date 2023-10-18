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
import { avgChangeDirection, plotLayoutFont } from "./utils";
import React, { useRef } from "react";

export default function RelativeImpactByDecile(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const mobile = useMobile();

  function RelativeImpactByDecilePlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
    const xArray = Object.keys(impact.decile.relative);
    const yArray = Object.values(impact.decile.relative);
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
              (value) =>
                (value >= 0 ? "+" : "") +
                (value * 100).toFixed(1).toString() +
                "%",
            ),
            textangle: 0,
            ...(useHoverCard
              ? {
                  hoverinfo: "none",
                }
              : {
                  customdata: xArray.map((x, i) => {
                    const decile = cardinal(x);
                    const relativeChange = yArray[i];
                    return relativeChange > 0.001
                      ? `This reform would raise the income<br>of households in the ${decile} decile<br>by an average of ${percent(
                          relativeChange,
                        )}.`
                      : relativeChange < -0.001
                      ? `This reform would lower the income<br>of households in the ${decile} decile<br>by an average of ${percent(
                          -relativeChange,
                        )}.`
                      : relativeChange === 0
                      ? `This reform would not impact the income<br>of households in the ${decile} decile.`
                      : (relativeChange > 0
                          ? "This reform would raise "
                          : "This reform would lower ") +
                        `the income<br>of households in the ${decile} decile<br>by less than 0.1%.`;
                  }),
                  hovertemplate: `<b>Decile %{x}</b><br><br>%{customdata}<extra></extra>`,
                }),
          },
        ]}
        layout={{
          xaxis: {
            title: "Income decile",
            tickvals: Object.keys(impact.decile.relative),
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
                const decile = cardinal(data.points[0].x);
                const relativeChange = data.points[0].y;
                const message =
                  relativeChange > 0.001
                    ? `This reform would raise the income of households in the ${decile} decile by an average of ${percent(
                        relativeChange,
                      )}.`
                    : relativeChange < -0.001
                    ? `This reform would lower the income of households in the ${decile} decile by an average of ${percent(
                        -relativeChange,
                      )}.`
                    : relativeChange === 0
                    ? `This reform would not impact the income of households in the ${decile} decile.`
                    : (relativeChange > 0
                        ? "This reform would raise "
                        : "This reform would lower ") +
                      ` the income of households in the ${decile} decile by less than 0.1%.`;
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

  const averageRelChange =
    -impact.budget.budgetary_impact / impact.budget.baseline_net_income;

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label;
  const screenshotRef = useRef();
  const csvHeader = ["Income Decile", "Relative Change"];
  const data = [
    csvHeader,
    ...Object.entries(impact.decile.relative).map(
      ([decile, relativeChange]) => {
        return [decile, relativeChange];
      },
    ),
  ];
  const downloadButtonStyle = {
    position: "absolute",
    bottom: "40px",
    left: "55px",
  };

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2 style={{ width: "700px", wordWrap: "break-word" }}>
          {`${policyLabel} ${avgChangeDirection(
            averageRelChange,
          )} the net income of households ${label} by ${formatVariableValue(
            { unit: "/1" },
            Math.abs(averageRelChange),
            1,
          )} on average`}
        </h2>
        <HoverCard>
          <RelativeImpactByDecilePlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`relativeImpactByDecile${policyLabel}.csv`}
            style={downloadButtonStyle}
          />
        )}
      </div>
      <p>
        The chart above shows the relative change in income for each income
        decile. Households are sorted into ten equally-populated groups
        according to their equivalised household net income.
      </p>
    </>
  );
}
