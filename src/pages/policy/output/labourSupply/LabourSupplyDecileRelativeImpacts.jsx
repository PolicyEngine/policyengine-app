import style from "../../../../style";
import ImpactChart from "../ImpactChart";
import Plot from "react-plotly.js";
import { formatPercent, localeCode } from "../../../../lang/format";
import { ChartLogo } from "../../../../api/charts";
import { plotLayoutFont } from "pages/policy/output/utils";

import { LabourSupplyDecileIncome } from "./LabourSupplyDecileCharts";

export function LabourSupplyDecileRelativeImpactIncome(props) {
  const { policyLabel, metadata, impact, countryId } = props;

  const decileImpact = impact.labour_supply_response;

  const data = decileImpact.decile.relative;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const title=`${policyLabel}'s income effect-driven relative labor supply impact by decile`;
  const description = "This chart shows only the income effect-driven portion of " + 
    "the estimated relative change in earnings (as a percentage " + 
    "of total earnings) for each disposable income decile.";

  const chart = (
    <LabourSupplyDecileIncome
      title={title}
      incomeChanges={incomeChanges}
      countryId={countryId}
      description={description}
    />);

  return { chart: chart, csv: () => {} };
}
