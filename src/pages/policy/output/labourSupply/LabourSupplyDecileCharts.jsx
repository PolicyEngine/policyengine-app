import ImpactChart from "../ImpactChart";
import Plot from "react-plotly.js";
import style from "../../../../style";
import { formatCurrencyAbbr, localeCode } from "../../../../lang/format";
import { ChartLogo } from "../../../../api/charts";
import { plotLayoutFont } from "../utils";

export function LabourSupplyDecileIncome(props) {

  const { 
    title,
    incomeChanges,
    countryId,
    description
  } = props;

  return (
    <ImpactChart
      title={title}
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
                  formatCurrencyAbbr(value, countryId, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
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
            locale: localeCode(countryId),
          }}
          style={{
            width: "100%",
          }}
        />
      }
      <p>
        {description}
      </p>
    </ImpactChart>
  );
}