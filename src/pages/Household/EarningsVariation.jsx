import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import Plot from 'react-plotly.js';
import { Col, Row } from "react-bootstrap";
import { BLUE } from "../../style";


export default function EarningsVariation(props) {
    const PolicyEngine = useContext(PolicyEngineContext);

    const household = PolicyEngine.getHouseholdUnderAxesPolicy("current-law", "employment_income", 2022, 0, 200_000, 101);
    console.log(household)
    if (!household.households) {
        return JSON.stringify(household);
    }
    return <>
        <Row>
            <h2 id="earnings_variation">How your earnings affect your net income</h2>
            <p>
            If your earnings varied between £0 and £200,000, here's how your net
            income would respond.
            </p>
        </Row>
        <Row>
            <Col>
                <h3 id="earnings_variation_net_income">Net income by earnings</h3>
                <Plot data={[
                    {
                        x: household.households["Your household"].household_market_income[2022],
                        y: household.households["Your household"].household_net_income[2022],
                        type: "line",
                        color_discrete_sequence: [BLUE],
                    },
                    ]} 
                    config={{displayModeBar: false}}
                    layout={{
                        xaxis: {
                            title: "Household market income",
                            tickformat: ",.0f",
                            tickprefix: "£",
                        },
                        yaxis: {
                            title: "Household net income",
                            tickformat: ",.0f",
                            tickprefix: "£",
                        },
                        template: "plotly_white",
                        plot_bgcolor: "white",
                        paper_bgcolor: "white",
                    }}
                />
            </Col>
        </Row>
        
        <Row>
            <Col>
                <h3 id="earnings_variation_marginal_tax_rate">Marginal tax rate by earnings</h3>
                <Plot data={[
                    {
                        x: household.households["Your household"].household_market_income[2022],
                        y: household.people["You"].marginal_tax_rate[2022],
                        type: "line",
                        color_discrete_sequence: [BLUE],
                        line: {shape: "hv"},
                    },
                    ]} 
                    config={{displayModeBar: false}}
                    layout={{
                        xaxis: {
                            title: "Employment income",
                            tickformat: ",.0f",
                            tickprefix: "£",
                        },
                        yaxis: {
                            title: "Marginal tax rate",
                            tickformat: ".0%",
                        },
                        template: "plotly_white",
                        plot_bgcolor: "white",
                        paper_bgcolor: "white",
                    }}
                />
            </Col>
        </Row>
    </>
}