import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { formatPercent, localeCode, precision } from "../../../../lang/format";
import {
  ChartWidthContext,
  HoverCardContext,
} from "../../../../layout/HoverCard";
import style from "../../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { relativeChangeMessage } from "../ImpactChart";
import { title, description } from "./common";

export function ImpactPlot(props) {
  const {
    povertyType,
    povertyImpact,
    povertyLabels,
    povertyChanges,
    labelToKey,
    metadata,
    mobile,
    useHoverCard,
  } = props;
  const setHoverCard = useContext(HoverCardContext);
  const chartWidth = useContext(ChartWidthContext);
  const yvaluePrecision = Math.max(1, precision(povertyChanges, 100));
  const ytickPrecision = precision(povertyChanges.concat(0), 10);
  const formatPer = (n) =>
    formatPercent(n, metadata.countryId, {
      minimumFractionDigits: yvaluePrecision,
    });
  const hoverMessage = (x) => {
    const obj = `the percentage of ${
      x === "All" ? "people" : x.toLowerCase()
    } in ${povertyType}`;
    const baseline = povertyImpact[labelToKey[x]].baseline;
    const reform = povertyImpact[labelToKey[x]].reform;
    const change = reform / baseline - 1;
    return relativeChangeMessage("This reform", obj, change, 0.001, metadata, {
      baseline: baseline,
      reform: reform,
      formatter: formatPer,
    });
  };

  return (
    <Plot
      data={[
        {
          x: povertyLabels,
          y: povertyChanges,
          type: "bar",
          marker: {
            color: povertyChanges.map((value) =>
              value < 0 ? style.colors.BLUE : style.colors.DARK_GRAY,
            ),
          },
          text: povertyChanges.map(
            (value) => (value >= 0 ? "+" : "") + formatPer(value),
          ),
          textangle: 0,
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: povertyLabels.map(hoverMessage),
                hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
              }),
        },
      ]}
      layout={{
        yaxis: {
          title: `Relative change in ${povertyType} rate`,
          tickformat: `+,.${ytickPrecision}%`,
          fixedrange: true,
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
          minsize: 8,
        },
        ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
        margin: {
          t: 0,
          b: 100,
          r: 0,
        },
        height: mobile ? 300 : 500,
        width: chartWidth,
        ...plotLayoutFont,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
        locale: localeCode(metadata.countryId),
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

export default function povertyImpact(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const povertyImpact = impact.poverty.poverty;
  const childPovertyChange =
    povertyImpact.child.reform / povertyImpact.child.baseline - 1;
  const adultPovertyChange =
    povertyImpact.adult.reform / povertyImpact.adult.baseline - 1;
  const seniorPovertyChange =
    povertyImpact.senior.reform / povertyImpact.senior.baseline - 1;
  const totalPovertyChange =
    povertyImpact.all.reform / povertyImpact.all.baseline - 1;
  const povertyChanges = [
    childPovertyChange,
    adultPovertyChange,
    seniorPovertyChange,
    totalPovertyChange,
  ];
  const povertyLabels = ["Children", "Working-age adults", "Seniors", "All"];
  const labelToKey = {
    Children: "child",
    "Working-age adults": "adult",
    Seniors: "senior",
    All: "all",
  };
  const chart = (
    <ImpactChart
      title={title(
        policyLabel,
        false,
        povertyImpact.all.baseline,
        povertyImpact.all.reform,
        metadata,
      )}
      description={description(metadata.countryId, false)}
    >
      <ImpactPlot
        povertyType={"poverty"}
        povertyImpact={povertyImpact}
        povertyLabels={povertyLabels}
        povertyChanges={povertyChanges}
        labelToKey={labelToKey}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    const header = ["Age Group", "Baseline", "Reform", "Change"];
    const data = [
      header,
      ...povertyLabels.map((label) => {
        const baseline = povertyImpact[labelToKey[label]].baseline;
        const reform = povertyImpact[labelToKey[label]].reform;
        const change = reform / baseline - 1;
        return [label, baseline, reform, change];
      }),
    ];
    return data;
  };
  return { chart: chart, csv: csv };
}
