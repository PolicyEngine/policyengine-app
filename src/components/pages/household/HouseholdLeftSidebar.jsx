import { useContext } from "react"
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import Menu from "../../layout/Menu";



export default function HouseholdLeftSidebar(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const isExpanded = PolicyEngine.householdPage.startsWith("householdOutput.");
    if (!PolicyEngine.metadata) {
        return null;
    }
    const tree = PolicyEngine.variableTree;
    if (!tree) {
        return null;
    }
    const outputMenuTree = [{
        name: "householdOutput",
        label: "Results",
        children: [
            {
                name: "householdOutput.netIncome",
                label: "Net income",
            },
            {
                name: "householdOutput.earnings",
                label: "Varying your earnings",
            },
            {
                name: "householdOutput.mtr",
                label: "Marginal tax rates",
            },
        ],
    }]
    return <>
        <Menu
            tree={tree}
            selected={PolicyEngine.householdPage}
            onSelect={(name) => PolicyEngine.setState({householdPage: name})}
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
            selected={PolicyEngine.householdPage}
            onSelect={(name) => PolicyEngine.setState({householdPage: name})}
        />
    </>
}