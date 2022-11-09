import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import { DARK_GRAY, LIGHT_GRAY } from "../../style";
import VariableInput from "./VariableInput";


export default function Variables(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const variables = PolicyEngine.variables;
    const moduleTree = PolicyEngine.variableModuleTree;

    let components = [];

    const addModule = (module, arrayOfParentTitles) => {
        // Display any parent titles like "Inputs / Household / Income"
        let parentPrefix = <></>;
        if (arrayOfParentTitles.length > 0) {
            parentPrefix = <span style={{color: DARK_GRAY}}>{arrayOfParentTitles.join(" / ") + " / "}</span>;
        }

        components.push(
            <div key={module.key}>
                <h2 key={module.title} id={module.key} style={{paddingTop: 30}}>{parentPrefix}{module.title}</h2>
                <p>{module.subtitle}</p>
            </div>
        )

        if (module.children && module.children.length > 0) {
            for (let child of module.children) {
                addModule(child, arrayOfParentTitles.concat([module.title]));
            }
        } else {
            // This module contains variables. Display them sorted by their indexInModule attribute.
            const variablesInModule = Object.values(variables)
                .filter(variable => variable.moduleName === module.key)
                .sort((a, b) => a.indexInModule - b.indexInModule);
            for (let variable of variablesInModule) {
                components.push(<VariableInput key={variable.key} variable={variable.name} />);
            }
        }
    }

    moduleTree.forEach(module => addModule(module, []));

    return <>{components}</>
}