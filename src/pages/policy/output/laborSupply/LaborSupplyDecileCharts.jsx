import ImpactChart from "../ImpactChart";
import Plot from "react-plotly.js";
import style from "../../../../style";
import { localeCode } from "../../../../lang/format";
import { ChartLogo } from "../../../../api/charts";
import { plotLayoutFont } from "../utils";

export function LaborSupplyDecileIncome(props) {
  const {
    title,
    incomeChanges,
    countryId,
    description,
    yAxisTitle,
    yAxisTickFormat,
    numberFormatter,
  } = props;

  return (
    <ImpactChart title={title}>
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
              text: incomeChanges.map((value) => numberFormatter(value)),
              name: "Income effect",
            },
          ]}
          layout={{
            xaxis: {
              title: "Household income decile",
              tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            yaxis: {
              title: yAxisTitle,
              tickformat: yAxisTickFormat,
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
      <p>{description}</p>
    </ImpactChart>
  );
}

export function LaborSupplyDecileSubstitution(props) {
  const {
    title,
    substitutionChanges,
    yAxisTitle,
    yAxisTickFormat,
    countryId,
    description,
    numberFormatter,
  } = props;

  return (
    <ImpactChart title={title}>
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
              text: substitutionChanges.map((value) => numberFormatter(value)),
              name: "Substitution effect",
            },
          ]}
          layout={{
            xaxis: {
              title: "Household income decile",
              tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            yaxis: {
              title: yAxisTitle,
              tickformat: yAxisTickFormat,
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
      <p>{description}</p>
    </ImpactChart>
  );
}

export function LaborSupplyDecileTotal(props) {
  const {
    title,
    yAxisTitle,
    yAxisTickFormat,
    description,
    countryId,
    overallChange,
    numberFormatter,
  } = props;

  return (
    <ImpactChart title={title}>
      {
        <Plot
          data={[
            {
              type: "bar",
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              y: overallChange,
              marker: {
                color: overallChange.map((value) =>
                  value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
                ),
              },
              text: overallChange.map((value) => numberFormatter(value)),
              name: "Overall change",
            },
          ]}
          layout={{
            xaxis: {
              title: "Household income decile",
              tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            yaxis: {
              title: yAxisTitle,
              tickformat: yAxisTickFormat,
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
      <p>{description}</p>
    </ImpactChart>
  );
}
