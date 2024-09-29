import { countryApiCall } from "./call";
import { capitalize } from "../lang/format";
import { defaultHouseholds } from "../data/defaultHouseholds";
import { defaultYear } from "data/constants";

export function removePerson(situation, name) {
  // Remove a person from the situation
  delete situation.people[name];
  for (const entityPlural of Object.keys(situation)) {
    if (entityPlural !== "people") {
      for (const entity of Object.keys(situation[entityPlural])) {
        situation[entityPlural][entity].members = situation[entityPlural][
          entity
        ].members.filter((member) => member !== name);
      }
    }
  }
  // Remove empty entities
  for (const entityPlural of Object.keys(situation)) {
    let toRemove = [];
    for (const entity of Object.keys(situation[entityPlural])) {
      if (situation[entityPlural]?.[entity]?.members?.length === 0) {
        toRemove.push(entity);
      }
    }
    for (const entity of toRemove) {
      delete situation[entityPlural][entity];
    }
  }
  return situation;
}

/**
 * Creates a default household JSON object and returns it
 * @param {Object} metadata National metadata object
 * @returns {JSON} Household object
 */
export function createDefaultHousehold(metadata) {
  const countryId = metadata.countryId;
  let newHousehold = null;

  if (countryId in defaultHouseholds) {
    newHousehold = JSON.parse(JSON.stringify(defaultHouseholds[countryId]));
  } else {
    newHousehold = JSON.parse(JSON.stringify(defaultHouseholds.default));
  }
  return newHousehold;
}

