import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { formatPercent, localeCode } from "../../../../lang/format";
import { HoverCardContext } from "../../../../layout/HoverCard";
import style from "../../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { relativeChangeMessage } from "../ImpactChart";
import { title, description } from "./common";

function ImpactPlot(props) {
  const {
    raceImpact,
    allImpact,
    povertyLabels,
    povertyChanges,
    labelToKey,
    metadata,
    mobile,
    useHoverCard,
  } = props;
  const setHoverCard = useContext(HoverCardContext);
  const formatPer = (n) =>
    formatPercent(n, metadata.countryId, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  const hoverMessage = (x) => {
    const baseline =
      x === "All"
        ? allImpact[labelToKey[x]].baseline
        : raceImpact[labelToKey[x]].baseline;
    const reform =
      x === "All"
        ? allImpact[labelToKey[x]].reform
        : raceImpact[labelToKey[x]].reform;
    const change = reform / baseline - 1;
    const obj = `the percentage of ${
      x === "All" ? "people" : x.toLowerCase()
    } in poverty`;
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
          title: "Relative change in poverty rate",
          tickformat: "+,.1%",
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
        height: mobile ? 350 : 450,
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

export default function povertyImpactByRace(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const raceImpact = impact.poverty_by_race.poverty;
  const allImpact = impact.poverty.poverty;
  // white, black, hispanic, other
  const whitePovertyChange =
    raceImpact.white.reform / raceImpact.white.baseline - 1;
  const blackPovertyChange =
    raceImpact.black.reform / raceImpact.black.baseline - 1;
  const hispanicPovertyChange =
    raceImpact.hispanic.reform / raceImpact.hispanic.baseline - 1;
  const otherPovertyChange =
    raceImpact.other.reform / raceImpact.other.baseline - 1;
  const totalPovertyChange = allImpact.all.reform / allImpact.all.baseline - 1;
  const povertyChanges = [
    whitePovertyChange,
    blackPovertyChange,
    hispanicPovertyChange,
    otherPovertyChange,
    totalPovertyChange,
  ];
  const povertyLabels = [
    "White (non-Hispanic)",
    "Black (non-Hispanic)",
    "Hispanic",
    "Other",
    "All",
  ];
  const labelToKey = {
    "White (non-Hispanic)": "white",
    "Black (non-Hispanic)": "black",
    Hispanic: "hispanic",
    Other: "other",
    All: "all",
  };
  const chart = (
    <ImpactChart
      title={title(
        policyLabel,
        false,
        allImpact.all.baseline,
        allImpact.all.reform,
        metadata,
      )}
      description={description(metadata.countryId, false)}
    >
      <ImpactPlot
        raceImpact={raceImpact}
        allImpact={allImpact}
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
    const header = ["Race", "Baseline", "Reform", "Change"];
    const data = [
      header,
      ...povertyLabels.map((label) => {
        const baseline =
          label === "All"
            ? allImpact[labelToKey[label]].baseline
            : raceImpact[labelToKey[label]].baseline;
        const reform =
          label === "All"
            ? allImpact[labelToKey[label]].reform
            : raceImpact[labelToKey[label]].reform;
        const change = reform / baseline - 1;
        return [label, baseline, reform, change];
      }),
    ];
    return data;
  };
  return {
    chart: chart,
    csv: csv,
  };
}
