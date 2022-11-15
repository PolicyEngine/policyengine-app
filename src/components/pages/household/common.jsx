

export function removePerson(situation, name) {
    // Remove a person from the situation
    delete situation.people[name];
    for (const entityPlural of Object.keys(situation)) {
        if (entityPlural !== "people") {
            for (const entity of Object.keys(situation[entityPlural])) {
                situation[entityPlural][entity].members = situation[entityPlural][entity].members.filter(member => member != name);
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
        if (variable.definitionPeriod == "year") {
            entityPlural = entities[variable.entity].plural;
            if (entityPlural in situation) {
                possibleEntities = Object.keys(situation[entityPlural]);
                for (const entity of possibleEntities) {
                    if (!(variable.name in situation[entityPlural][entity])) {
                        situation[entityPlural][entity][variable.name] = {
                            "2022": variable.isInputVariable ? variable.defaultValue : null,
                        };
                    }
                }
            }
        }
    }
    return situation;
}

export function findInTree(tree, path) {
    // path is in the format "x.y.z"
    let node = tree;
    try {
        let cumulativePath = "";
        for (const key of path.split(".")) {
            cumulativePath += key;
            node = node.children.find(child => child.name == cumulativePath);
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
    // { module_name: { title: module_title, index: module_index } }
    // The tree is a dictionary of variable modules, in the format:
    // { module_name: { title: module_title, index: module_index, children: [variable_or_module_name, ...] } }

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
                if (!currentNode.children) {
                    currentNode.children = [];
                }
                if (!(currentNode.children.find(child => child.name === cumulativePath))) {
                    const moduleData = variableModules[cumulativePath] || {};
                    currentNode.children.push({
                        label: moduleData.title || key,
                        name: cumulativePath,
                        index: module.index || 0,
                        children: [],
                    });
                }
                currentNode = currentNode.children.find(child => child.name === cumulativePath);
                cumulativePath += ".";
            }
            parentNode = findInTree(tree, variable.moduleName);
        }
        parentNode.children.push(nodeToInsert);
    }
    const inputModule = tree.children.find(child => child.name === "input").children;
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
    ]
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
            const fullName = node.name;
            // Get the name after the last period
            const name = fullName.split(".").slice(-1)[0];
            leaves.push(name);
        }
    }
    tree.map(node => traverse(node));
    return leaves;
}