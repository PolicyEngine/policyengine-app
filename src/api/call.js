import { buildParameterTree } from "./parameters";
import { buildVariableTree, getTreeLeavesInOrder } from "./variables";

const POLICYENGINE_API = "http://127.0.0.1:5000";

export function apiCall(path, body, method) {
  return fetch(POLICYENGINE_API + path, {
    method: method || (body ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
}

export function asyncApiCall(path, body, interval = 1000, firstInterval = 200) {
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
          if(response.status === 200) {
            return response.json()
          } else {
            return {status: "error", result: "Unknown error."}
          }
          })
        .then((data) => {
          if (data.status === "computing") {
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

export function updateMetadata(countryId, setMetadata, setError) {
  return countryApiCall(countryId, "/metadata")
    .then((res) => res.json())
    .then((dataHolder) => {
      const data = dataHolder.result;
      const variableTree = buildVariableTree(
        data.variables,
        data.variableModules,
        data.basicInputs
      );
      const parameterTree = buildParameterTree(data.parameters);
      const variablesInOrder = getTreeLeavesInOrder(variableTree);
      const metadata = {
        ...data,
        variableTree: variableTree,
        variablesInOrder: variablesInOrder,
        parameterTree: parameterTree,
        countryId: countryId,
        currency: countryId === "uk" ? "£" : "$",
      };
      setMetadata(metadata);
      return metadata;
    })
    .catch((error) => {
      setError(error);
    });
}
