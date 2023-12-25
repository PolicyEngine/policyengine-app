import React from "react";
import { percent } from "../../../api/language";
import ImpactChart, { impactTitle } from "./ImpactChart";
import { ImpactPlot, csv } from "./PovertyImpactByGender";
import { PovertyChangeProvider } from "./PovertyChangeContext";

const description = (
  <p>
    The chart above shows the relative change in the deep poverty rate for each
    sex.
  </p>
);

export default function deepPovertyImpactByGender(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const genderImpact = impact.poverty_by_gender.deep_poverty;
  const allImpact = impact.poverty.deep_poverty;
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
  const povertyRateChange = percent(Math.abs(totalPovertyChange));
  const percentagePointChange =
    Math.round(Math.abs(allImpact.all.reform - allImpact.all.baseline) * 1000) /
    10;
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
          povertyType={"deep poverty"}
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
    csv: (filename) =>
      csv(genderImpact, allImpact, povertyLabels, labelToKey, filename),
  };
}
