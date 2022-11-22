import Plot from "react-plotly.js";
import { formatVariableValue, getPlotlyAxisFormat } from "../../../api/variables";
import style from "../../../style";


export default function RelativeImpactByDecile(props) {
    const { impact, policyLabel, metadata } = props;
    // Decile bar chart. Bars are grey if negative, green if positive.
    const chart = <Plot
        data={[
            {
                x: Object.keys(impact.decile.relative),
                y: Object.values(impact.decile.relative),
                type: "bar",
                marker: {
                    color: Object.values(impact.decile.relative).map((value) => value < 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN),
                },
            }
        ]}
        layout={{
            xaxis: {
                title: "Income decile",
            },
            yaxis: {
                title: "Relative change",
                tickformat: ",.0%",
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

    console.log(getPlotlyAxisFormat(metadata.variables.household_net_income.unit, Object.values(impact.decile.relative)));

    const averageRelChange = (Object.values(impact.decile.relative)).reduce((a, b) => a + b, 0) / Object.values(impact.decile.relative).length;

    return <>
        <h2>{policyLabel} {averageRelChange >= 0 ? "increases" : "decreases"} the average household's net income by {formatVariableValue({unit: "/1"}, Math.abs(averageRelChange))}</h2>
        <p>The chart below shows the relative change in income for each income decile.</p>
        {chart}
        <p>Households are sorted into ten equally-populated groups according to their equivalised household net income.</p>
    </>
}