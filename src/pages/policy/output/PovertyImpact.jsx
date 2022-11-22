import Plot from "react-plotly.js";
import style from "../../../style";


export default function PovertyImpact(props) {
    const { impact, policyLabel, metadata } = props;
    const childPovertyChange = impact.poverty.child.reform / impact.poverty.child.baseline - 1;
    const adultPovertyChange = impact.poverty.adult.reform / impact.poverty.adult.baseline - 1;
    const seniorPovertyChange = impact.poverty.senior.reform / impact.poverty.senior.baseline - 1;
    const povertyChanges = [childPovertyChange, adultPovertyChange, seniorPovertyChange];
    const povertyLabels = ["Children", "Working-age adults", "Seniors"];
    // Decile bar chart. Bars are grey if negative, green if positive.
    const chart = <Plot
        data={[
            {
                x: povertyLabels,
                y: povertyChanges,
                type: "bar",
                marker: {
                    color: povertyChanges.map((value) => value < 0 ? style.colors.DARK_GREEN : style.colors.DARK_GRAY),
                },
            }
        ]}
        layout={{
            xaxis: {
                title: "Age group",
            },
            yaxis: {
                title: "Relative change",
                tickformat: ",.1%",
            },
            showlegend: false,
        }}
        config={{
            displayModeBar: false,
        }}
        style={{
            width: "100%",
        }}
    />;

    return <>
        <h2>{policyLabel} effects on poverty</h2>
        <p>The chart below shows the relative change in the poverty rate for each age group.</p>
        {chart}
    </>
}