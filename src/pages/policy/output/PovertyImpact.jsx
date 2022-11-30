import Plot from "react-plotly.js";
import { formatVariableValue } from "../../../api/variables";
import style from "../../../style";

export default function PovertyImpact(props) {
  const { impact, policyLabel } = props;
  const childPovertyChange =
    impact.poverty.child.reform / impact.poverty.child.baseline - 1;
  const adultPovertyChange =
    impact.poverty.adult.reform / impact.poverty.adult.baseline - 1;
  const seniorPovertyChange =
    impact.poverty.senior.reform / impact.poverty.senior.baseline - 1;
  const totalPovertyChange =
    impact.poverty.all.reform / impact.poverty.all.baseline - 1;
  const povertyChanges = [
    childPovertyChange,
    adultPovertyChange,
    seniorPovertyChange,
    totalPovertyChange,
  ];
  const povertyLabels = ["Children", "Working-age adults", "Seniors", "All"];
  // Decile bar chart. Bars are grey if negative, green if positive.
  const chart = (
    <Plot
      data={[
        {
          x: povertyLabels,
          y: povertyChanges,
          type: "bar",
          marker: {
            color: povertyChanges.map((value) =>
              value < 0 ? style.colors.DARK_GREEN : style.colors.DARK_GRAY
            ),
          },
          text: povertyChanges.map(
            (value) =>
              (value >= 0 ? "+" : "") +
              (value * 100).toFixed(1).toString() +
              "%"
          ),
          textangle: 0,
        },
      ]}
      layout={{
        xaxis: {
          title: "Age group",
        },
        yaxis: {
          title: "Relative change",
          tickformat: "+,.1%",
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

  const povertyRateChange = formatVariableValue(
    { unit: "/1" },
    Math.abs(totalPovertyChange)
  );

  return (
    <>
      <h2>
        {policyLabel}{" "}
        {totalPovertyChange > 0
          ? `raises the poverty rate by ${povertyRateChange}`
          : totalPovertyChange < 0
          ? `reduces the poverty rate by ${povertyRateChange}`
          : "doesn't change the poverty rate"}
      </h2>
      <p>
        The chart below shows the relative change in the poverty rate for each
        age group.
      </p>
      {chart}
    </>
  );
}
