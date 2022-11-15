import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react"
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import Menu from "../../layout/Menu";

function SidebarItem(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const name = props.name;
    const label = props.label;
    const selected = PolicyEngine.householdPage === name;

    // If selected, display a Unicode right arrow to the left of the label

    return <motion.div style={{
        backgroundColor: style.colors.WHITE,
        color: style.colors.BLACK,
        cursor: "pointer",
        paddingTop: 5,
        paddingBottom: 5,
    }}
    onClick={() => PolicyEngine.setState({policyPage: name})}
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
    const selectedVariableIfExists = (PolicyEngine.metadata.variables[PolicyEngine.householdPage] || {}).moduleName || PolicyEngine.householdPage;
    const [expanded, setExpanded] = useState(
        props.expanded || (
            selectedVariableIfExists.includes(name)
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

function ParameterHierarchy(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const parameters = PolicyEngine.metadata.parameters;
    let parametersInOrder = [];
    
    const createTreeFromModule = (name) => {
        if (parameters[name].type !== "parameterNode") {
            return <SidebarItem 
                name={parameters[name].parameter} 
                label={parameters[name].label || parameters[name].parameter} 
                key={parameters[name].parameter}
            />
        } else {
            // A parameter is an immediate child of another if
            // 1. Its name includes the parent's name
            // 2. It doesn't have more than one additional period
            const children = Object.keys(parameters).filter(
                key => key.includes(name) && (key.split(".").length === name.split(".").length + 1)
            )
            const childNodes = children.filter(
                key => parameters[key].type === "parameterNode"
            )
            const childParameters = children.filter(
                key => parameters[key].type !== "parameterNode"
            )
            for (const childParameter of childParameters) {
                parametersInOrder.push(childParameter);
            }
            return <SidebarItemGroup 
                name={name} 
                key={name}
                label={parameters[name].label || name} 
                groupChildren={childNodes.map(createTreeFromModule)} 
                itemChildren={childParameters.map(createTreeFromModule)} 
                expanded={parameters[PolicyEngine.householdPage] && name.includes(parameters[PolicyEngine.householdPage].parameter)}
            />
        }

    }
    parametersInOrder = parametersInOrder.filter(item => parameters[item]);

    if (!PolicyEngine.parametersInOrder) {
        PolicyEngine.setState({parametersInOrder: parametersInOrder});
    }

    const inputChildren = Object.keys(parameters).filter(
        key => parameters[key].parameter.includes("gov") && key.split(".").length === 2
    )

    return <div
        style={{
            height: "30%",
            overflow: "hidden",
            overflowY: "scroll",
            borderBottomWidth: 3,
            borderBottomStyle: "solid",
            borderBottomColor: style.colors.DARK_GRAY,
        }}
    >
        {inputChildren.map(createTreeFromModule)}
    </div>

}

function ParameterSearch() {
    const PolicyEngine = useContext(PolicyEngineContext);
    const parameters = PolicyEngine.metadata.parameters;
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = Object.keys(parameters).filter(
        key => (parameters[key].label || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return <>
        <motion.input
            type="text"
            placeholder="Search for a parameter"
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
                overflow: "scroll",
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
                            name={parameters[key].name} 
                            label={parameters[key].label} 
                            key={parameters[key].name}
                        />
                    </div>
            )}
        </div>
    </>
    
}

function OutputMenuSidebar(props) {
    return <AnimatePresence>
        <motion.div
            initial={{opacity: 0, x: -10}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -10}}
            enter={{opacity: 1, x: 0}}
        >
            <SidebarItem
                name="householdOutput.netIncome"
                label="Net income"
            />
            <SidebarItem
                name="householdOutput.earnings"
                label="Varying your earnings"
            />
            <SidebarItem
                name="householdOutput.mtr"
                label="Your marginal tax rate"
            />
        </motion.div>
    </AnimatePresence>
}


export default function PolicyLeftSidebar(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const isExpanded = PolicyEngine.householdPage.startsWith("policyOutput.");
    const tree = PolicyEngine.parameterTree;
    return <div
        style={{
            height: `calc(100vh - ${style.spacing.HEADER_SIZE}px - 80px)`,
            overflowY: "scroll",

        }}
    >
        <h2 style={{marginBottom: 50}}>Household</h2>
        <Menu
            tree={tree}
            selected={PolicyEngine.policyPage}
            onSelect={(name) => PolicyEngine.setState({policyPage: name})}
        />
    </div>
}