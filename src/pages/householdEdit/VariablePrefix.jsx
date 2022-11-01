import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";


export default function VariablePrefix(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const variableName = props.variable;
    const variable = PolicyEngine.variables[variableName];
    const unit = variable.unit;

    if (unit === "currency-GBP") {
        return "£";
    } else if (unit === "currency-USD") {
        return "$";
    }
}