import { useContext } from "react";
import Plot from "react-plotly.js";
import PolicyEngineContext from "../../../../logic/PolicyEngineContext";
import style from "../../../../style";
import ResultsPanel from "../../../layout/ResultsPanel";

export default function BudgetaryImpact(props) {
  const PolicyEngine = useContext(PolicyEngineContext);
  const impact = PolicyEngine.reformImpact;
  const currency = PolicyEngine.currency;
  const formatAggregate = (value) => {
    // E.g. 12,354,353,353 -> £12.4bn
    const suffixes = ["", "k", "m", "bn", "tr"];
    let suffixIndex = 0;
    while (value > 1_000 && suffixIndex < suffixes.length - 1) {
      value /= 1_000;
      suffixIndex++;
    }
    return `${currency}${value.toFixed(1)}${suffixes[suffixIndex]}`;
  };
  const title =
    impact.budgetary_impact.budgetary_impact > 0
      ? `Your reform produces a ${formatAggregate(
          impact.budgetary_impact.budgetary_impact
        )} surplus`
      : `Your reform produces a ${formatAggregate(
          -impact.budgetary_impact.budgetary_impact
        )} deficit`;
  const description = `Tax revenues ${
    impact.budgetary_impact.tax_revenue_impact > 0 ? "rises" : "falls"
  } by ${formatAggregate(
    Math.abs(impact.budgetary_impact.tax_revenue_impact)
  )} and benefit expenditure ${
    impact.budgetary_impact.benefit_spending_impact > 0 ? "rises" : "falls"
  } by ${formatAggregate(
    Math.abs(impact.budgetary_impact.benefit_spending_impact)
  )}`;

  // Show a Plotly chart with the budgetary impact
  // This should be in the form of a waterfall chart, with the tax revenue and benefit spending

  const plotValues = [
    impact.budgetary_impact.benefit_spending_impact / 1e9,
    -impact.budgetary_impact.tax_revenue_impact / 1e9,
    impact.budgetary_impact.budgetary_impact / 1e9,
  ];

  return (
    <>
      <ResultsPanel title={title} description={description}>
        <Plot
          data={[
            {
              x: ["Benefit spending", "Tax revenues", "Budgetary impact"],
              y: plotValues,
              type: "waterfall",
              measure: ["relative", "relative", "total"],
              decreasing: { marker: { color: style.colors.DARK_GREEN } },
              increasing: { marker: { color: style.colors.DARK_GRAY } },
              totals: {
                marker: {
                  color:
                    impact.budgetary_impact.budgetary_impact > 0
                      ? style.colors.DARK_GREEN
                      : style.colors.DARK_GRAY,
                },
              },
            },
          ]}
          layout={{
            xaxis: {
              title: "",
            },
            yaxis: {
              title: "Change in spending (billions)",
              tickformat: ",.1f",
            },
          }}
          config={{
            displayModeBar: false,
          }}
          style={{
            width: "100%",
            height: 400,
          }}
        />
      </ResultsPanel>
    </>
  );
}
