import { useContext } from "react";
import {
  getParameterAtInstant,
  getReformedParameter,
} from "../../../logic/parameterValues";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import { formatVariableValue } from "../../../logic/variableValues";

function PolicyItem(props) {
  const PolicyEngine = useContext(PolicyEngineContext);
  const parameter = PolicyEngine.metadata.parameters[props.parameter];
  const defaultValue = formatVariableValue(
    parameter,
    getParameterAtInstant(parameter, "2022-01-01")
  );
  const reformValue = formatVariableValue(
    parameter,
    getParameterAtInstant(
      getReformedParameter(parameter, PolicyEngine.policyReform),
      "2022-01-01"
    )
  );
  return (
    <div>
      <h6>{parameter.label}</h6>
      <h6 style={{ paddingLeft: 20 }}>
        {defaultValue} &#8594; {reformValue}
      </h6>
    </div>
  );
}

export default function RightSidebar(props) {
  const PolicyEngine = useContext(PolicyEngineContext);

  return (
    <>
      <div style={{ padding: 10 }}>
        <h2>Household</h2>
        {PolicyEngine.household ? (
          <h5>Your household</h5>
        ) : (
          <h5>No household specified.</h5>
        )}
        <h2 style={{ paddingTop: 20 }}>Policy</h2>

        {PolicyEngine.policyReform ? (
          Object.keys(PolicyEngine.policyReform).map((parameter) => (
            <PolicyItem parameter={parameter} />
          ))
        ) : (
          <h5>No policy reform specified.</h5>
        )}
      </div>
    </>
  );
}
