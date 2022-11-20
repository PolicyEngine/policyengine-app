import Plot from "react-plotly.js";
import style from "../../../style";


export default function DistributionalImpact(props) {
    const { impact, policyLabel, metadata } = props;

    const giniRelativeChange = impact.inequality.gini.reform / impact.inequality.gini.baseline - 1;

    let category;
    if (giniRelativeChange < -0.005) {
        category = "progressive";
    } else if (giniRelativeChange > 0.005) {
        category = "regressive";
    } else {
        category = "flat";
    }
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
        <h2>{policyLabel} is <u>distributionally {category}</u></h2>
        <p>The chart below shows the relative change in income for each income decile. We said that it is <u>distributionally {category}</u> because the Gini index of income inequality {
            category === "regressive" ? 
                `rose by more than 0.5% (from ${impact.inequality.gini.baseline.toFixed(3)} to ${impact.inequality.gini.reform.toFixed(3)})` :
            category === "progressive" ?
                `fell by more than 0.5% (from ${impact.inequality.gini.baseline.toFixed(3)} to ${impact.inequality.gini.reform.toFixed(3)})` :
                `did not change by more than 0.5% (from ${impact.inequality.gini.baseline.toFixed(3)} to ${impact.inequality.gini.reform.toFixed(3)})`

        }.</p>
        {chart}
        <p>Households are sorted into ten equally-populated groups according to their equivalised household net income.</p>
    </>
}