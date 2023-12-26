import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency, percent } from "../../../api/language";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart from "./ImpactChart";

function ImpactPlot(props) {
  const {
    impact,
    cliffShareChange,
    cliffGapChange,
    metadata,
    mobile,
    useHoverCard,
  } = props;
  const setHoverCard = useContext(HoverCardContext);
  const metrics = ["Cliff rate", "Cliff gap"];
  return (
    <Plot
      data={[
        {
          x: metrics,
          y: [cliffShareChange, cliffGapChange],
          type: "bar",
          marker: {
            color: [
              cliffShareChange > 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
              cliffGapChange > 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
            ],
          },
          text: [
            `${cliffShareChange >= 0 ? "+" : ""}${(
              cliffShareChange * 100
            ).toFixed(1)}%`,
            `${cliffGapChange >= 0 ? "+" : ""}${(cliffGapChange * 100).toFixed(
              1,
            )}%`,
          ],
          textposition: "auto",
          textangle: 0,
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: metrics.map((metric) => {
                  const baseline =
                    metric === "Cliff rate"
                      ? impact.baseline.cliff_share
                      : impact.baseline.cliff_gap;
                  const reform =
                    metric === "Cliff rate"
                      ? impact.reform.cliff_share
                      : impact.reform.cliff_gap;
                  const change = reform / baseline - 1;
                  const formatter =
                    metric === "Cliff rate"
                      ? percent
                      : (x) => aggregateCurrency(x, metadata);
                  return `The ${metric.toLowerCase()} ${
                    change > 0.0001
                      ? `would rise ${percent(change)}<br>from ${formatter(
                          baseline,
                        )} to ${formatter(reform)}`
                      : change < -0.0001
                        ? `would fall ${percent(-change)}<br>from ${formatter(
                            baseline,
                          )} to ${formatter(reform)}`
                        : `would remain at ${percent(baseline)}`
                  }.`;
                }),
                hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
              }),
        },
      ]}
      layout={{
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
        ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
        margin: {
          t: 0,
          b: 80,
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
      }}
      {...(useHoverCard
        ? {
            onHover: (data) => {
              const metric = data.points[0].x;
              const baseline =
                metric === "Cliff rate"
                  ? impact.baseline.cliff_share
                  : impact.baseline.cliff_gap;
              const reform =
                metric === "Cliff rate"
                  ? impact.reform.cliff_share
                  : impact.reform.cliff_gap;
              const change = reform / baseline - 1;
              const formatter =
                metric === "Cliff rate"
                  ? percent
                  : (x) => aggregateCurrency(x, metadata);
              const message = `The ${metric.toLowerCase()} ${
                change > 0.0001
                  ? `would rise ${percent(change)} from ${formatter(
                      baseline,
                    )} to ${formatter(reform)}`
                  : change < -0.0001
                    ? `would fall ${percent(-change)} from ${formatter(
                        baseline,
                      )} to ${formatter(reform)}`
                    : `would remain at ${percent(baseline)}`
              }.`;
              setHoverCard({
                title: data.points[0].x,
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

function title(cliffShareChange, cliffGapChange, metadata, policyLabel) {
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const regionLabel =
    region === "us" || region === "uk"
      ? ""
      : " in " + options.find((option) => option.value === region)?.label;

  return `${policyLabel} ${
    cliffShareChange === 0 && cliffGapChange === 0
      ? "wouldn't affect cliffs"
      : cliffShareChange >= 0 && cliffGapChange >= 0
        ? "would make cliffs more prevalent"
        : cliffShareChange <= 0 && cliffGapChange <= 0
          ? "would make cliffs less prevalent"
          : "would have an ambiguous effect on cliffs"
  } ${regionLabel}`;
}

function description(metadata) {
  return (
    <p style={{ marginTop: "10px" }}>
      The cliff rate is the share of households whose net income falls if each
      adult earned an additional {metadata.currency}2,000. The cliff gap is the
      sum of the losses incurred by all households on a cliff if their income
      rose in this way.{" "}
      <a href="https://policyengine.org/us/research/how-would-reforms-affect-cliffs">
        Read more about how PolicyEngine models the effect of reforms on cliffs.{" "}
      </a>
    </p>
  );
}

export default function cliffImpact(props) {
  const { impact, metadata, policyLabel, mobile, useHoverCard = false } = props;
  // The chart shows two bars: one for the relative change in the cliff share
  // and one for the relative change in the cliff gap.
  const cliffShareChange =
    Math.round(
      (impact.reform.cliff_share / impact.baseline.cliff_share - 1) * 100,
    ) / 100;
  const cliffGapChange =
    Math.round(
      (impact.reform.cliff_gap / impact.baseline.cliff_gap - 1) * 1000,
    ) / 1000;
  const chart = (
    <ImpactChart
      title={title(cliffShareChange, cliffGapChange, metadata, policyLabel)}
      description={description(metadata)}
    >
      <ImpactPlot
        impact={impact}
        cliffShareChange={cliffShareChange}
        cliffGapChange={cliffGapChange}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    if (impact === null) {
      return null;
    }
    const header = ["Metric", "Baseline", "Reform", "Change"];
    const data = [
      header,
      ...[
        {
          Metric: "Cliff rate",
          Baseline: impact.baseline.cliff_share,
          Reform: impact.reform.cliff_share,
          Change: cliffShareChange,
        },
        {
          Metric: "Cliff gap",
          Baseline: impact.baseline.cliff_gap,
          Reform: impact.reform.cliff_gap,
          Change: cliffGapChange,
        },
      ].map((row) => [row.Metric, row.Baseline, row.Reform, row.Change]),
    ];
    return data;
  };
  return { chart: chart, csv: csv };
}
