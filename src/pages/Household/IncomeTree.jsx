import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";


export default function IncomeTree(props) {
    const inverted = props.inverted;
    const PolicyEngine = useContext(PolicyEngineContext);
    const variable = PolicyEngine.variables[props.variable];
    const household = variable => PolicyEngine.getHouseholdValue(variable);
    const householdStr = variable => !inverted ?
        "+ " + PolicyEngine.getFormattedHouseholdValue(variable) :
        "- " + PolicyEngine.formatValue(variable, household(variable));

    const addedVariables = variable.adds ? variable.adds.filter(variable => household(variable) !== 0) : [];
    const subtractedVariables = variable.subtracts ? variable.subtracts.filter(variable => household(variable) !== 0) : [];

    return <div>
        <h5 style={{paddingBottom: 10}}>{householdStr(variable.name)} from {variable.label}</h5>
        {
            addedVariables ?
                <div style={{paddingLeft: 20}}>
                    {addedVariables.map((addedVariable) => {
                        return <IncomeTree key={addedVariable} variable={addedVariable} inverted={props.inverted} />
                    })}
                </div> :
                null
        }
        {
            subtractedVariables ?
                <div style={{paddingLeft: 20}}>
                    {subtractedVariables.map((subtractedVariable) => {
                        return <IncomeTree key={subtractedVariable} variable={subtractedVariable} inverted={!props.inverted} />
                    })}
                </div> :
                null
        }
    </div>
}