import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import VariableEntityPeriodInput from "./VariableEntityPeriodInput";


export default function VariableEntityInput(props) {
    // This component handles input for a single entity-variable pair (e.g. employment income for adult 1).
    const entityName = props.entity;
    const variableName = props.variable;
    const PolicyEngine = useContext(PolicyEngineContext);
    const variable = PolicyEngine.variables[variableName];
    const entityPlural = PolicyEngine.entities[variable.entity].plural;
    const timePeriodValues = PolicyEngine.household.household[entityPlural][entityName][variableName];
    // timePeriodValues example: {2022: 0, 2023: 0, 2024: 0}

    return Object.keys(timePeriodValues).map((timePeriod, i) => {
        return <VariableEntityPeriodInput key={i} entity={entityName} variable={variableName} period={timePeriod} />
    });
}