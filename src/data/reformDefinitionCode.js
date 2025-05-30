import { optimiseHousehold } from "../api/variables";
import { defaultYear } from "./constants";
import { DEFAULT_DATASETS } from "./countries";
import { wrappedJsonStringify } from "./wrappedJson";

export function getReproducibilityCodeBlock(
  type,
  metadata,
  policy,
  region,
  year,
  dataset = null,
  householdInput = null,
  earningVariation = null,
) {
  // Return a series of lines, concatted into an array,
  // generated by sub-functions

  return [
    ...getHeaderCode(type, metadata, policy),
    ...getBaselineCode(policy, metadata),
    ...getReformCode(policy, metadata),
    ...getSituationCode(
      type,
      metadata,
      policy,
      year,
      householdInput,
      earningVariation,
    ),
    ...getImplementationCode(type, region, metadata, year, policy, dataset),
  ];
}

export function getHeaderCode(type, metadata, policy) {
  let lines = [];

  // Add lines depending upon type of block
  if (type === "household") {
    lines.push("from " + metadata.package + " import Simulation");
  } else {
    lines.push("from " + metadata.package + " import Microsimulation");
  }

  // If either baseline or reform is custom, add the following Python imports
  if (
    Object.keys(policy.reform.data).length > 0 ||
    Object.keys(policy.baseline.data).length > 0
  ) {
    lines.push("from policyengine_core.reforms import Reform");
  }

  // If either baseline or reform contains Infinity or -Infinity,
  // add the following Python imports
  const allValues = getAllPolicyValues(policy);
  if (allValues.some((value) => value === Infinity || value === -Infinity)) {
    lines.push("import numpy as np");
  }

  return lines;
}

export function getBaselineCode(policy, metadata) {
  if (
    !policy?.baseline?.data ||
    Object.keys(policy.baseline.data).length === 0
  ) {
    return [];
  }
  let json_str = wrappedJsonStringify(policy.baseline.data, null, 2);
  json_str = sanitizeStringToPython(json_str);
  let lines = [""].concat(json_str.split("\n"));
  lines[1] = "baseline = Reform.from_dict({" + lines[0];
  lines[lines.length - 1] =
    lines[lines.length - 1] + ', country_id="' + metadata.countryId + '")';
  return lines;
}

export function getReformCode(policy, metadata) {
  if (!policy?.baseline?.data || Object.keys(policy.reform.data).length === 0) {
    return [];
  }
  let json_str = wrappedJsonStringify(policy.reform.data, null, 2);
  json_str = sanitizeStringToPython(json_str);
  let lines = [""].concat(json_str.split("\n"));
  lines[1] = "reform = Reform.from_dict({" + lines[0];
  lines[lines.length - 1] =
    lines[lines.length - 1] + ', country_id="' + metadata.countryId + '")';
  return lines;
}

export function getSituationCode(
  type,
  metadata,
  policy,
  year,
  householdInput,
  earningVariation,
) {
  if (type !== "household") {
    return [];
  }

  let householdInputCopy = JSON.parse(
    JSON.stringify(optimiseHousehold(householdInput, metadata, true)),
  );

  for (const entityPlural of Object.keys(householdInputCopy)) {
    for (const entity of Object.keys(householdInputCopy[entityPlural])) {
      for (const variable of Object.keys(
        householdInputCopy[entityPlural][entity],
      )) {
        if (variable !== "members") {
          if (
            householdInputCopy[entityPlural][entity][variable][year] === null
          ) {
            delete householdInputCopy[entityPlural][entity][variable];
          }
        }
        if (earningVariation && variable === "employment_income") {
          delete householdInputCopy[entityPlural][entity][variable];
        }
      }
    }
  }

  if (earningVariation) {
    householdInputCopy["axes"] = [
      [{ name: "employment_income", count: 200, min: 0, max: 200_000 }],
    ];
  }

  let householdJson = JSON.stringify(householdInputCopy, null, 2);
  // It's Python-safe, so we need to make true -> True and false -> False and null -> None
  householdJson = sanitizeStringToPython(householdJson);

  let lines = [
    "",
    "",
    "situation = " + householdJson,
    "",
    "simulation = Simulation(",
  ];

  if (Object.keys(policy.reform.data).length) {
    lines.push("    reform=reform,");
  }

  lines = lines.concat([
    "    situation=situation,",
    ")",
    "",
    `output = simulation.calculate("household_net_income", ${year})`,
    "print(output)",
  ]);

  return lines;
}

