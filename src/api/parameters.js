import { IntervalMap } from "algorithms/IntervalMap";
import { countryApiCall } from "./call";
import { cmpDates } from "lang/stringDates";
import { wrappedResponseJson } from "../data/wrappedJson";

export function buildParameterTree(parameters) {
  let tree = {};

  for (const parameter of Object.values(parameters).filter(
    (parameter) => parameter.economy || parameter.household,
  )) {
    const nodeToInsert = {
      name: parameter.parameter,
      type: parameter.type,
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
      let label =
        (cumulativePath in parameters && parameters[cumulativePath].label) ||
        key;
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
      console.error("Error inserting node", nodeToInsert, "into", currentNode);
    }
  }
  return tree.children.find((child) => child.name === "gov");
}

/**
 * Creates new policy record within API and returns the record's ID,
 * or an error message
 * @param {String} countryId
 * @param {Object} newPolicyData The new policy's data object
 * @param {String} newPolicyLabel The new policy's label
 * @returns {Object} An object with three keys: "status", which is
 * the "status" value returned by the request; "message", the message
 * returned by the API; and "policy_id", the ID of the record created
 * by the API
 */
export function getNewPolicyId(countryId, newPolicyData, newPolicyLabel) {
  let submission = { data: newPolicyData };
  if (newPolicyLabel) {
    submission.label = newPolicyLabel;
  }
  return countryApiCall(countryId, "/policy", submission, "POST")
    .then((response) => wrappedResponseJson(response))
    .then((data) => {
      let result = {};
      if (data.status === "ok") {
        result.policy_id = data.result.policy_id;
      } else {
        result.policy_id = undefined;
      }
      result.message = data.message;
      result.status = data.status;
      return result;
    });
}

export function getParameterAtInstant(parameter, instant) {
  const map = new IntervalMap(
    Object.entries(parameter.values),
    cmpDates,
    (x, y) => x === y,
  );
  return map.get(instant);
}
