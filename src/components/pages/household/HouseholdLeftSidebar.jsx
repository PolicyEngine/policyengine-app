import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react"
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";

function SidebarItem(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const name = props.name;
    const label = props.label;
    const selected = PolicyEngine.page === name;

    // If selected, display a Unicode right arrow to the left of the label

    return <motion.div style={{
        backgroundColor: style.colors.WHITE,
        color: style.colors.BLACK,
        cursor: "pointer",
        paddingTop: 5,
        paddingBottom: 5,
    }}
    onClick={() => PolicyEngine.setState({page: name})}
    >
        <motion.h5 
            style={{fontSize: 18}}
            initial={{x: 0}}
            whileHover={{x: 5}}
        >
            {selected && <span style={{marginRight: 10}}>&#8594;</span>}
            {label}
        </motion.h5>
    </motion.div>
}

function SidebarItemGroup(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const name = props.name;
    const label = props.label;
    const groupChildren = props.groupChildren;
    const itemChildren = props.itemChildren;
    const selectedVariableIfExists = PolicyEngine.metadata.variables[PolicyEngine.page];
    const [expanded, setExpanded] = useState(
        props.expanded || (
            selectedVariableIfExists !== undefined
            && selectedVariableIfExists.moduleName.includes(name)
        )
    );

    const expandedComponent = <motion.div style={{
        paddingLeft: 15,
        overflow: "hidden",
    }}
    animate={
        expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
    }
    transition={{
        duration: 0.25,
    }}
    >
        {itemChildren}
        {groupChildren}
    </motion.div>

    return <motion.div style={{
        backgroundColor: style.colors.WHITE,
        color: style.colors.BLACK,
        paddingTop: 5,
        paddingBottom: 5,
        cursor: "pointer",
    }}
    >
        <motion.h5 
            onClick={() => setExpanded(!expanded)}
            initial={{x: 0}}
            whileHover={{x: 5}}
            transition={{duration: 0.25}}
            style={{fontSize: 18}}
        >{label}</motion.h5>
        {expandedComponent}
    </motion.div>
}

function VariableHierarchy(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const variableModules = PolicyEngine.metadata.variableModules;
    const variables = PolicyEngine.metadata.variables;
    // variableModules is a dictionary in the format:
    // "input.income": { title: "Income", index: 0 }
    // variables is a dictionary in the format:
    // "employment_income": { label: "employment income", moduleName: "input.income" }
    let variablesInOrder = [];
    
    const createTreeFromModule = (moduleName) => {
        if (variables[moduleName]) {
            return <SidebarItem 
                name={variables[moduleName].name} 
                label={variables[moduleName].label} 
                key={variables[moduleName].name}
            />
        } else if (variableModules[moduleName]) {
            if (variablesInOrder.includes(moduleName)) {
                variablesInOrder.push(moduleName);
            }
            const module = variableModules[moduleName];
            const childModules = Object.keys(variableModules).filter(
                key => key.includes(moduleName) && key !== moduleName
            ).sort((a, b) => variableModules[a].index - variableModules[b].index);
            const childVariables = Object.keys(variables).filter(
                key => variables[key].moduleName === moduleName
            ).sort((a, b) => variables[a].indexInModule - variables[b].indexInModule);
            for (const childVariable of childVariables) {
                variablesInOrder.push(childVariable);
            }
            return <SidebarItemGroup 
                name={moduleName} 
                key={moduleName}
                label={module.title} 
                groupChildren={childModules.map(createTreeFromModule)} 
                itemChildren={childVariables.map(createTreeFromModule)} 
                expanded={variables[PolicyEngine.page] && moduleName.includes(variables[PolicyEngine.page].moduleName)}
            />
        }

    }
    variablesInOrder = variablesInOrder.filter(item => variables[item]);

    if (!PolicyEngine.variablesInOrder) {
        PolicyEngine.setState({variablesInOrder: variablesInOrder});
    }

    const inputChildren = Object.keys(variableModules).filter(
        key => key.includes("input") && key !== "input"
    )

    // Should fade out at the bottom

    return <div
        style={{
            height: "50%",
            overflow: "auto",
            borderBottomWidth: 3,
            borderBottomStyle: "solid",
            borderBottomColor: style.colors.DARK_GRAY,
        }}
    >
        {inputChildren.map(createTreeFromModule)}
    </div>

}

function VariableSearch() {
    const PolicyEngine = useContext(PolicyEngineContext);
    const variables = PolicyEngine.metadata.variables;
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = Object.keys(variables).filter(
        key => variables[key].label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return <>
        <motion.input
            type="text"
            placeholder="Search for a variable"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
                width: "100%",
                padding: 20,
                border: "none",
                outline: "none",
                backgroundColor: style.colors.LIGHT_GRAY,
            }}
            whileHover={{
                scale: 1.05,
            }}
        />
        <div
            style={{
                height: "40%",
                overflow: "auto",
                paddingTop: 10,
            }}
        >
            {searchTerm && searchResults.map(key => 
                    <div
                        key={key}
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 10}}
                        transition={{duration: 0.05}}
                    >
                        <SidebarItem 
                            name={variables[key].name} 
                            label={variables[key].label} 
                            key={variables[key].name}
                        />
                    </div>
            )}
        </div>
    </>
    
}


export default function HouseholdLeftSidebar(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    return <div
        style={{
            height: `calc(100vh - ${style.spacing.HEADER_SIZE}px - 80px)`,
            overflowY: "hidden",

        }}
    >
        <h2 style={{marginBottom: 50}}>Household</h2>
        <SidebarItemGroup
            name="structure"
            label="Household"
            groupChildren={[
                <SidebarItem key="marital" name="structure.maritalStatus" label="Marital status" />,
                <SidebarItem key="children" name="structure.children" label="Children" />,
            ]}
        />
        <VariableHierarchy />
        <VariableSearch />
    </div>
}