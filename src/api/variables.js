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
  return situation;
}

export function addYearlyVariables(situation, variables, entities) {
  // Add yearly variables to the situation (with their input value if they are an input variable, else null).
  let entityPlural;
  let possibleEntities;
  for (const variable of Object.values(variables)) {
    if (variable.definitionPeriod === "year") {
      entityPlural = entities[variable.entity].plural;
      if (entityPlural in situation) {
        possibleEntities = Object.keys(situation[entityPlural]);
        for (const entity of possibleEntities) {
          if (!(variable.name in situation[entityPlural][entity])) {
            situation[entityPlural][entity][variable.name] = {
              2022: variable.isInputVariable ? variable.defaultValue : null,
            };
          }
        }
      }
    }
  }
  return situation;
}

export function createDefaultHousehold(country, variables, entities) {
  let situation = {};
  if (country === "uk") {
    situation = {
      people: {
        you: {},
      },
      benunits: {
        "your immediate family": {
          members: ["you"],
        },
      },
      households: {
        "your household": {
          members: ["you"],
        },
      },
    };
  } else if (country === "us") {
    situation = {
      people: {
        you: {},
      },
      families: {
        "your family": {
          members: ["you"],
        },
      },
      marital_units: {
        "your marital unit": {
          members: ["you"],
        },
      },
      tax_units: {
        "your tax unit": {
          members: ["you"],
        },
      },
      spm_units: {
        "your household": {
          members: ["you"],
        },
      },
      households: {
        "your household": {
          members: ["you"],
        },
      },
    };
  }
  situation = addYearlyVariables(situation, variables, entities);
  return situation;
}

export function findInTree(tree, path) {
  // path is in the format "x.y.z"
  let node = tree;
  let cumulativePath;
  try {
    cumulativePath = "";
    for (const key of path.split(".")) {
      cumulativePath += key;
      const fixedCumulativePath = cumulativePath;
      node = node.children.find((child) => child.name === fixedCumulativePath);
      cumulativePath += ".";
    }
  } catch (e) {
    return null;
  }
  return node;
}

export function buildVariableTree(variables, variableModules) {
  // Build a tree of variables, based on their module and indexInModule.
  // variables is a dictionary of variables, in the format:
  // { variable_name: { name: variable_name, label: variable_label, moduleName: variable_module, indexInModule: variable_indexInModule } }
  // variableModules is a dictionary of variable modules, in the format:
  // { module_name: { label: module_label, index: module_index } }
  // The tree is a dictionary of variable modules, in the format:
  // { module_name: { label: module_label, index: module_index, children: [variable_or_module_name, ...] } }

  let tree = {};
  for (const variable of Object.values(variables)) {
    const nodeToInsert = {
      name: variable.moduleName + "." + variable.name,
      label: variable.label,
      index: variable.indexInModule,
    };
    let parentNode = findInTree(tree, variable.moduleName);
    if (!parentNode) {
      // For a given path "x.y.z.a", create the nodes x, x.y and x.y.z if they don't exist.
      const path = variable.moduleName.split(".");
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
            (child) => child.name === fixedCumulativePath
          )
        ) {
          const moduleData = variableModules[cumulativePath] || {};
          currentNode.children.push({
            label: moduleData.label || key,
            name: fixedCumulativePath,
            index: module.index || 0,
            children: [],
          });
        }
        currentNode = currentNode.children.find(
          (child) => child.name === fixedCumulativePath
        );
        cumulativePath += ".";
      }
      parentNode = findInTree(tree, variable.moduleName);
    }
    parentNode.children.push(nodeToInsert);
  }
  const inputModule = tree.children.find(
    (child) => child.name === "input"
  ).children;
  return [
    {
      name: "structure",
      label: "Household",
      index: 0,
      children: [
        {
          name: "structure.maritalStatus",
          label: "Marital status",
          index: 0,
        },
        {
          name: "structure.children",
          label: "Children",
          index: 1,
        },
      ],
    },
    ...inputModule.reverse(),
  ];
}

export function getTreeLeavesInOrder(tree, full = false) {
  // Traverses the variable tree in order, returning the list of variable names.
  let leaves = [];
  const traverse = (node) => {
    if (node.children) {
      node.children.sort((a, b) => a.index - b.index);
      for (const child of node.children) {
        traverse(child);
      }
    } else {
      const fullName = node.name;
      // Get the name after the last period
      const name = fullName.split(".").slice(-1)[0];
      leaves.push(full ? name : fullName);
    }
  };
  tree.map((node) => traverse(node));
  return leaves;
}

export function formatVariableValue(variable, value, precision = 2) {
  try {
    if (variable.unit === "currency-GBP") {
      // Format like "£1,234.56"
      return (
        "£" +
        value.toLocaleString(undefined, {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        })
      );
    } else if (variable.unit === "currency-USD") {
      return (
        "$" +
        value.toLocaleString(undefined, {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        })
      );
    } else if (variable.unit === "/1") {
      // Format as x.1%
      return (value * 100).toFixed(0) + "%";
    } else {
      return value.toLocaleString();
    }
  } catch (e) {
    return JSON.stringify(value) + " (error formatting)";
  }
}

export function getPlotlyAxisFormat(unit) {
  // Possible units: currency-GBP, currency-USD, /1
  if (unit === "currency-GBP") {
    return {
      tickformat: ",.0f",
      tickprefix: "£",
    };
  } else if (unit === "currency-USD") {
    return {
      tickformat: ",.0f",
      tickprefix: "$",
    };
  } else if (unit === "/1") {
    return {
      tickformat: ",.2%",
    };
  }
}

export function getValueFromHousehold(
  variable,
  timePeriod,
  entityName,
  household,
  metadata
) {
  const entityPlural =
    metadata.entities[metadata.variables[variable].entity].plural;
  if (!entityName) {
    const possibleEntities = Object.keys(household[entityPlural]);
    if (possibleEntities.length === 1) {
      return getValueFromHousehold(
        variable,
        timePeriod,
        possibleEntities[0],
        household,
        metadata
      );
    }
    let total = 0;
    for (let entity of possibleEntities) {
      total += +getValueFromHousehold(
        variable,
        timePeriod,
        entity,
        household,
        metadata
      );
    }
    return total;
  }
  const timePeriodValues = household[entityPlural][entityName][variable];
  if (!timePeriod) {
    const possibleTimePeriods = Object.keys(timePeriodValues);
    let total = 0;
    for (let timePeriod of possibleTimePeriods) {
      total += getValueFromHousehold(
        variable,
        timePeriod,
        entityName,
        household,
        metadata
      );
    }
    return total;
  }
  return timePeriodValues[timePeriod];
}
