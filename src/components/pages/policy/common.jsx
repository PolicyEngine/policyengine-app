import { findInTree } from "../household/common";


export function buildParameterTree(parameters) {
    let tree = {};

    for (const parameter of Object.values(parameters)) {
        try {
            const nodeToInsert = {
                name: parameter.parameter,
                label: parameter.label,
                index: parameter.indexInModule,
            };
            const pathComponents = parameter.parameter.split(".");
            // For a given path "x.y.z.a", create the nodes x, x.y and x.y.z if they don't exist.
    
            let currentNode = tree;
            let cumulativePath = "";
            for (const key of pathComponents.slice(0, -1)) {
                cumulativePath += key;
                if (!currentNode.children) {
                    currentNode.children = [];
                }
                if (!(currentNode.children.find(child => child.name === cumulativePath))) {
                    currentNode.children.push({
                        label: key,
                        name: cumulativePath,
                        index: 0,
                        children: [],
                    });
                }
                currentNode = currentNode.children.find(child => child.name === cumulativePath);
                cumulativePath += ".";
            }
            currentNode.children.push(nodeToInsert);
        } catch (e) {
            // Ignore
        }
        
    }
    return tree.children.find(child => child.name === "gov").children;
}