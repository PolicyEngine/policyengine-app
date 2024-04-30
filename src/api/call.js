import { buildParameterTree } from "./parameters";
import { buildVariableTree, getTreeLeavesInOrder } from "./variables";
import moment from "dayjs";

const POLICYENGINE_API = "https://api.policyengine.org";

/**
 * Makes an API call to the back end and returns response
 * @param {String} path API URL, beginning with a slash
 * @param {Object} [body] The body of the request for a non-GET request
 * @param {String} [method] The HTTP method; defaults to GET if no body is passed,
 * or to POST if a body is passed
 * @param {boolean} [secondAttempt=false] Whether or not to attempt the request a second
 * time if it fails the first time
 * @returns {JSON} The API call's response JSON object
 */
export function apiCall(path, body, method, secondAttempt = false) {
  const startTime = moment();
  return fetch(POLICYENGINE_API + path, {
    method: method || (body ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  }).then((response) => {
    // If the response is a 500, try again once.
    console.log(
      "API call to",
      path,
      "completed in",
      moment().diff(startTime, "seconds"),
      "seconds",
    );
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
  computingCallback = () => {},
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
  const startTime = moment();
  return countryApiCall(countryId, "/metadata")
    .then((res) => res.json())
    .then((dataHolder) => {
      let data = dataHolder.result;
      const variableTree = buildVariableTree(
        data.variables,
        data.variableModules,
        data.basicInputs,
      );
      // parameters = {p: {parameter: "x.y.z"}}. Filter out parameters with parameter containing "taxsim"
      data.parameters = Object.fromEntries(
        Object.entries(data.parameters).filter(
          // eslint-disable-next-line no-unused-vars
          ([key, value]) => !value.parameter.includes("taxsim"), // &&
          // first value in parameter.values is not a list.
          //(!value.values ||
          //  !(Object.values(value.values)[0] instanceof Array)),
        ),
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
      console.log(
        "Metadata loaded in",
        moment().diff(startTime, "seconds"),
        "seconds",
      );
      setMetadata(metadata);
      return metadata;
    });
}
