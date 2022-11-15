import { useContext } from "react";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";


export default function NetIncomeBreakdown(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const household = variable => PolicyEngine.getSimulatedValue(variable);
    const householdStr = variable => PolicyEngine.getFormattedSimulatedValue(variable);
    const variablesOfCategory = category => Object.keys(PolicyEngine.metadata.variables).filter(variable => PolicyEngine.metadata.variables[variable].category == category);
    const countNonzeroVariablesOfCategory = category => variablesOfCategory(category).filter(variable => household(variable) !== 0).length;
    const categoryHasNonzeroVariables = category => countNonzeroVariablesOfCategory(category) > 0;
    return <div style={{padding: 20, paddingLeft: 40}}>
        <h4 onClick={() => PolicyEngine.setState({householdPage: "structure.maritalStatus"})}> &#8592; Back</h4>
        <h1 style={{marginTop: 50}}>Your net income is {householdStr(PolicyEngine.variableNames.netIncome)}</h1>
        <p>Here's how we calculated your household's net income. Click on a section to see more details.</p>
        <div style={{paddingTop: 100}}>
            <h2>{householdStr(PolicyEngine.variableNames.marketIncome)} in market income</h2>
            <p>From {countNonzeroVariablesOfCategory("income")} income sources +</p>
            <h2>{householdStr(PolicyEngine.variableNames.taxes)} in tax</h2>
            <p>From {countNonzeroVariablesOfCategory("tax")} tax +</p>
            <h2>{householdStr(PolicyEngine.variableNames.benefits)} in benefits</h2>
            <p>From {countNonzeroVariablesOfCategory("tax")} benefit +</p>
        </div>
    </div>
}