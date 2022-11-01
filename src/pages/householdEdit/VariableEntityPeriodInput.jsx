import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import VariablePrefix from "./VariablePrefix";


export default function VariableEntityPeriodInput(props) {
    // This component handles input for a single entity-period-variable triplet (e.g. employment income for adult 1 in 2022).
    const entityName = props.entity;
    const variableName = props.variable;
    const PolicyEngine = useContext(PolicyEngineContext);
    const variable = PolicyEngine.variables[variableName];
    const entityPlural = PolicyEngine.entities[variable.entity].plural;

    return <div style={{display: "flex", alignItems: "center"}}>
            <p style={{paddingLeft: 100, margin: 0, paddingRight: 10, textAlign: "center"}}>{entityName}, in {props.period}: </p>
            <p style={{fontSize: 30, margin: 0}}><VariablePrefix variable={variableName} /></p>
            <input
                type="number"
                placeholder={PolicyEngine.household.household[entityPlural][entityName][variableName][props.period]}
                pattern="\d*" // Only allow numbers.
                style={{
                    border: "none",
                    cursor: "pointer",
                    fontSize: 30,
                }}
                onChange={(e) => {
                    PolicyEngine.setHouseholdVariableValue(
                        variableName,
                        entityName,
                        props.period,
                        e.target.value
                    );
                }}
            />
        </div>
}