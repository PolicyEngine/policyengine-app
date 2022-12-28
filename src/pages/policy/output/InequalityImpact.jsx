import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard from "../../../layout/HoverCard";
import style from "../../../style";

export default function InequalityImpact(props) {
  const { impact, policyLabel } = props;

  const metricChanges = [
    impact.inequality.gini.reform / impact.inequality.gini.baseline - 1,
    impact.inequality.top_10_pct_share.reform / impact.inequality.top_10_pct_share.baseline - 1,
    impact.inequality.top_1_pct_share.reform / impact.inequality.top_1_pct_share.baseline - 1,
  ];

  const [hovercard, setHoverCard] = useState(null);

  const chart = (
    <Plot
      data={[
        {
          x: ["Gini coefficient", "Top 10% share", "Top 1% share"],
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
          tickformat: ",.0%",
        },
        uniformtext: {
          mode: "hide",
          minsize: 12,
        },
        ...ChartLogo,
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
        if ((label === "Gini coefficient")) {
          // 'This reform reduces/increases tax revenues by £X/This reform has no impact on tax revenues'
          const baseline = impact.inequality.gini.baseline;
          const reform = impact.inequality.gini.reform;
          const change = reform / baseline - 1;
          body =
            change > 0.001
              ? `This reform increases the Gini coefficient of disposable income from
                  ${baseline.toFixed(3)} to ${reform.toFixed(3)}, a change of
                  ${change.toFixed(3)}.` :
                change < 0 ?
                  `This reform reduces the Gini coefficient of disposable income from
                  ${baseline.toFixed(3)} to ${reform.toFixed(3)}, a change of
                  ${percent(change)}.` :
                  "This reform has no impact on the Gini coefficient of disposable income.";
        } else if (label === "Top 10% share") {
          // 'This reform reduces/increases benefit spending by £X/This reform has no impact on benefit spending'
          const baseline = impact.inequality.top_10_pct_share.baseline;
          const reform = impact.inequality.top_10_pct_share.reform;
          const change = reform / baseline - 1;
          body =
            change > 0.001
              ? `This reform increases the share of total disposable income held by people in the top 10% of households from
                  ${percent(baseline)} to ${percent(reform)}, an increase of
                  ${percent(change)}.` :
                change < -0.001 ?
                  `This reform reduces the share of total disposable income held by people in the top 10% of households from
                  ${percent(baseline)} to ${percent(reform)}, a reduction of
                  ${percent(-change)}.` :
                  "This reform has no impact on the share of total disposable income held by people in the top 10% of households.";
        } else {
          // 'This reform reduces/increases the budget deficit by £X/This reform has no impact on the budget deficit'
          const baseline = impact.inequality.top_1_pct_share.baseline;
          const reform = impact.inequality.top_1_pct_share.reform;
          const change = reform / baseline - 1;
          body =
            change > 0.001
              ? `This reform increases the share of total disposable income held by people in the top 1% of households from
                  ${percent(baseline)} to ${percent(reform)}, an increase of
                  ${percent(change)}.` :
                change < -0.001 ?
                  `This reform reduces the share of total disposable income held by people in the top 1% of households from
                  ${percent(baseline)} to ${percent(reform)}, a reduction of
                  ${percent(-change)}.` :
                  "This reform has no impact on the share of total disposable income held by people in the top 1% of households.";
        }
        setHoverCard({
          title: label,
          body: body,
        });
      }}
    />
  );

  return (
    <>
      <h2>
        {policyLabel}
        {
          metricChanges[0] > 0 ?
            ` increases income inequality by ${(metricChanges[0] * 100).toFixed(1)}%` :
            metricChanges[0] < 0 ?
              ` decreases income inequality by ${-(metricChanges[0] * 100).toFixed(1)}%` :
              ` has no impact on income inequality`
        }
      </h2>
      <p>
        The chart below shows how this is broken down between tax and benefit
        measures.
      </p>
      <HoverCard
        content={hovercard}
      >
        {chart}
      </HoverCard>
    </>
  );
}
