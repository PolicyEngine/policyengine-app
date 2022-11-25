import Plot from "react-plotly.js";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";

export default function AverageImpactByDecile(props) {
  const { impact, policyLabel, metadata } = props;
  // Decile bar chart. Bars are grey if negative, green if positive.
  const chart = (
    <Plot
      data={[
        {
          x: Object.keys(impact.decile.average),
          y: Object.values(impact.decile.average),
          type: "bar",
          marker: {
            color: Object.values(impact.decile.average).map((value) =>
              value < 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN
            ),
          },
          text: Object.values(impact.decile.average).map(
            (value) =>
              metadata.currency +
              value.toLocaleString("en-GB", { maximumFractionDigits: 0 })
          ),
          textangle: 0,
        },
      ]}
      layout={{
        xaxis: {
          title: "Income decile",
          tickvals: Object.keys(impact.decile.average),
        },
        yaxis: {
          title: "Average change",
          tickprefix: metadata.countryId === "uk" ? "£" : "$",
          tickformat: ",.0f",
        },
        showlegend: false,
        uniformtext: {
          mode: "hide",
          minsize: 8,
        },
      }}
      config={{
        displayModeBar: false,
      }}
      style={{
        width: "100%",
      }}
    />
  );

  const averageChange =
    Object.values(impact.decile.average).reduce((a, b) => a + b, 0) /
    Object.values(impact.decile.average).length;

  return (
    <>
      <h2>
        {policyLabel} {averageChange >= 0 ? "increases" : "decreases"} the
        average household's net income by{" "}
        {formatVariableValue(
          metadata.variables.household_net_income,
          Math.abs(averageChange),
          0
        )}
      </h2>
      <p>
        The chart below shows the relative change in income for each income
        decile.
      </p>
      {chart}
      <p>
        Households are sorted into ten equally-populated groups according to
        their equivalised household net income.
      </p>
    </>
  );
}
