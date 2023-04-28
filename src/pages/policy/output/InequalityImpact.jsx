import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";
import DownloadCsvButton from './DownloadCsvButton';

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

  const [hovercard, setHoverCard] = useState(null);
  const mobile = useMobile();

  const chart = (
    <Plot
      data={[
        {
          x: ["Gini index", "Top 10% share", "Top 1% share"],
          y: metricChanges,
          type: "bar",
          marker: {
            color: metricChanges.map((value) =>
              value < 0 ? style.colors.DARK_GREEN : style.colors.DARK_GRAY
            ),
          },
          text: metricChanges.map(
            (value) =>
              (value >= 0 ? "+" : "") +
              (value * 100).toFixed(1).toString() +
              "%"
          ),
          textangle: 0,
          hoverinfo: "none",
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
        uniformtext: {
          mode: "hide",
          minsize: 12,
        },
        ...ChartLogo,
        margin: {
          t: 0,
          b: 100,
          r: 0,
        },
        height: mobile ? 300 : 500,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
      }}
      onHover={(data) => {
        const label = data.points[0].x;
        let body = null;
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
              : change < 0
              ? `This reform would reduce the Gini index of net income from
                  ${baseline.toFixed(3)} to ${reform.toFixed(3)}, a change of
                  ${percent(change)}.`
              : "This reform would not impact the Gini index of net income.";
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
              : "This reform would not impact the share of total net income held by people in the top 10% of households.";
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
              : "This reform would not impact the share of total net income held by people in the top 1% of households.";
        }
        setHoverCard({
          title: label,
          body: body,
        });
      }}
      onUnhover={() => {
        setHoverCard(null);
      }}
    />
  );

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
    
  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel}
          {impactLabel === "positive"
            ? ` would increase inequality ${label}`
            : impactLabel === "negative"
            ? ` would reduce inequality ${label}` 
            : ` would have an ambiguous effect on inequality ${label}` }
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
        <div className="chart-container">
          {!mobile && (
            <DownloadCsvButton preparingForScreenshot={preparingForScreenshot}
              content={data}
              filename="incomeInequilityImpact.csv"
              className="download-button"
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
