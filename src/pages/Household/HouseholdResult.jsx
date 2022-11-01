import { useEffect } from "react";
import { useContext, useState } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";

function findValueInCache(cache, plural, entity, variable, period) {
    if (cache[plural] && cache[plural][entity] && cache[plural][entity][variable]) {
        return cache[plural][entity][variable][period];
    }
    return null;
}

export default function HouseholdResult(props) {
  const PolicyEngine = useContext(PolicyEngineContext);
  const policyId = props.reform
    ? PolicyEngine.reformPolicyId
    : PolicyEngine.policyId;
  if (!PolicyEngine.householdUnderPolicyCache[policyId]) {
    return "...";
  }
  const entityName = props.entity;
  const variableName = props.variable;
  const timePeriod = props.period;
  const variable = PolicyEngine.variables[variableName];
  const unit = variable.unit;
  const entityPlural = PolicyEngine.entities[variable.entity].plural;

  const value = findValueInCache(
    PolicyEngine.householdUnderPolicyCache[policyId],
    entityPlural,
    entityName,
    variableName,
    timePeriod,
  );

  if (value === null) {
    return "[null]";
  }

  if (unit === "currency-GBP") {
    return "£" + Number(value.toFixed(2)).toLocaleString();
  } else if (unit === "currency-USD") {
    return "$" + Number(value.toFixed(2)).toLocaleString();
  } else if (unit === "/1") {
    return `${Math.round(value * 100)}%`;
  }
}
