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

export function ImpactPlot(props) {
  const {
    povertyType,
    povertyImpact,
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
                  const baseline = povertyImpact[labelToKey[group]].baseline;
                  const reform = povertyImpact[labelToKey[group]].reform;
                  return `The percentage of ${
                    group === "All" ? "people" : group.toLowerCase()
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
              const group = data.points[0].x;
              const change = data.points[0].y;
              const baseline = povertyImpact[labelToKey[group]].baseline;
              const reform = povertyImpact[labelToKey[group]].reform;
              const message = `The percentage of ${
                group === "All" ? "people" : group.toLowerCase()
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
                        ` by less than 0.1%.`
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
  const povertyRateChange = percent(Math.abs(totalPovertyChange));
  const percentagePointChange =
    Math.round(
      Math.abs(
        impact.poverty.poverty.all.reform - impact.poverty.poverty.all.baseline,
      ) * 1000,
    ) / 10;
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
          povertyImpact={povertyImpact}
          povertyLabels={povertyLabels}
          povertyChanges={povertyChanges}
          labelToKey={labelToKey}
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
