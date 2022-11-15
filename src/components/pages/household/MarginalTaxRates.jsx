import { useEffect } from "react";
import { useContext, useState } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import Plot from "react-plotly.js";
import style from "../../../style";


export function MarginalTaxRates(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
   
    useEffect(() => {
        if (PolicyEngine.earningsVariationIsOutdated) {
            let household = JSON.parse(JSON.stringify(PolicyEngine.household));
            household.axes = [[{name: PolicyEngine.variableNames.earnings, period: "2022", min: 0, max: 200_000, count: 101}]]        
            PolicyEngine.apiCall("/calculate", household)
                .then(res => res.json())
                .then(data => PolicyEngine.setState({
                    simulatedEarningsVariationHousehold: data,
                    earningsVariationIsOutdated: false,
                }))
        }
    })

    if (!PolicyEngine.simulatedEarningsVariationHousehold) {
        return <></>
    }

    const household = PolicyEngine.simulatedEarningsVariationHousehold;

    const earningsArray = household.households["your household"].household_market_income["2022"]
    const mtrArray = household.people["you"].marginal_tax_rate["2022"]
    const earningsVariable = PolicyEngine.metadata.variables[PolicyEngine.variableNames.earnings];
    const mtrVariable = PolicyEngine.metadata.variables[PolicyEngine.variableNames.mtr];
    return <div style={{padding: 20, paddingLeft: 40}}>
        <h4 onClick={() => PolicyEngine.setState({page: "structure.maritalStatus"})}> &#8592; Back</h4>
        <h1 style={{marginTop: 50}}>Your marginal tax rate is {PolicyEngine.getFormattedSimulatedValue("marginal_tax_rate", "2022", "you")}</h1>
        <p>The below chart shows your household's net income as your employment income varies.</p>
        <Plot
            data={[
                {
                    x: earningsArray,
                    y: mtrArray,
                    type: 'line',
                    line: {
                        shape: "hv",
                    },
                },
            ]}
            layout={{
                xaxis: {
                    title: `Your ${earningsVariable.label}`,
                    tickprefix: earningsVariable.unit == "currency-GBP" ? 
                        "£" : earningsVariable.unit == "currency-USD" ? "$" : null,
                },
                yaxis: {
                    title: `Your ${mtrVariable.label}`,
                    tickformat: ".0%",
                },
            }}
            config={{
                displayModeBar: false,
            }}
            style={{
                width: "100%", height: 400,
            }}
        />
    </div>
}