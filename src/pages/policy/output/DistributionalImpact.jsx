import Plot from "react-plotly.js";
import style from "../../../style";


export default function DistributionalImpact(props) {
    const { impact, policyLabel, metadata } = props;
    // Decile bar chart. Bars are grey if negative, green if positive.
    const chart = <Plot
        data={[
            {
                x: Object.keys(impact.decile),
                y: Object.values(impact.decile),
                type: "bar",
                marker: {
                    color: Object.values(impact.decile).map((value) => value < 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN),
                },
            }
        ]}
        layout={{
            xaxis: {
                title: "Income decile",
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
        <h2>{policyLabel} across income deciles</h2>
        <p>The chart below shows the relative change in income for each income decile.</p>
        {chart}
        <p>Households are sorted into ten equally-populated groups according to their equivalised household net income.</p>
    </>
}