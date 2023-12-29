import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart from "./ImpactChart";

function ImpactPlot(props) {
  const setHoverCard = useContext(HoverCardContext);
  const {
    giniImpact,
    top10Impact,
    top1Impact,
    labels,
    metricChanges,
    mobile,
    useHoverCard,
  } = props;
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
                    const baseline = giniImpact.baseline;
                    const reform = giniImpact.reform;
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
                    const baseline = top10Impact.baseline;
                    const reform = top10Impact.reform;
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
                    const baseline = top1Impact.baseline;
                    const reform = top1Impact.reform;
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
                const baseline = giniImpact.baseline;
                const reform = giniImpact.reform;
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
                const baseline = top10Impact.baseline;
                const reform = top10Impact.reform;
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
                const baseline = top1Impact.baseline;
                const reform = top1Impact.reform;
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

function title(metricChanges, policyLabel, metadata) {
  // Impact is ambiguous if all three metrics are not the same sign (sign can be
  // -ive, zero or +ive). Impact is positive if all three metrics are +ive.
  // Impact is negative if all three metrics are -ive.
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
  const regionLabel =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label;

  return `${policyLabel} ${
    impactLabel === "positive"
      ? " would increase inequality"
      : impactLabel === "negative"
        ? "would reduce inequality"
        : " would have an ambiguous effect on inequality"
  } ${regionLabel}`;
}

const description = (
  <p>
    The chart above shows how this policy reform affects different measures of
    income inequality.
  </p>
);

export default function inequalityImpact(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const labels = ["Gini index", "Top 10% share", "Top 1% share"];
  const giniImpact = impact.inequality.gini;
  const top10Impact = impact.inequality.top_10_pct_share;
  const top1Impact = impact.inequality.top_1_pct_share;
  const metricChanges = [
    giniImpact.reform / giniImpact.baseline - 1,
    top10Impact.reform / top10Impact.baseline - 1,
    top1Impact.reform / top1Impact.baseline - 1,
  ];
  const chart = (
    <ImpactChart
      title={title(metricChanges, policyLabel, metadata)}
      description={description}
    >
      <ImpactPlot
        giniImpact={giniImpact}
        top10Impact={top10Impact}
        top1Impact={top1Impact}
        labels={labels}
        metricChanges={metricChanges}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    const header = ["Metric", "Baseline", "Reform", "Change"];
    const baselineValues = [
      giniImpact.baseline,
      top10Impact.baseline,
      top1Impact.baseline,
    ];
    const reformValues = [
      giniImpact.reform,
      top10Impact.reform,
      top1Impact.reform,
    ];
    const data = [
      header,
      ...labels.map((label, index) => {
        const baseline = baselineValues[index];
        const reform = reformValues[index];
        const change = reform / baseline - 1;
        return [label, baseline, reform, change];
      }),
    ];
    return data;
  };
  return { chart: chart, csv: csv };
}
