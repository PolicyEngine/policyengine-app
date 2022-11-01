import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import VariableEntityInput from "./VariableEntityInput";


export default function VariableInput(props) {
    // A single variable input, e.g. "employment_income".
    const PolicyEngine = useContext(PolicyEngineContext);
    const variableName = props.variable;
    const variable = PolicyEngine.variables[variableName];
    const relevantEntity = PolicyEngine.entities[variable.entity];
    const household = PolicyEngine.household.household;
    const relevantEntityNames = Object.keys(household[relevantEntity.plural]).filter(
        entityName => {
            return household[relevantEntity.plural][entityName][variableName] !== undefined;
        }
    )
    if (relevantEntityNames.length === 0) {
        return null;
    }
    return <>
        <h4>{variable.label}</h4>
        <p>{variable.documentation}</p>
        {
            relevantEntityNames.map((entityName) => {
                return <VariableEntityInput key={entityName} entity={entityName} variable={variableName} />
            })
        }
    </>
}