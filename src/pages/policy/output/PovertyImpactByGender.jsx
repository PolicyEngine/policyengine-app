import React, { useContext, useEffect } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import {
  PovertyChangeContext,
  PovertyChangeProvider,
} from "./PovertyChangeContext";
import ImpactChart, { impactTitle } from "./ImpactChart";

// this function is called in this file with povertyType={"poverty"} from
// DeepPovertyImpactByGender with povertyType={"deep poverty"}
export function ImpactPlot(props) {
  const {
    povertyType,
    genderImpact,
    allImpact,
    povertyLabels,
    povertyChanges,
    labelToKey,
    mobile,
    useHoverCard,
  } = props;
  const setHoverCard = useContext(HoverCardContext);
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
                customdata: povertyLabels.map((x, i) => {
                  const group = x;
                  const change = povertyChanges[i];
                  const baseline =
                    group === "All"
                      ? allImpact[labelToKey[group]].baseline
                      : genderImpact[labelToKey[group]].baseline;
                  const reform =
                    group === "All"
                      ? allImpact[labelToKey[group]].reform
                      : genderImpact[labelToKey[group]].reform;
                  return `The percentage of ${
                    group === "All"
                      ? "people"
                      : { male: "men", female: "women" }[group.toLowerCase()]
                  } in ${povertyType}<br>${
                    change < -0.001
                      ? `would fall ${percent(-change)} from ${percent(
                          baseline,
                        )} to ${percent(reform)}.`
                      : change > 0.001
                        ? `would rise ${percent(change)} from ${percent(
                            baseline,
                          )} to ${percent(reform)}.`
                        : change === 0
                          ? `would remain at ${percent(baseline)}.`
                          : (change > 0 ? "would rise " : "would fall ") +
                            `by less than 0.1%.`
                  }`;
                }),
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
        height: mobile ? 350 : 450,
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
              const group = data.points[0].x;
              const change = data.points[0].y;
              const baseline =
                group === "All"
                  ? allImpact[labelToKey[group]].baseline
                  : genderImpact[labelToKey[group]].baseline;
              const reform =
                group === "All"
                  ? allImpact[labelToKey[group]].reform
                  : genderImpact[labelToKey[group]].reform;
              const message = `The percentage of ${
                group === "All"
                  ? "people"
                  : { male: "men", female: "women" }[group.toLowerCase()]
              } in ${povertyType} ${
                change < -0.001
                  ? `would fall ${percent(-change)} from ${percent(
                      baseline,
                    )} to ${percent(reform)}.`
                  : change > 0.001
                    ? `would rise ${percent(change)} from ${percent(
                        baseline,
                      )} to ${percent(reform)}.`
                    : change === 0
                      ? `would remain at ${percent(baseline)}.`
                      : (change > 0 ? "would rise " : "would fall ") +
                        `by less than 0.1%.`
              }`;
              setHoverCard({
                title: group,
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

export function csv(genderImpact, allImpact, povertyLabels, labelToKey) {
  const header = ["Sex", "Baseline", "Reform", "Change"];
  const data = [
    header,
    ...povertyLabels.map((label) => {
      const baseline =
        label === "All"
          ? allImpact[labelToKey[label]].baseline
          : genderImpact[labelToKey[label]].baseline;
      const reform =
        label === "All"
          ? allImpact[labelToKey[label]].reform
          : genderImpact[labelToKey[label]].reform;
      const change = reform / baseline - 1;
      return [label, baseline, reform, change];
    }),
  ];
  return data;
}

const description = (
  <p>
    The chart above shows the relative change in the poverty rate for each sex.
  </p>
);

export default function povertyImpactByGender(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const genderImpact = impact.poverty_by_gender.poverty;
  const allImpact = impact.poverty.poverty;
  const malePovertyChange =
    genderImpact.male.reform / genderImpact.male.baseline - 1;
  const femalePovertyChange =
    genderImpact.female.reform / genderImpact.female.baseline - 1;
  const totalPovertyChange = allImpact.all.reform / allImpact.all.baseline - 1;
  const povertyChanges = [
    malePovertyChange,
    femalePovertyChange,
    totalPovertyChange,
  ];
  const povertyRateChange = percent(Math.abs(totalPovertyChange));
  const percentagePointChange =
    Math.round(Math.abs(allImpact.all.reform - allImpact.all.baseline) * 1000) /
    10;
  const povertyLabels = ["Male", "Female", "All"];
  const labelToKey = {
    Male: "male",
    Female: "female",
    All: "all",
  };
  const title = impactTitle(
    policyLabel,
    totalPovertyChange,
    `${povertyRateChange} (${percentagePointChange}pp)`,
    "the poverty rate",
    "",
    metadata,
  );
  const chart = (
    <PovertyChangeProvider>
      <ImpactChart title={title} description={description}>
        <ImpactPlot
          povertyType={"poverty"}
          genderImpact={genderImpact}
          allImpact={allImpact}
          povertyLabels={povertyLabels}
          povertyChanges={povertyChanges}
          labelToKey={labelToKey}
          mobile={mobile}
          useHoverCard={useHoverCard}
        />
      </ImpactChart>
    </PovertyChangeProvider>
  );
  return {
    chart: chart,
    csv: () => csv(genderImpact, allImpact, povertyLabels, labelToKey),
  };
}
