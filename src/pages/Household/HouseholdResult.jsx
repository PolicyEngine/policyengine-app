import { useEffect } from "react";
import { useContext, useState } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";

function findValueInCache(cache, plural, entity, variable, period) {
    if (cache[plural] && cache[plural][entity] && cache[plural][entity][variable] && cache[plural][entity][variable][period]) {
        return cache[plural][entity][variable][period];
    }
    return null;
}

function setValueInCache(cache, plural, entity, variable, period, value) {
    if (!cache) {
        cache = {};
    }
    if (!cache[plural]) {
        cache[plural] = {};
    }
    if (!cache[plural][entity]) {
        cache[plural][entity] = {};
    }
    if (!cache[plural][entity][variable]) {
        cache[plural][entity][variable] = {};
    }
    cache[plural][entity][variable][period] = value;
    return cache;
}

export default function HouseholdResult(props) {
  const PolicyEngine = useContext(PolicyEngineContext);
  const policyId = props.reform
    ? PolicyEngine.reformPolicyId
    : PolicyEngine.policyId;
  const entityName = props.entity;
  const variableName = props.variable;
  const timePeriod = props.period;
  const variable = PolicyEngine.variables[variableName];
  const unit = variable.unit;
  const entityPlural = PolicyEngine.entities[variable.entity].plural;

  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value === null) {
        let cachedValue = null;
        if (!PolicyEngine.householdUnderPolicyCache[policyId]) {
            PolicyEngine.countryApiCall(`/household/${PolicyEngine.householdId}/${policyId}`)
                .then((data) => {
                    let cache = PolicyEngine.householdUnderPolicyCache;
                    cache[policyId] = data;
                    PolicyEngine.setState({householdUnderPolicyCache: cache});
                });
        } else {
            cachedValue = findValueInCache(PolicyEngine.householdUnderPolicyCache[policyId], entityPlural, entityName, variableName, timePeriod);
            if (cachedValue !== null) {
                setValue(cachedValue);
            } else {
                PolicyEngine.countryApiCall(`/household/${PolicyEngine.householdId}/${policyId}/${entityPlural}/${entityName}/${variableName}/${timePeriod}`)
                    .then((data) => {
                        let cache = PolicyEngine.householdUnderPolicyCache;
                        cache[policyId] = setValueInCache(cache[policyId], entityPlural, entityName, variableName, timePeriod, data.value);
                        PolicyEngine.setState({householdUnderPolicyCache: cache});
                        setValue(data.value);
                    });
            }
        }
    }});

  if (value === null) {
    return null;
  }

  if (unit === "currency-GBP") {
    return "£" + Number(value.toFixed(0)).toLocaleString();
  }
}
