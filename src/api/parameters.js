import { IntervalMap } from "algorithms/IntervalMap";
import { countryApiCall } from "./call";
import { cmpDates } from "lang/stringDates";

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

export function getParameterAtInstant(parameter, instant) {
  const map = new IntervalMap(Object.entries(parameter.values), cmpDates);
  return map.get(instant);
}
