import React, { useContext, useEffect } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatNumber, formatPercent, localeCode } from "../../../lang/format";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import {
  PovertyChangeContext,
  PovertyChangeProvider,
} from "./PovertyChangeContext";
import ImpactChart, { regionName, relativeChangeMessage } from "./ImpactChart";

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
  const formatPer = (n) =>
    formatPercent(n, metadata.countryId, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
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

  const { minChange, maxChange, addChanges } = useContext(PovertyChangeContext);
  useEffect(() => {
    addChanges(povertyChanges);
  }, [povertyChanges, addChanges]);
  // Decile bar chart. Bars are grey if negative, green if positive.
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
          title: "Relative change",
          tickformat: "+,.1%",
          range: [Math.min(minChange, 0), Math.max(maxChange, 0)],
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

export function title(policyLabel, objectTerm, baseline, reform, metadata) {
  const relativeChange = reform / baseline - 1;
  const absoluteChange = Math.round(Math.abs(reform - baseline) * 1000) / 10;
  const relTerm = formatPercent(Math.abs(relativeChange), metadata.countryId, {
    maximumFractionDigits: 1,
  });
  const absTerm = formatNumber(absoluteChange, metadata.countryId, {
    maximumFractionDigits: 2,
  });
  const term2 = `${relTerm} (${absTerm}pp)`;
  const signTerm = relativeChange > 0 ? "increase" : "decrease";
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const msg =
    absTerm === 0
      ? `${policyLabel} would have no effect on ${objectTerm}${regionPhrase}`
      : `${policyLabel} would ${signTerm} ${objectTerm}${regionPhrase} by ${term2}`;
  return msg;
}

const description = (
  <p>
    The chart above shows the relative change in the poverty rate for each age
    group.
  </p>
);

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
    <PovertyChangeProvider>
      <ImpactChart
        title={title(
          policyLabel,
          "the poverty rate",
          povertyImpact.all.baseline,
          povertyImpact.all.reform,
          metadata,
        )}
        description={description}
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
    </PovertyChangeProvider>
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
