import React from "react";
import { formatVariableValue } from "../../../api/variables";
import ImpactChart, { impactTitle } from "./ImpactChart";
import { ImpactPlot } from "./AverageImpactByDecile";

const description = (
  <p>
    The chart above shows the relative change in income for each wealth decile.
    Households are sorted into ten equally-populated groups according to their
    equivalised household net income.
  </p>
);

export default function averageImpactByWealthDecile(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const wealthDecileAverage = impact.wealth_decile.average;
  const averageImpactPerHousehold =
    -impact.budget.budgetary_impact / impact.budget.households;
  const chart = (
    <ImpactChart
      title={impactTitle(
        policyLabel,
        averageImpactPerHousehold,
        formatVariableValue(
          metadata.variables.household_net_income,
          Math.abs(averageImpactPerHousehold),
          0,
        ),
        "the net income of households",
        "on average",
        metadata,
      )}
      description={description}
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
