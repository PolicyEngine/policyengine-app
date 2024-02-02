import React from "react";
import ImpactChart from "../ImpactChart";
import { ImpactPlot, csv } from "./PovertyImpactByGender";
import { title, description } from "./common";

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
  const chart = (
    <ImpactChart
      title={title(
        policyLabel,
        true,
        allImpact.all.baseline,
        allImpact.all.reform,
        metadata,
      )}
      description={description(metadata.countryId, true)}
    >
      <ImpactPlot
        povertyType={"deep poverty"}
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
  );
  return {
    chart: chart,
    csv: (filename) =>
      csv(genderImpact, allImpact, povertyLabels, labelToKey, filename),
  };
}
