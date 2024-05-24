import style from "../../../style";
import ImpactChart from "./ImpactChart";
import Plot from "react-plotly.js";
import { formatPercent, localeCode } from "../../../lang/format";
import { ChartLogo } from "../../../api/charts";
import { plotLayoutFont } from "pages/policy/output/utils";

export default function LabourSupplyDecileRelativeImpactIncome(props) {
  const { policyLabel, metadata, impact, countryId } = props;

  const decileImpact = impact.labour_supply_response;

  const data = decileImpact.decile.relative;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const chart = (
    <ImpactChart
      title={`${policyLabel}'s income effect-driven relative labor supply impact by decile`}
    >
      {
        <Plot
          data={[
            {
              type: "bar",
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              y: incomeChanges,
              marker: {
                color: incomeChanges.map((value) =>
                  value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
                ),
              },
              text: incomeChanges.map(
                (value) =>
                  (value >= 0 ? "+" : "") +
                  formatPercent(value, countryId, {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  }),
              ),
              name: "Income effect",
            },
          ]}
          layout={{
            xaxis: {
              title: "Household income decile",
              tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            yaxis: {
              title: "Relative change",
              tickformat: ".1%",
              fixedrange: true,
            },
            uniformtext: {
              mode: "hide",
              minsize: 12,
            },
            ...ChartLogo(0.97, -0.15),
            margin: {
              t: 0,
              b: 100,
              r: 0,
            },
            height: 500,
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
        />
      }
      <p>
        This chart shows only the income effect-driven portion of 
        the estimated relative change in earnings (as a percentage
        of total earnings) for each disposable income decile.
      </p>
    </ImpactChart>
  );

  return { chart: chart, csv: () => {} };
}
