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


export default function PolicyLeftSidebar(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const isExpanded = PolicyEngine.householdPage.startsWith("policyOutput.");
    const tree = PolicyEngine.parameterTree;
    const outputMenuTree = [
        {
            name: "policyOutput",
            label: "Results",
            children: [
                {
                    name: "policyOutput.budgetaryImpact",
                    label: "Budgetary impact",
                },
                {
                    name: "policyOutput.distributionalImpact",
                    label: "Distributional impact",
                },
                {
                    name: "policyOutput.winLosses",
                    label: "Winners and losers",
                },
                {
                    name: "policyOutput.povertyImpact",
                    label: "Poverty impact",
                },
                {
                    name: "policyOutput.inequalityImpact",
                    label: "Inequality impact",
                },
            ],
        }
    ]
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
        <div style={{
            borderBottomWidth: 3,
            borderBottomStyle: "solid",
            borderBottomColor: style.colors.DARK_GRAY,
            marginTop: 10,
            marginBottom: 10,
        }} />
        <Menu
            tree={outputMenuTree}
            selected={PolicyEngine.policyPage}
            onSelect={(name) => PolicyEngine.setState({policyPage: name})}
        />
    </div>
}