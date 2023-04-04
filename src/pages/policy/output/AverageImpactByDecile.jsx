import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { cardinal } from "../../../api/language";
import { formatVariableValue } from "../../../api/variables";
import HoverCard from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";

export default function AverageImpactByDecile(props) {
  const { impact, policyLabel, metadata } = props;
  // Decile bar chart. Bars are grey if negative, green if positive.
  const [hovercard, setHoverCard] = useState(null);
  const mobile = useMobile();
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
          minsize: mobile ? 4 : 8,
        },
        ...ChartLogo,
        margin: {
          t: 0,
          b: 80,
          l: 60,
          r: 20,
        },
        height: mobile ? 300 : 500,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
        marginBottom: !mobile && 50,
      }}
      onHover={(data) => {
        const decile = cardinal(data.points[0].x);
        const change = data.points[0].y;
        const message =
          change > 0.0001
            ? `This reform raises the income of households in the ${decile} decile by an average of ${formatVariableValue(
                metadata.variables.household_net_income,
                change,
                0
              )} per year.`
            : change < -0.0001
            ? `This reform lowers the income of households in the ${decile} decile by an average of ${formatVariableValue(
                metadata.variables.household_net_income,
                -change,
                0
              )} per year.`
            : `This reform has no impact on the income of households in the ${decile} decile.`;
        setHoverCard({
          title: `Decile ${data.points[0].x}`,
          body: message,
        });
      }}
      onUnhover={() => {
        setHoverCard(null);
      }}
    />
  );

  const averageChange =
    -impact.budget.budgetary_impact / impact.budget.households;

  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel}{" "}
          {averageChange >= 0 ? "would increase" : "would decrease"} the average
          household&apos;s net income by{" "}
          {formatVariableValue(
            metadata.variables.household_net_income,
            Math.abs(averageChange),
            0
          )}
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
      <p>
        The chart above shows the relative change in income for each income
        decile. Households are sorted into ten equally-populated groups
        according to their equivalised household net income.
      </p>
    </>
  );
}
