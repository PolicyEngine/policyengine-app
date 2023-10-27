import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { cardinal, currencyString, localeString } from "../../../api/language";
import { formatVariableValue } from "../../../api/variables";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from "./DownloadCsvButton";
import { avgChangeDirection, plotLayoutFont } from "./utils";
import React, { useRef } from "react";

export default function AverageImpactByWealthDecile(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const mobile = useMobile();

  function AverageImpactByWealthDecilePlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
    const xArray = Object.keys(impact.wealth_decile.average);
    const yArray = Object.values(impact.wealth_decile.average);
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
            text: yArray.map((value) => currencyString(value, metadata, 0)),
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
                      ? `This reform raises the income<br>of households in the ${decile} wealth decile<br>by an average of ${formatVariableValue(
                          metadata.variables.household_net_income,
                          change,
                          0,
                        )} per year.`
                      : change < -0.0001
                      ? `This reform lowers the income<br>of households in the ${decile} wealth decile<br>by an average of ${formatVariableValue(
                          metadata.variables.household_net_income,
                          -change,
                          0,
                        )} per year.`
                      : change === 0
                      ? `This reform has no impact on the income<br>of households in the ${decile} wealth decile.`
                      : (change > 0
                          ? "This reform raises "
                          : "This reform lowers ") +
                        `the income<br>of households in the ${decile} wealth decile<br>by less than 0.01%.`;
                  }),
                  hovertemplate: `<b>Decile %{x}</b><br><br>%{customdata}<extra></extra>`,
                }),
          },
        ]}
        layout={{
          xaxis: {
            title: "Wealth decile",
            tickvals: Object.keys(impact.wealth_decile.average),
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
          locale: localeString(metadata),
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
                    ? `This reform raises the income of households in the ${decile} wealth decile by an average of ${formatVariableValue(
                        metadata.variables.household_net_income,
                        change,
                        0,
                      )} per year.`
                    : change < -0.0001
                    ? `This reform lowers the income of households in the ${decile} wealth decile by an average of ${formatVariableValue(
                        metadata.variables.household_net_income,
                        -change,
                        0,
                      )} per year.`
                    : change === 0
                    ? `This reform has no impact on the income of households in the ${decile} wealth decile.`
                    : (change > 0
                        ? "This reform raises "
                        : "This reform lowers ") +
                      ` the income of households in the ${decile} wealth decile by less than 0.01%.`;
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

  const averageChange =
    -impact.budget.budgetary_impact / impact.budget.households;

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const screenshotRef = useRef();
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label;
  const data = Object.entries(impact.wealth_decile.average).map(
    ([key, value]) => [`Decile ${key}`, value],
  );
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
            averageChange,
          )} the net income of households ${label} by ${formatVariableValue(
            metadata.variables.household_net_income,
            Math.abs(averageChange),
            0,
          )} on average`}
        </h2>
        <HoverCard>
          <AverageImpactByWealthDecilePlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`absoluteImpactByWealthDecile${policyLabel}.csv`}
            style={downloadButtonStyle}
          />
        )}
      </div>
      <p>
        The chart above shows the relative change in income for each wealth
        decile. Households are sorted into ten equally-populated groups
        according to their equivalised household net income.
      </p>
    </>
  );
}
