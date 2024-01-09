import React from "react";
import ImpactChart from "../ImpactChart";
import { ImpactPlot } from "./AverageImpactByDecile";
import { description, title } from "./common";

export default function averageImpactByWealthDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const wealthDecileAverage = impact.wealth_decile.average;
  const averageChange =
    -impact.budget.budgetary_impact / impact.budget.households;
  const chart = (
    <ImpactChart
      title={title(policyLabel, averageChange, true, metadata)}
      description={description(metadata.countryId, true)}
    >
      <ImpactPlot
        decileType={"wealth decile"}
        xaxisTitle={"Wealth decile"}
        decileAverage={wealthDecileAverage}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    const data = Object.entries(impact.wealth_decile.average).map(
      ([key, value]) => [`Decile ${key}`, value],
    );
    return data;
  };
  return { chart: chart, csv: csv };
}
