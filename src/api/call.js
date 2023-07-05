import { buildParameterTree } from "./parameters";
import { buildVariableTree, getTreeLeavesInOrder } from "./variables";

const POLICYENGINE_API = "http://127.0.0.1:5000";

export function apiCall(path, body, method, secondAttempt = false) {
  return fetch(POLICYENGINE_API + path, {
    method: method || (body ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  }).then((response) => {
    // If the response is a 500, try again once.
    if (response.status === 500 && !secondAttempt) {
      return apiCall(path, body, method, true);
    }
    return response;
  });
}

export function asyncApiCall(
  path,
  body,
  interval = 1000,
  firstInterval = 200,
  computingCallback = () => {}
) {
  // Call an API endpoint which may respond with a {status: computing} response.
  // If so, poll until the response is ready.
  // The timeline is: call, wait 200ms, call, wait 1000ms, call, wait 1000ms, ...
  // The reason we have a separate firstInterval is that the first call is
  // likely to be a cache miss, and we want to give the server a chance to
  // compute the result before we start polling.
  return new Promise((resolve, reject) => {
    const poll = (isFirst) => {
      apiCall(path, body)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return { status: "error", result: "Unknown error." };
          }
        })
        .then((data) => {
          if (data.status === "computing") {
            computingCallback(data);
            setTimeout(() => poll(false), isFirst ? firstInterval : interval);
          } else {
            resolve(data);
          }
        })
        .catch((error) => reject(error));
    };
    poll(true);
  });
}

export function countryApiCall(country, path, body, method) {
  return apiCall(`/${country}${path}`, body, method);
}

export function copySearchParams(searchParams) {
  const newSearch = new URLSearchParams();
  for (let [key, value] of searchParams) {
    newSearch.set(key, value);
  }
  return newSearch;
}

export function updateMetadata(countryId, setMetadata) {
  return countryApiCall(countryId, "/metadata")
    .then((res) => res.json())
    .then((dataHolder) => {
      let data = dataHolder.result;
      const variableTree = buildVariableTree(
        data.variables,
        data.variableModules,
        data.basicInputs
      );
      // parameters = {p: {parameter: "x.y.z"}}. Filter out parameters with parameter containing "taxsim"
      data.parameters = Object.fromEntries(
        Object.entries(data.parameters).filter(
          // eslint-disable-next-line no-unused-vars
          ([key, value]) => !value.parameter.includes("taxsim")
        )
      );
      const parameterTree = buildParameterTree(data.parameters);
      const variablesInOrder = getTreeLeavesInOrder(variableTree);
      const metadata = {
        ...data,
        variableTree: variableTree,
        variablesInOrder: variablesInOrder,
        parameterTree: parameterTree,
        countryId: countryId,
        package: {
          uk: "policyengine_uk",
          us: "policyengine_us",
          ca: "policyengine_canada",
        }[countryId],
        currency: countryId === "uk" ? "£" : "$",
      };
      setMetadata(metadata);
      return metadata;
    });
}