export function getImplementationCode(
  type,
  region,
  metadata,
  timePeriod,
  policy,
  dataset,
) {
  const countryId = metadata.economy_options.region[0].name;

  if (type !== "policy") {
    return [];
  }

  const hasBaseline = Object.keys(policy?.baseline?.data).length > 0;
  const hasReform = Object.keys(policy?.reform?.data).length > 0;

  // Check if the region has a dataset specified
  const hasDatasetSpecified = Object.keys(DEFAULT_DATASETS).includes(dataset);

  const isState = countryId === "us" && region !== "us";

  let datasetText = "";

  if (hasDatasetSpecified) {
    datasetText = DEFAULT_DATASETS[dataset];
  } else if (isState) {
    datasetText =
      "hf://policyengine/policyengine-us-data/pooled_3_year_cps_2023.h5";
  }

  const datasetSpecifier = datasetText ? `dataset="${datasetText}"` : "";

  const baselineSpecifier = hasBaseline ? "reform=baseline" : "";
  const baselineComma = hasBaseline && datasetText ? ", " : "";

  const reformSpecifier = hasReform ? "reform=reform" : "";
  const reformComma = hasReform && datasetText ? ", " : "";

  return [
    "",
    "",
    `baseline = Microsimulation(${baselineSpecifier}${baselineComma}${datasetSpecifier})`,
    `reformed = Microsimulation(${reformSpecifier}${reformComma}${datasetSpecifier})`,
    `baseline_income = baseline.calculate("household_net_income", period=${timePeriod || defaultYear})`,
    `reformed_income = reformed.calculate("household_net_income", period=${timePeriod || defaultYear})`,
    "difference_income = reformed_income - baseline_income",
  ];
}

export function getStartEndDates(policy) {
  let earliestStart = null;
  let latestEnd = null;

  for (const parameter of Object.keys(policy.reform.data)) {
    for (const instant of Object.keys(policy.reform.data[parameter])) {
      const [start, end] = instant.split(".");
      if (!earliestStart || Date.parse(start) < Date.parse(earliestStart)) {
        earliestStart = start;
      }
      if (!latestEnd || Date.parse(end) > Date.parse(latestEnd)) {
        latestEnd = end;
      }
    }
  }

  return {
    earliestStart: earliestStart,
    latestEnd: latestEnd,
  };
}

/**
 * Transforms a parameter name with a number in the name
 * into valid Python syntax
 * @param {String} paramName
 * @returns {String} the transformed name
 */
export function transformNumberedParamName(paramName) {
  // Break the paramName into an array of dot-separated
  // components
  const NAME_ACCESSOR = ".";
  const nameParts = paramName.split(NAME_ACCESSOR);

  // Isolate number within the array and reformat
  const sanitizedParts = nameParts.map((word) => {
    if (Number(word)) {
      word = `children["${word}"]`;
    }
    return word;
  });

  // Re-join the array into a string and return
  return sanitizedParts.join(".");
}

/**
 * Determines whether a parameter name (a ParameterNode
 * object from a country package, accessed via country metadata)
 * contains a number in the name, making it impossible to access
 * through standard Python dot notation syntax
 * @param {String} paramName
 * @returns {Boolean} "true" if parameter name contains a number
 * (as defined as a String, successfully casted to a Number),
 * otherwise false
 */
export function doesParamNameContainNumber(paramName) {
  const JOIN_TOKEN = ".";

  // Take the param name and break it by its joining token
  const paramNameArray = paramName.split(JOIN_TOKEN);

  // Iterate over the resulting array
  for (const name of paramNameArray) {
    if (Number(name)) {
      return true;
    }
  }

  return false;
}

/**
 * Given a standard "policy" object, get all individual
 * values for both the baseline and reform policies
 * @param {Object} policy
 * @returns {Array<Number | String >} An array of values
 */
export function getAllPolicyValues(policy) {
  const { baseline, reform } = policy;

  /** @type {Array<Object>} */
  let valueSettings = [];

  for (const policy of [baseline, reform]) {
    const values = Object.values(policy.data);
    valueSettings = valueSettings.concat(values);
  }

  const output = valueSettings.reduce((accu, item) => {
    return accu.concat(...Object.values(item));
  }, []);

  return output;
}

/**
 * Utility function to sanitize a string and ensure that it's valid Python;
 * currently converts JS 'null', 'true', 'false', '"Infinity"', and '"-Infinity"' to Python
 * @param {String} string
 * @returns {String}
 */
export function sanitizeStringToPython(string) {
  return string
    .replace(/true/g, "True")
    .replace(/false/g, "False")
    .replace(/null/g, "None")
    .replace(/"Infinity"/g, "np.inf")
    .replace(/"-Infinity"/g, "-np.inf");
}
