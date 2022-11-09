import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import PolicyEngineContext from "../../countries/PolicyEngine";


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
        <Row style={{paddingTop: 20}}>
            <Col>
                <h3>
                    {
                        incomeValue > 0 ? `Your market income is ${householdStr(incomeVariables)}.` : "You don't have any market income."
                    }
                </h3>
            </Col>
            <Col>
                <h5>
                    {
                        incomeValue > 0 && (
                            <>From {incomeSources}.</>
                        )
                    }
                </h5>
            </Col>
        </Row>
        <Row style={{paddingTop: 20}}>
            <Col>
                <h3>
                    {
                        taxValue > 0 ? `You're liable for ${householdStr(taxVariables)} in taxes.` : "You're not liable for any taxes."
                    }
                </h3>
            </Col>
            <Col>
                <h5>
                    {
                        taxValue > 0 && (
                            <>From {taxSources}.</>
                        )
                    }
                </h5>
            </Col>
        </Row>
        <Row style={{paddingTop: 20}}>
            <Col>
                <h3>
                    {
                        benefitValue > 0 ? `You're eligible for ${householdStr(benefitVariables)} in benefits.` : "You're not eligible for any benefits."
                    }
                </h3>
            </Col>
            <Col>
                <h5>
                    {
                        benefitValue > 0 && (
                            <>From {benefitSources}.</>
                        )
                    }
                </h5>
            </Col>
        </Row>
    </div>
}