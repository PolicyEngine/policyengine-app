import style from "../../../style";
import ImpactChart from "./ImpactChart";
import Plot from "react-plotly.js";
import { formatCurrencyAbbr, localeCode } from "../../../lang/format";
import { ChartLogo } from "../../../api/charts";
import { plotLayoutFont } from "pages/policy/output/utils";

export default function LabourSupplyDecileAbsoluteImpactSubstitution(props) {
  const { policyLabel, metadata, impact, countryId } = props;

  const decileImpact = impact.labour_supply_response;

  const data = decileImpact.decile.average;

  const incomeChanges = Object.values(data.income).slice(0, 10);
  let substitutionChanges = Object.values(data.substitution).slice(0, 10);
  const overallChange = [];
  for (let i = 0; i < 10; i++) {
    overallChange.push(incomeChanges[i] + substitutionChanges[i]);
  }

  const chart = (
    <ImpactChart
      title={`${policyLabel}'s absolute labor supply impact by decile`}
    >
      {
        <Plot
          data={[
            {
              type: "bar",
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              y: substitutionChanges,
              marker: {
                color: substitutionChanges.map((value) =>
                  value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
                ),
              },
              text: substitutionChanges.map(
                (value) =>
                  (value >= 0 ? "+" : "") +
                  formatCurrencyAbbr(value, countryId, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }),
              ),
              name: "Substitution effect",
            },
          ]}
          layout={{
            xaxis: {
              title: "Household income decile",
              tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            yaxis: {
              title: "Change in earnings",
              tickformat: "$,.0f",
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
        This chart shows the estimated substitution effect-driven 
        absolute change in earnings (in {`${countryId === "uk" ? "pounds" : "dollars"}`}) 
        for each disposable income decile.
      </p>
    </ImpactChart>
  );

  return { chart: chart, csv: () => {} };
}
