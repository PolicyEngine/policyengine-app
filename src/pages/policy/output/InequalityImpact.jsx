import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from "./DownloadCsvButton";
import { plotLayoutFont } from "pages/policy/output/utils";
import React, { useRef } from "react";

export default function InequalityImpact(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;

  const metricChanges = [
    impact.inequality.gini.reform / impact.inequality.gini.baseline - 1,
    impact.inequality.top_10_pct_share.reform /
      impact.inequality.top_10_pct_share.baseline -
      1,
    impact.inequality.top_1_pct_share.reform /
      impact.inequality.top_1_pct_share.baseline -
      1,
  ];

  const mobile = useMobile();

  function InequalityImpactPlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
    const labels = ["Gini index", "Top 10% share", "Top 1% share"];
    return (
      <Plot
        data={[
          {
            x: labels,
            y: metricChanges,
            type: "bar",
            marker: {
              color: metricChanges.map((value) =>
                value < 0 ? style.colors.BLUE : style.colors.DARK_GRAY,
              ),
            },
            text: metricChanges.map(
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
                  customdata: labels.map((label) => {
                    if (label === "Gini index") {
                      // 'This reform reduces/increases tax revenues by £X/This reform has no impact on tax revenues'
                      const baseline = impact.inequality.gini.baseline;
                      const reform = impact.inequality.gini.reform;
                      const change = reform / baseline - 1;
                      return change > 0.001
                        ? `This reform would increase<br>the Gini index of net income<br>from ` +
                            `${baseline.toFixed(3)} to ${reform.toFixed(
                              3,
                            )}, a change of ` +
                            `${change.toFixed(3)}.`
                        : change < -0.001
                        ? `This reform would reduce<br>the Gini index of net income<br>from ` +
                          `${baseline.toFixed(3)} to ${reform.toFixed(
                            3,
                          )}, a change of ` +
                          `${percent(change)}.`
                        : change === 0
                        ? "This reform would not impact<br>the Gini index of net income."
                        : (change > 0
                            ? "This reform would increase "
                            : "This reform would reduce ") +
                          "<br>the Gini index of net income<br>by less than 0.1%.";
                    } else if (label === "Top 10% share") {
                      // 'This reform reduces/increases benefit spending by £X/This reform has no impact on benefit spending'
                      const baseline =
                        impact.inequality.top_10_pct_share.baseline;
                      const reform = impact.inequality.top_10_pct_share.reform;
                      const change = reform / baseline - 1;
                      return change > 0.001
                        ? `This reform would increase the share<br>of total net income held by people<br>in the top 10% of households<br>from ` +
                            `${percent(baseline)} to ${percent(
                              reform,
                            )}, an increase of ` +
                            `${percent(change)}.`
                        : change < -0.001
                        ? `This reform would reduce the share<br>of total net income held by people<br>in the top 10% of households<br>from ` +
                          `${percent(baseline)} to ${percent(
                            reform,
                          )}, a reduction of ` +
                          `${percent(-change)}.`
                        : change === 0
                        ? "This reform would not impact the share<br>of total net income held by people<br>in the top 10% of households."
                        : (change > 0
                            ? "This reform would increase "
                            : "This reform would reduce ") +
                          "the share<br>of total net income held by people<br>in the top 10% of households<br>by less than 0.1%.";
                    } else {
                      // 'This reform reduces/increases the budget deficit by £X/This reform has no impact on the budget deficit'
                      const baseline =
                        impact.inequality.top_1_pct_share.baseline;
                      const reform = impact.inequality.top_1_pct_share.reform;
                      const change = reform / baseline - 1;
                      return change > 0.001
                        ? `This reform would increase the share<br>of total net income held by people<br>in the top 1% of households<br>from ` +
                            `${percent(baseline)} to ${percent(
                              reform,
                            )}, an increase of ` +
                            `${percent(change)}.`
                        : change < -0.001
                        ? `This reform would reduce the share<br>of total net income held by people<br>in the top 1% of households<br>from ` +
                          `${percent(baseline)} to ${percent(
                            reform,
                          )}, a reduction of ` +
                          `${percent(-change)}.`
                        : change === 0
                        ? "This reform would not impact the share<br>of total net income held by people<br>in the top 1% of households."
                        : (change > 0
                            ? "This reform would increase "
                            : "This reform would reduce ") +
                          "the share<br>of total net income held by people<br>in the top 10% of households<br>by less than 0.1%.";
                    }
                  }),
                  hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
                }),
          },
        ]}
        layout={{
          xaxis: {
            title: "",
          },
          yaxis: {
            title: "Relative change",
            tickformat: ",.1%",
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
            minsize: 12,
          },
          ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
          margin: {
            t: 0,
            b: 100,
            r: 0,
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
        }}
        {...(useHoverCard
          ? {
              onHover: (data) => {
                const label = data.points[0].x;
                let body;
                if (label === "Gini index") {
                  // 'This reform reduces/increases tax revenues by £X/This reform has no impact on tax revenues'
                  const baseline = impact.inequality.gini.baseline;
                  const reform = impact.inequality.gini.reform;
                  const change = reform / baseline - 1;
                  body =
                    change > 0.001
                      ? `This reform would increase the Gini index of net income from
                  ${baseline.toFixed(3)} to ${reform.toFixed(3)}, a change of
                  ${change.toFixed(3)}.`
                      : change < -0.001
                      ? `This reform would reduce the Gini index of net income from
                  ${baseline.toFixed(3)} to ${reform.toFixed(3)}, a change of
                  ${percent(change)}.`
                      : change === 0
                      ? "This reform would not impact the Gini index of net income."
                      : (change > 0
                          ? "This reform would increase "
                          : "This reform would reduce ") +
                        "the Gini index of net income by less than 0.1%.";
                } else if (label === "Top 10% share") {
                  // 'This reform reduces/increases benefit spending by £X/This reform has no impact on benefit spending'
                  const baseline = impact.inequality.top_10_pct_share.baseline;
                  const reform = impact.inequality.top_10_pct_share.reform;
                  const change = reform / baseline - 1;
                  body =
                    change > 0.001
                      ? `This reform would increase the share of total net income held by people in the top 10% of households from
                  ${percent(baseline)} to ${percent(reform)}, an increase of
                  ${percent(change)}.`
                      : change < -0.001
                      ? `This reform would reduce the share of total net income held by people in the top 10% of households from
                  ${percent(baseline)} to ${percent(reform)}, a reduction of
                  ${percent(-change)}.`
                      : change === 0
                      ? "This reform would not impact the share of total net income held by people in the top 10% of households."
                      : (change > 0
                          ? "This reform would increase "
                          : "This reform would reduce ") +
                        "the share of total net income held by people in the top 10% of households by less than 0.1%.";
                } else {
                  // 'This reform reduces/increases the budget deficit by £X/This reform has no impact on the budget deficit'
                  const baseline = impact.inequality.top_1_pct_share.baseline;
                  const reform = impact.inequality.top_1_pct_share.reform;
                  const change = reform / baseline - 1;
                  body =
                    change > 0.001
                      ? `This reform would increase the share of total net income held by people in the top 1% of households from
                  ${percent(baseline)} to ${percent(reform)}, an increase of
                  ${percent(change)}.`
                      : change < -0.001
                      ? `This reform would reduce the share of total net income held by people in the top 1% of households from
                  ${percent(baseline)} to ${percent(reform)}, a reduction of
                  ${percent(-change)}.`
                      : change === 0
                      ? "This reform would not impact the share of total net income held by people in the top 1% of households."
                      : (change > 0
                          ? "This reform would increase "
                          : "This reform would reduce ") +
                        "the share of total net income held by people in the top 10% of households by less than 0.1%.";
                }
                setHoverCard({
                  title: label,
                  body: body,
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

  // Impact is ambiguous if all three metrics are not the same sign (sign can be -ive, zero or +ive). Impact is positive if all three metrics are +ive. Impact is negative if all three metrics are -ive.

  const impactLabel =
    metricChanges[0] > 0 && metricChanges[1] > 0 && metricChanges[2] > 0
      ? "positive"
      : metricChanges[0] < 0 && metricChanges[1] < 0 && metricChanges[2] < 0
      ? "negative"
      : "ambiguous";

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
  const csvHeader = ["Metric", "Baseline", "Reform", "Change"];
  const metricLabels = ["Gini index", "Top 10% share", "Top 1% share"];
  const baselineValues = [
    impact.inequality.gini.baseline,
    impact.inequality.top_10_pct_share.baseline,
    impact.inequality.top_1_pct_share.baseline,
  ];
  const reformValues = [
    impact.inequality.gini.reform,
    impact.inequality.top_10_pct_share.reform,
    impact.inequality.top_1_pct_share.reform,
  ];
  const data = [
    csvHeader,
    ...metricLabels.map((label, index) => {
      const baseline = baselineValues[index];
      const reform = reformValues[index];
      const change = reform / baseline - 1;
      return [label, baseline, reform, change];
    }),
  ];
  const downloadButtonStyle = {
    position: "absolute",
    bottom: "15px",
    left: "80px",
  };

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2>
          {policyLabel}
          {impactLabel === "positive"
            ? ` would increase inequality ${label}`
            : impactLabel === "negative"
            ? ` would reduce inequality ${label}`
            : ` would have an ambiguous effect on inequality ${label}`}
        </h2>
        <HoverCard>
          <InequalityImpactPlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`incomeInequilityImpact${policyLabel}.csv`}
            style={downloadButtonStyle}
          />
        )}
      </div>
      <p>
        The chart above shows how this policy reform affects different measures
        of income inequality.
      </p>
    </>
  );
}
