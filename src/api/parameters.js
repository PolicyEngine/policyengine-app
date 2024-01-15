import { countryApiCall } from "./call";

export function buildParameterTree(parameters) {
  let tree = {};

  for (const parameter of Object.values(parameters).filter(
    (parameter) => parameter.economy || parameter.household,
  )) {
    if (parameter.parameter.includes("abolitions")) {
      continue;
    }
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
  const sortedKeys = Object.keys(parameterValues).sort();
  const reform = reforms[parameter.parameter];
  if (reform) {
    for (const [timePeriod, value] of Object.entries(reform)) {
      const [startDate, endDate] = timePeriod.split(".");
      const i1 = sortedKeys.findIndex(
        (k) => k >= startDate && parameterValues[k] !== value,
      );
      const i2 = sortedKeys.findLastIndex(
        (k) => endDate >= k && parameterValues[k] !== value,
      );
      if (i1 !== -1 && i2 !== -1) {
        // cache the last value
        let c = parameterValues[sortedKeys[i2]];
        // delete all values in the time period
        for (let i = i1; i <= i2; i++) {
          delete parameterValues[sortedKeys[i]];
        }
        // add the new values
        parameterValues[startDate] = value;
        parameterValues[endDate] = c;
        sortedKeys.splice(i1, i2 - i1 + 1, startDate, endDate);
      } else if (i1 !== -1) {
        parameterValues[startDate] = value;
        sortedKeys.splice(i1, 0, startDate);
        // TODO: it is unclear what the value in the range [endDate,
        // sortedKeys[0]] should be.
      } else if (i2 !== -1) {
        parameterValues[startDate] = value;
        parameterValues[endDate] = parameterValues[sortedKeys[i2]];
        sortedKeys.splice(i2, 0, startDate, endDate);
      }
    }
  }
  return newParameter;
}

export function getNewPolicyId(countryId, newPolicyData, newPolicyLabel) {
  let submission = { data: newPolicyData };
  if (newPolicyLabel) {
    submission.label = newPolicyLabel;
  }
  console.log("submission", submission);
  return countryApiCall(countryId, "/policy", submission, "POST")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "error") {
        return data;
      }
      console.log("from server", data);
      return data.result.policy_id;
    });
}
