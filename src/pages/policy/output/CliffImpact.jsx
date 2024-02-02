import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import {
  formatCurrencyAbbr,
  formatPercent,
  localeCode,
  precision,
} from "../../../lang/format";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { regionName, wordWrap } from "./ImpactChart";

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
  const xArray = ["Cliff rate", "Cliff gap"];
  const yArray = [cliffShareChange, cliffGapChange];
  const yPrecision = Math.max(1, precision(yArray, 100));
  const formatPer = (x) =>
    formatPercent(x, metadata.countryId, {
      minimumFractionDigits: yPrecision,
    });
  const formatCur = (x) =>
    formatCurrencyAbbr(x, metadata.countryId, {
      maximumFractionDigits: 1,
    });
  const hoverMessage = (x) => {
    const baseline =
      x === "Cliff rate"
        ? impact.baseline.cliff_share
        : impact.baseline.cliff_gap;
    const reform =
      x === "Cliff rate" ? impact.reform.cliff_share : impact.reform.cliff_gap;
    const change = reform / baseline - 1;
    const formatter = x === "Cliff rate" ? formatPer : formatCur;
    const tolerance = 0.0001;
    const baselineReformTerm = ` from ${formatter(baseline)} to ${formatter(
      reform,
    )}`;
    const objectTerm = x.toLowerCase();
    const signTerm =
      change > tolerance
        ? `increase ${objectTerm} by ${formatPer(change) + baselineReformTerm}`
        : change > 0
          ? `increase ${objectTerm} by less than ${formatPer(tolerance)}`
          : change < -tolerance
            ? `decrease ${objectTerm} by ${
                formatPer(-change) + baselineReformTerm
              }`
            : change < 0
              ? `decrease ${objectTerm} by less than ${formatPer(tolerance)}`
              : `have no effect on ${objectTerm}`;
    const msg = `This reform would ${signTerm}`;
    return wordWrap(msg, 50).replaceAll("\n", "<br>");
  };
  return (
    <Plot
      data={[
        {
          x: xArray,
          y: yArray,
          type: "bar",
          marker: {
            color: [
              cliffShareChange > 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
              cliffGapChange > 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
            ],
          },
          text: [
            (cliffShareChange >= 0 ? "+" : "") + formatPer(cliffShareChange),
            (cliffGapChange >= 0 ? "+" : "") + formatPer(cliffGapChange),
          ],
          textposition: "auto",
          textangle: 0,
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: xArray.map((x, i) => hoverMessage(x, yArray[i])),
                hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
              }),
        },
      ]}
      layout={{
        yaxis: {
          title: "Relative change",
          tickformat: `+,.${yPrecision}%`,
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
        locale: localeCode(metadata.countryId),
      }}
      style={{
        width: "100%",
      }}
      {...(useHoverCard
        ? {
            onHover: (data) => {
              const x = data.points[0].x;
              const y = yArray[xArray.indexOf(x)];
              setHoverCard({
                title: x,
                body: hoverMessage(x, y),
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
  const signTerm =
    cliffShareChange === 0 && cliffGapChange === 0
      ? "wouldn't affect cliffs"
      : cliffShareChange >= 0 && cliffGapChange >= 0
        ? "would make cliffs more prevalent"
        : cliffShareChange <= 0 && cliffGapChange <= 0
          ? "would make cliffs less prevalent"
          : "would have an ambiguous effect on cliffs";
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const msg = `${policyLabel} ${signTerm}${regionPhrase}`;
  return msg;
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
      (impact.reform.cliff_share / impact.baseline.cliff_share - 1) * 10000,
    ) / 10000;
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
