import React from "react";
import ImpactChart from "./ImpactChart";
import { ImpactPlot, title } from "./PovertyImpact";
import { PovertyChangeProvider } from "./PovertyChangeContext";

export default function deepPovertyImpact(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const deepPovertyImpact = impact.poverty.deep_poverty;
  const childPovertyChange =
    deepPovertyImpact.child.reform / deepPovertyImpact.child.baseline - 1;
  const adultPovertyChange =
    deepPovertyImpact.adult.reform / deepPovertyImpact.adult.baseline - 1;
  const seniorPovertyChange =
    deepPovertyImpact.senior.reform / deepPovertyImpact.senior.baseline - 1;
  const totalPovertyChange =
    deepPovertyImpact.all.reform / deepPovertyImpact.all.baseline - 1;
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
  const description = (
    <p>
      The chart above shows the relative change in the deep poverty rate for
      each age group.
    </p>
  );
  const chart = (
    <PovertyChangeProvider>
      <ImpactChart
        title={title(
          policyLabel,
          "the deep poverty rate",
          deepPovertyImpact.all.baseline,
          deepPovertyImpact.all.reform,
          metadata,
        )}
        description={description}
      >
        <ImpactPlot
          povertyType={"deep poverty"}
          povertyImpact={deepPovertyImpact}
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
      ...povertyLabels.map((label, index) => {
        return [
          label,
          deepPovertyImpact[labelToKey[label]].baseline,
          deepPovertyImpact[labelToKey[label]].reform,
          povertyChanges[index],
        ];
      }),
    ];
    return data;
  };
  return { chart: chart, csv: csv };
}
