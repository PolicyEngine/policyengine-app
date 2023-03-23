import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency } from "../../../api/language";
import HoverCard from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";

export default function BudgetaryImpact(props) {
  const { impact, policyLabel, metadata } = props;

  const budgetaryImpact = impact.budget.budgetary_impact;
  const taxImpact = impact.budget.tax_revenue_impact;
  const spendingImpact = impact.budget.benefit_spending_impact;

  const [hovercard, setHoverCard] = useState(null);
  const mobile = useMobile();

  // Waterfall chart
  const chart = (
    <Plot
      data={[
        {
          x: mobile
            ? ["Tax", "Benefit", "Net"]
            : ["Tax revenues", "Benefit spending", "Net budgetary impact"],
          y: [taxImpact / 1e9, -spendingImpact / 1e9, -budgetaryImpact / 1e9],
          type: "waterfall",
          orientation: "v",
          measure: ["relative", "relative", "total"],
          textposition: "inside",
          text: [
            aggregateCurrency(-taxImpact, metadata),
            aggregateCurrency(spendingImpact, metadata),
            aggregateCurrency(budgetaryImpact, metadata),
          ],
          increasing: { marker: { color: style.colors.DARK_GREEN } },
          decreasing: { marker: { color: style.colors.DARK_GRAY } },
          // Total should be dark gray if negative, dark green if positive
          totals: {
            marker: {
              color:
                budgetaryImpact < 0
                  ? style.colors.DARK_GRAY
                  : style.colors.DARK_GREEN,
            },
          },
          connector: { line: { color: style.colors.DARK_GRAY } },
          hoverinfo: "none",
        },
      ]}
      layout={{
        xaxis: {
          title: "",
        },
        yaxis: {
          title: "Budgetary impact (bn)",
          tickprefix: metadata.currency,
          tickformat: ",.1f",
        },
        uniformtext: {
          mode: "hide",
          minsize: 12,
        },
        ...ChartLogo,
        margin: {
          t: 0,
          b: 100,
          r: 0,
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
        const label = data.points[0].x;
        const relevantFigure =
          label === "Tax revenues"
            ? -taxImpact
            : label === "Benefit spending"
            ? spendingImpact
            : budgetaryImpact;
        let body = null;
        if (label === "Tax revenues") {
          // 'This reform reduces/increases tax revenues by £X/This reform has no impact on tax revenues'
          body =
            relevantFigure < 0
              ? `This reform would increase tax revenues by ${aggregateCurrency(
                  relevantFigure,
                  metadata
                )}.`
              : relevantFigure > 0
              ? `This reform would reduce tax revenues by ${aggregateCurrency(
                  -relevantFigure,
                  metadata
                )}.`
              : "This reform would not impact tax revenues.";
        } else if (label === "Benefit spending") {
          // 'This reform reduces/increases benefit spending by £X/This reform has no impact on benefit spending'
          body =
            relevantFigure > 0
              ? `This reform would increase benefit spending by ${aggregateCurrency(
                  relevantFigure,
                  metadata
                )}.`
              : relevantFigure < 0
              ? `This reform would reduce benefit spending by ${aggregateCurrency(
                  -relevantFigure,
                  metadata
                )}.`
              : "This reform would not impact benefit spending.";
        } else {
          // 'This reform reduces/increases the budget deficit by £X/This reform has no impact on the budget deficit'
          body =
            relevantFigure < 0
              ? `This reform would increase the budget deficit by ${aggregateCurrency(
                  relevantFigure,
                  metadata
                )}.`
              : relevantFigure > 0
              ? `This reform would reduce the budget deficit by ${aggregateCurrency(
                  -relevantFigure,
                  metadata
                )}.`
              : "This reform would not impact the budget deficit.";
        }
        setHoverCard({
          title: label,
          body: body,
        });
      }}
      onUnhover={() => {
        setHoverCard(null);
      }}
    />
  );

  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel}
          {" would "}
          {budgetaryImpact > 0 ? "raise " : "cost "}
          {aggregateCurrency(budgetaryImpact, metadata)}
          {" this year"}
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
    </>
  );
}
