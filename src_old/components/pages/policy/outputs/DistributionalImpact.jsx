import { useContext } from "react";
import Plot from "react-plotly.js";
import PolicyEngineContext from "../../../../logic/PolicyEngineContext";
import style from "../../../../style";
import ResultsPanel from "../../../layout/ResultsPanel";

export default function DistributionalImpact() {
  const PolicyEngine = useContext(PolicyEngineContext);
  const impact = PolicyEngine.reformImpact;
  const decileImpact = impact.decile_impact;
  // decileImpact = { 1: -0.1, 2: -0.05, ... }
  // Show a Plotly chart with the decile impact

  // positive bars are green, negative bars are grey

  return (
    <ResultsPanel
      title="Distributional impact"
      description="The chart below shows the impact of your reform on each decile of the population."
    >
      <Plot
        data={[
          {
            x: Object.keys(decileImpact),
            y: Object.values(decileImpact),
            type: "bar",
            marker: {
              color: Object.values(decileImpact).map((value) =>
                value > 0 ? style.colors.DARK_GREEN : style.colors.DARK_GRAY
              ),
            },
          },
        ]}
        layout={{
          xaxis: {
            title: "Income decile",
            tickvals: Object.keys(decileImpact),
          },
          yaxis: {
            title: "Relative change in income",
            tickformat: "+.1%",
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
  );
}
