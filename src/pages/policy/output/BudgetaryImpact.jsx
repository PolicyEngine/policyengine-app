import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency } from "../../../api/language";
import style from "../../../style";

export default function BudgetaryImpact(props) {
  const { impact, policyLabel, metadata } = props;

  const budgetaryImpact = impact.budget.budgetary_impact;
  const taxImpact = impact.budget.tax_revenue_impact;
  const spendingImpact = impact.budget.benefit_spending_impact;

  // Waterfall chart
  const chart = (
    <Plot
      data={[
        {
          x: ["Tax revenues", "Benefit spending", "Net budgetary impact"],
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
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
      }}
    />
  );

  return (
    <>
      <h2>
        {policyLabel}
        {" would "}
        {budgetaryImpact > 0 ? "raise " : "cost "}
        {aggregateCurrency(budgetaryImpact, metadata)}
        {" this year"}
      </h2>
      <p>
        The chart below shows how this is broken down between tax and benefit
        measures.
      </p>
      {chart}
    </>
  );
}
