import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { regionName, relativeChangeMessage } from "./ImpactChart";
import { formatPercent, localeCode } from "api/language";

function ImpactPlot(props) {
  const setHoverCard = useContext(HoverCardContext);
  const {
    giniImpact,
    top10Impact,
    top1Impact,
    labels,
    metricChanges,
    metadata,
    mobile,
    useHoverCard,
  } = props;
  const formatPer = (x) =>
    formatPercent(x, metadata, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  const hoverMessage = (x) => {
    let obj, baseline, reform, formatter;
    if (x === "Gini index") {
      obj = "the Gini index of net income";
      baseline = giniImpact.baseline;
      reform = giniImpact.reform;
      formatter = (x) => x.toFixed(3);
    } else if (x === "Top 10% share") {
      obj =
        "the share of total net income held by people in the top 10% of households";
      baseline = top10Impact.baseline;
      reform = top10Impact.reform;
      formatter = formatPer;
    } else {
      obj =
        "the share of total net income held by people in the top 1% of households";
      baseline = top1Impact.baseline;
      reform = top1Impact.reform;
      formatter = formatPer;
    }
    const change = reform / baseline - 1;
    return relativeChangeMessage("This reform", obj, change, 0.001, metadata, {
      baseline: baseline,
      reform: reform,
      formatter: formatter,
    });
  };
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
                customdata: labels.map(hoverMessage),
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
        locale: localeCode(metadata.countryId),
      }}
      style={{
        width: "100%",
      }}
      {...(useHoverCard
        ? {
            onHover: (data) => {
              const x = data.points[0].x;
              setHoverCard({
                title: x,
                body: hoverMessage(x),
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
  const signTerm =
    metricChanges[0] > 0 && metricChanges[1] > 0 && metricChanges[2] > 0
      ? "increase"
      : metricChanges[0] < 0 && metricChanges[1] < 0 && metricChanges[2] < 0
        ? "decrease"
        : "have an ambiguous effect on";
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const msg = `${policyLabel} would ${signTerm} inequality${regionPhrase}`;
  return msg;
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
        metadata={metadata}
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
