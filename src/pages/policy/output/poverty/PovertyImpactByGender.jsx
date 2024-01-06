import React, { useContext, useEffect } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { formatPercent, localeCode } from "../../../../lang/format";
import { HoverCardContext } from "../../../../layout/HoverCard";
import style from "../../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import {
  PovertyChangeContext,
  PovertyChangeProvider,
} from "./PovertyChangeContext";
import ImpactChart, { relativeChangeMessage } from "../ImpactChart";
import { title, description } from "./common";

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
        : genderImpact[labelToKey[x]].baseline;
    const reform =
      x === "All"
        ? allImpact[labelToKey[x]].reform
        : genderImpact[labelToKey[x]].reform;
    const obj = `the percentage of ${
      x === "All" ? "people" : { male: "men", female: "women" }[x.toLowerCase()]
    } in ${povertyType}`;
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
          title: `Relative change in ${povertyType} rate`,
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
  const povertyLabels = ["Male", "Female", "All"];
  const labelToKey = {
    Male: "male",
    Female: "female",
    All: "all",
  };
  const chart = (
    <PovertyChangeProvider>
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
          povertyType={"poverty"}
          genderImpact={genderImpact}
          allImpact={allImpact}
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
  return {
    chart: chart,
    csv: () => csv(genderImpact, allImpact, povertyLabels, labelToKey),
  };
}
