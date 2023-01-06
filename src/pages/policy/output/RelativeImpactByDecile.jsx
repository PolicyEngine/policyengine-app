import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";
import HoverCard from "../../../layout/HoverCard";
import { cardinal, percent } from "../../../api/language";
import useMobile from "../../../layout/Responsive";

export default function RelativeImpactByDecile(props) {
  const { impact, policyLabel } = props;
  const [hovercard, setHoverCard] = useState(null);
  const mobile = useMobile();
  // Decile bar chart. Bars are grey if negative, green if positive.
  const chart = (
    <Plot
      data={[
        {
          x: Object.keys(impact.decile.relative),
          y: Object.values(impact.decile.relative),
          type: "bar",
          marker: {
            color: Object.values(impact.decile.relative).map((value) =>
              value < 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN
            ),
          },
          text: Object.values(impact.decile.relative).map(
            (value) =>
              (value >= 0 ? "+" : "") +
              (value * 100).toFixed(1).toString() +
              "%"
          ),
          textangle: 0,
          hoverinfo: "none",
        },
      ]}
      layout={{
        xaxis: {
          title: "Income decile",
          tickvals: Object.keys(impact.decile.relative),
        },
        yaxis: {
          title: "Relative change",
          tickformat: "+,.0%",
        },
        uniformtext: {
          mode: "hide",
          minsize: 8,
        },
        showlegend: false,
        ...ChartLogo,
        margin: {
          t: 0,
          b: 80,
          r: 20,
          l: 60,
        },
        height: mobile ? 300 : 500,
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
        const relativeChange = data.points[0].y;
        const message =
          relativeChange > 0.001 ?
            `This reform raises the income of households in the ${decile} decile by an average of ${percent(relativeChange)}.` :
            relativeChange < -0.001 ?
              `This reform lowers the income of households in the ${decile} decile by an average of ${percent(-relativeChange)}.` :
              `This reform has no impact on the income of households in the ${decile} decile.`;
        setHoverCard({
          title: `Decile ${data.points[0].x}`,
          body: message,
        });
      }}
    />
  );

  const averageRelChange =
    Object.values(impact.decile.relative).reduce((a, b) => a + b, 0) /
    Object.values(impact.decile.relative).length;

  return (
    <>
      <h2>
        {policyLabel} {averageRelChange >= 0 ? "increases" : "decreases"} the
        average household's net income by{" "}
        {formatVariableValue({ unit: "/1" }, Math.abs(averageRelChange), 1)}
      </h2>
      <HoverCard
        content={hovercard}
      >
        {chart}
      </HoverCard>
      <p>
        The chart above shows the relative change in income for each income
        decile. Households are sorted into ten equally-populated groups according to
        their equivalised household net income.
      </p>
    </>
  );
}