export function findInTree(tree, path) {
  // path is in the format "x.y.z"
  let node = tree;
  let cumulativePath;
  try {
    cumulativePath = "";
    // Square brackets are not allowed in the URL, so we need to decode them.
    // Replace %5B with [ and %5D with ].
    path = path.replace("%5B", "[").replace("%5D", "]");
    const pathParts = path.split(/(\.|\[)/);
    const names = pathParts.filter((part) => part !== "." && part !== "[");
    const delimiters = pathParts.filter((part) => part === "." || part === "[");
    for (const key of names) {
      cumulativePath += key;
      // If a [ in the path but no ] (or vice versa), add a ].
      if (cumulativePath.includes("[") && !cumulativePath.includes("]")) {
        cumulativePath += "]";
      }
      const fixedCumulativePath = cumulativePath;
      node = node.children.find((child) => child.name === fixedCumulativePath);
      cumulativePath += delimiters.shift() || "";
    }
  } catch (e) {
    return null;
  }
  return node;
}

export function buildVariableTree(variables, variableModules, basicInputs) {
  // Build a tree of variables, based on their module and indexInModule.
  // variables is a dictionary of variables, in the format:
  // { variable_name: { name: variable_name, label: variable_label, moduleName: variable_module, indexInModule: variable_indexInModule } }
  // variableModules is a dictionary of variable modules, in the format:
  // { module_name: { label: module_label, index: module_index } }
  // The tree is a dictionary of variable modules, in the format:
  // { module_name: { label: module_label, index: module_index, children: [variable_or_module_name, ...] } }

  let tree = {};
  for (const variable of Object.values(variables)) {
    if (!variable.moduleName) {
      continue;
    }
    const nodeToInsert = {
      name: variable.moduleName + "." + variable.name,
      label: capitalize(variable.label),
      index: variable.indexInModule,
    };
    let parentNode = findInTree(tree, variable.moduleName);
    if (!parentNode) {
      // For a given path "x.y.z.a", create the nodes x, x.y and x.y.z if they don't exist.
      let path = variable.moduleName.split(".");
      let currentNode = tree;
      let cumulativePath = "";
      for (const key of path) {
        cumulativePath += key;
        const fixedCumulativePath = cumulativePath;
        if (!currentNode.children) {
          currentNode.children = [];
        }
        if (
          !currentNode.children.find(
            (child) => child.name === fixedCumulativePath,
          )
        ) {
          const moduleData = variableModules[cumulativePath] || {};
          currentNode.children.push({
            label: moduleData.label || key,
            name: fixedCumulativePath,
            index: moduleData.index || 0,
            children: [],
          });
        }
        currentNode = currentNode.children.find(
          (child) => child.name === fixedCumulativePath,
        );
        cumulativePath += ".";
      }
      parentNode = findInTree(tree, variable.moduleName);
    }
    parentNode.children.push(nodeToInsert);
  }
  const inputModule = tree.children.find(
    (child) => child.name === "input",
  ).children;
  return {
    name: "input",
    label: "Input",
    children: [
      {
        name: "input.household",
        label: "Household",
        index: -10,
        children: [
          {
            name: "input.household.taxYear",
            label: "Tax year",
            index: -3,
          },
          {
            name: "input.household.maritalStatus",
            label: "Marital status",
            index: -2,
          },
          {
            name: "input.household.children",
            label: "Children",
            index: -1,
          },
          ...basicInputs.map((variableName) => {
            return {
              name: "input.household." + variableName,
              label: capitalize(variables[variableName].label),
            };
          }),
        ],
      },
      ...inputModule.reverse(),
    ],
  };
}

export function getTreeLeavesInOrder(tree) {
  // Traverses the variable tree in order, returning the list of variable names.
  let leaves = [];
  const traverse = (node) => {
    if (node.children) {
      node.children.sort((a, b) => a.index - b.index);
      for (const child of node.children) {
        traverse(child);
      }
    } else {
      leaves.push(node.name);
    }
  };
  traverse(tree);
  return leaves;
}

export const currencyMap = {
  "currency-GBP": "£",
  "currency-USD": "$",
  "currency-CAD": "$",
  "currency-ILS": "₪",
  "currency-NGN": "₦",
};

export function formatVariableValue(variable, value, precision = 2) {
  try {
    if (Object.keys(currencyMap).includes(variable.unit)) {
      // Format like "£1,234.56"
      return (
        currencyMap[variable.unit] +
        value.toLocaleString(undefined, {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        })
      );
    } else if (variable.unit === "/1") {
      // Format to the decimal places specified in precision.
      return (
        (value * 100).toLocaleString(undefined, {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        }) + "%"
      );
    } else {
      return value.toLocaleString();
    }
  } catch (e) {
    if (value === null) {
      return formatVariableValue(variable, 0);
    }
    return JSON.stringify(value) + " (error formatting)";
  }
}

export function getPlotlyAxisFormat(unit, values, precisionOverride) {
  // Possible units: currency-GBP, currency-USD, currency-CAD, currency-ILS,
  // currency-NGN, /1, date

  const range = () => {
    return values ? [Math.min(0, ...values), Math.max(0, ...values)] : [0, 0];
  };

  const paddedRange = () => {
    const r = range();
    const d = r[1] - r[0];
    const p = d * 0.01;
    return [r[0] - p, r[1] + p];
  };

  const precision = () => {
    if (typeof precisionOverride === "number") {
      return precisionOverride;
    }
    const r = range();
    const s = unit === "/1" ? 100 : 1;
    const d = (r[1] - r[0]) * s;
    return d > 10 ? 0 : d === 0 ? 1 : 1 - Math.round(Math.log10(d));
  };

  const isCurrency = Object.keys(currencyMap).includes(unit);
  const isPercent = unit === "/1";
  const isYears = unit === "years";
  const isKwh = unit === "kilowatt-hour";
  const isNumber = isCurrency || isPercent || isYears || isKwh;
  // TODO: unhandled units: list, variable, program
  if (isNumber) {
    return {
      tickformat: isCurrency
        ? `$,.${precision()}f`
        : isPercent
          ? `,.${precision()}%`
          : `,.${precision()}f`,
      ...(isYears && { ticksuffix: "&nbsp;yrs" }),
      ...(isKwh && { ticksuffix: "&nbsp;kWh" }),
      ...(values && {
        range: paddedRange(),
      }),
    };
  } else if (unit === "date") {
    let minYear, maxYear;
    if (values.length) {
      minYear = values.reduce(function (a, b) {
        return a <= b ? a : b;
      });
      maxYear = values.reduce(function (a, b) {
        return a >= b ? a : b;
      });
      minYear = Number(minYear.match(/\d+/)[0]);
      maxYear = Number(maxYear.match(/\d+/)[0]);
    } else {
      minYear = defaultYear;
      maxYear = defaultYear;
    }
    return {
      range: [minYear - 5 + "-01-01", maxYear + 5 + "-12-31"],
    };
  } else if (unit === "bool" || unit === "abolition") {
    return {
      tickvals: [0, 1],
      ticktext: ["False", "True"],
    };
  }
}

export function getValueFromHousehold(
  variable,
  timePeriod,
  entityName,
  household,
  metadata,
  valueFromFirstOnly = false,
) {
  household = JSON.parse(JSON.stringify(household));
  let entityPlural;
  try {
    entityPlural =
      metadata.entities[metadata.variables[variable].entity].plural;
  } catch (e) {
    console.error("Error getting variable value", variable, e);
  }
  if (!entityName) {
    let possibleEntities;
    try {
      possibleEntities = Object.keys(household[entityPlural]);
    } catch (e) {
      return null;
    }
    if (possibleEntities.length === 1 || valueFromFirstOnly) {
      return getValueFromHousehold(
        variable,
        timePeriod,
        possibleEntities[0],
        household,
        metadata,
      );
    }
    let total = 0;
    for (let entity of possibleEntities) {
      let entityData = getValueFromHousehold(
        variable,
        timePeriod,
        entity,
        household,
        metadata,
      );
      // If the entity data is an array, change total to an array and add each element.
      if (Array.isArray(entityData)) {
        if (!Array.isArray(total)) {
          total = Array(entityData.length).fill(0);
        }
        for (let i = 0; i < entityData.length; i++) {
          total[i] += entityData[i];
        }
      } else {
        total += entityData;
      }
    }
    return total;
  }
  let timePeriodValues;
  try {
    timePeriodValues = household[entityPlural][entityName][variable];
  } catch (e) {
    return null;
  }
  if (!timePeriodValues) {
    console.error("Error getting variable value", variable);
    return 0;
  }
  if (!timePeriod) {
    const possibleTimePeriods = Object.keys(timePeriodValues);
    let total = 0;
    for (let timePeriod of possibleTimePeriods) {
      total += getValueFromHousehold(
        variable,
        timePeriod,
        entityName,
        household,
        metadata,
      );
    }
    return total;
  }
  return timePeriodValues[timePeriod];
}

export function getNewHouseholdId(countryId, newHouseholdData) {
  return countryApiCall(
    countryId,
    "/household",
    { data: newHouseholdData },
    "POST",
  )
    .then((response) => response.json())
    .then((data) => {
      return data.result.household_id;
    });
}

export function getDefaultHouseholdId(metadata) {
  // Creates the default household for the country, returning the household ID.
  const defaultHousehold = createDefaultHousehold(
    metadata.countryId,
    metadata.variables,
    metadata.entities,
  );
  return countryApiCall(
    metadata.countryId,
    "/household",
    { data: defaultHousehold },
    "POST",
  )
    .then((res) => res.json())
    .then((dataHolder) => {
      return dataHolder.result.household_id;
    });
}

export function optimiseHousehold(household, metadata, removeEmpty = false) {
  // Variables don't need to be sent if they are:
  // - the same as the default value AND
  // - have no formula

  let newHousehold = JSON.parse(JSON.stringify(household));

  for (let entityPlural of Object.keys(household)) {
    for (let entityName of Object.keys(household[entityPlural])) {
      for (let variable of Object.keys(household[entityPlural][entityName])) {
        for (let timePeriod of Object.keys(
          household[entityPlural][entityName][variable],
        )) {
          let variableData = newHousehold[entityPlural][entityName][variable];
          if (
            variable === "members" ||
            metadata.basicInputs.includes(variable)
          ) {
            continue;
          }
          let defaultValue = metadata.variables[variable].defaultValue;
          let hasFormula = !metadata.variables[variable].isInputVariable;
          if (
            (variableData[timePeriod] === defaultValue && !hasFormula) ||
            (hasFormula && removeEmpty)
          ) {
            delete newHousehold[entityPlural][entityName][variable];
          }
        }
      }
    }
  }
  return newHousehold;
}
