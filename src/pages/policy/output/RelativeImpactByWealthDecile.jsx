import React from "react";
import ImpactChart from "./ImpactChart";
import { ImpactPlot, title } from "./RelativeImpactByDecile";

const description = (
  <p>
    The chart above shows the relative change in income for each wealth decile.
    Households are sorted into ten equally-populated groups according to their
    equivalised household net wealth.
  </p>
);

export default function relativeImpactByWealthDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const wealthDecileRelative = impact.wealth_decile.relative;
  const relativeChange =
    -impact.budget.budgetary_impact / impact.budget.baseline_net_income;
  const chart = (
    <ImpactChart
      title={title(policyLabel, relativeChange, metadata)}
      description={description}
    >
      <ImpactPlot
        decileType={"wealth decile"}
        xaxisTitle={"Wealth decile"}
        decileRelative={wealthDecileRelative}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    const header = ["Wealth Decile", "Relative Change"];
    const data = [
      header,
      ...Object.entries(wealthDecileRelative).map(
        ([decile, relativeChange]) => {
          return [decile, relativeChange];
        },
      ),
    ];
    return data;
  };
  return { chart: chart, csv: csv };
}
