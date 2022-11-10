import { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import PolicyEngineContext from "../../countries/PolicyEngine";
import IncomeTree from "./IncomeTree";


export default function Breakdown(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const variables = PolicyEngine.variables
    const household = variable => PolicyEngine.getHouseholdValue(variable);
    const householdStr = variable => PolicyEngine.getFormattedHouseholdValue(variable);
    const incomeVariables = Object.keys(variables)
        .filter(variable => variables[variable].category === "income")
        .filter(variable => household(variable) > 0);
    const taxVariables = Object.keys(variables)
        .filter(variable => variables[variable].category === "tax")
        .filter(variable => household(variable) > 0);
    const benefitVariables = Object.keys(variables)
        .filter(variable => variables[variable].category === "benefit")
        .filter(variable => household(variable) > 0);

    const incomeValue = household(incomeVariables);
    const taxValue = household(taxVariables);
    const benefitValue = household(benefitVariables);

    const incomeSources = PolicyEngine.formatListOfVariables(incomeVariables, "income source", "income sources");
    const taxSources = PolicyEngine.formatListOfVariables(taxVariables, "tax", "taxes");
    const benefitSources = PolicyEngine.formatListOfVariables(benefitVariables, "benefit", "benefits");
    
    
    return <div id="breakdown" style={{paddingBottom: 30}}>
        <h2>How we computed your income</h2>
        <p>PolicyEngine computes taxes and benefits for members of your household. Your household net income is your market income (non-government income), plus any benefits you're eligible for and less any taxes you're liable to pay.</p>
        <IncomeTree variable={PolicyEngine.household_net_income} />
    </div>
}