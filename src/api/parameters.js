import { countryApiCall } from "./call";

export function buildParameterTree(parameters) {
  let tree = {};

  for (const parameter of Object.values(parameters).filter(
    (parameter) => parameter.economy || parameter.household,
  )) {
    const nodeToInsert = {
      name: parameter.parameter,
      label: (
        parameter.label || parameter.parameter.split(/\.|\[/).pop()
      ).replaceAll("_", " "),
      index: parameter.indexInModule,
    };
    // Split based on . or [
    const pathComponents = parameter.parameter.split(/\.|\[/);
    // Keep track of the delimiters, so that we can reconstruct the path later.
    const delimiters = parameter.parameter.match(/\.|\[/g);
    // For a given path "x.y.z.a", create the nodes x, x.y and x.y.z if they don't exist.

    let currentNode = tree;
    let cumulativePath = "";
    for (const key of pathComponents.slice(0, -1)) {
      cumulativePath += key;
      const fixedCumulativePath = cumulativePath;
      let label = key;
      // Transform e.g. "0]" -> 1
      if (key.endsWith("]")) {
        label = `Bracket ${parseInt(key.slice(0, -1)) + 1}`;
      }
      label = label.replaceAll("_", " ");
      if (!currentNode.children) {
        currentNode.children = [];
      }
      if (
        !currentNode.children.find(
          (child) => child.name === fixedCumulativePath,
        )
      ) {
        currentNode.children.push({
          label: label,
          name: cumulativePath,
          index: 0,
          children: [],
        });
      }
      currentNode = currentNode.children.find(
        (child) => child.name === fixedCumulativePath,
      );
      // Re-add the delimiter to the cumulative path
      if (delimiters) {
        cumulativePath += delimiters.shift();
      }
    }
    try {
      if (!currentNode.children) {
        currentNode.children = [];
      }
      currentNode.children.push(nodeToInsert);
    } catch (e) {
      console.log("Error inserting node", nodeToInsert, "into", currentNode);
    }
  }
  return tree.children.find((child) => child.name === "gov");
}

export function getParameterAtInstant(parameter, instant) {
  const parameterValues = parameter.values;
  const parameterValuesInOrder = Object.keys(parameterValues).sort();
  if (parameterValuesInOrder.length === 0) {
    return null;
  }
  if (instant < parameterValuesInOrder[0]) {
    return parameterValues[parameterValuesInOrder[0]];
  }
  if (instant >= parameterValuesInOrder[parameterValuesInOrder.length - 1]) {
    return parameterValues[
      parameterValuesInOrder[parameterValuesInOrder.length - 1]
    ];
  }
  for (let i = 0; i < parameterValuesInOrder.length - 1; i++) {
    const timePeriod = parameterValuesInOrder[i];
    const nextTimePeriod = parameterValuesInOrder[i + 1];
    if (instant >= timePeriod && instant < nextTimePeriod) {
      return parameterValues[timePeriod];
    }
  }
  return null;
}

export function getReformedParameter(parameter, reforms) {
  // The reform is specified in the format:
  // { parameter.module.name: { "2022-01-01.2022-12-19": value }, ... }
  // The above example sets the value of parameter.module.name to value in 2022.
  // Parameters have a 'values' attribute, which is in the format:
  // { "2022-01-01": value, ... }

  let newParameter = JSON.parse(JSON.stringify(parameter));
  let parameterValues = newParameter.values;
  if (!parameterValues) {
    return null;
  }
  const parameterValuesInOrder = Object.keys(parameterValues).sort();
  const reform = reforms[parameter.parameter];
  if (reform) {
    for (const [timePeriod, value] of Object.entries(reform)) {
      const [startDate, endDate] = timePeriod.split(".");
      // Delete all values in the time period
      for (const timePeriod of parameterValuesInOrder) {
        if (timePeriod >= startDate && timePeriod <= endDate) {
          delete parameterValues[timePeriod];
        }
      }
      // Add the new value
      parameterValues[startDate] = value;
    }
  }
  return newParameter;
}

export function getNewPolicyId(countryId, newPolicyData, newPolicyLabel) {
  let submission = { data: newPolicyData };
  if (newPolicyLabel) {
    submission.label = newPolicyLabel;
  }
  return countryApiCall(countryId, "/policy", submission, "POST")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "error") {
        return data;
      }
      return data.result.policy_id;
    });
}
