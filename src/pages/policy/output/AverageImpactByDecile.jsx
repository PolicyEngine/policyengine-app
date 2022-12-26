import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { cardinal } from "../../../api/language";
import { formatVariableValue } from "../../../api/variables";
import HoverCard from "../../../layout/HoverCard";
import style from "../../../style";

export default function AverageImpactByDecile(props) {
  const { impact, policyLabel, metadata } = props;
  // Decile bar chart. Bars are grey if negative, green if positive.
  const [hovercard, setHoverCard] = useState(null);
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
          hoverinfo: "none",
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
        ...ChartLogo,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
      }}
      onHover={(data) => {
        const decile = cardinal(data.points[0].x);
        const change = data.points[0].y;
        const message =
          change > 0.0001 ?
            `This reform raises the income of households in the ${decile} decile by an average of ${formatVariableValue(
              metadata.variables.household_net_income,
              change,
              0,
            )} per year.` :
            change < -0.0001 ?
              `This reform lowers the income of households in the ${decile} decile by an average of ${formatVariableValue(
                metadata.variables.household_net_income,
                -change,
                0,
              )} per year.` :
              `This reform has no impact on the income of households in the ${decile} decile.`;
        setHoverCard({
          title: `Decile ${data.points[0].x}`,
          body: message,
        });
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
        decile. Households are sorted into ten equally-populated groups according to
        their equivalised household net income.
      </p>
      <HoverCard
        content={hovercard}
      >
        {chart}
      </HoverCard>
    </>
  );
}
