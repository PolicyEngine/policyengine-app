import React from "react";
import ImpactChart from "../ImpactChart";
import { ImpactPlot, csv, title } from "./IntraDecileImpact";
import { description } from "./common";

export default function intraWealthDecileImpact(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const deciles = impact.intra_wealth_decile.deciles;
  const all = impact.intra_wealth_decile.all;
  const decileNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const chart = (
    <ImpactChart
      title={title(policyLabel, all, metadata)}
      description={description(metadata.countryId, true)}
    >
      <ImpactPlot
        yaxistitle={"Wealth decile"}
        deciles={deciles}
        all={all}
        decileNumbers={decileNumbers}
        policyLabel={policyLabel}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  return {
    chart: chart,
    csv: () => csv(deciles, all, decileNumbers),
  };
}
