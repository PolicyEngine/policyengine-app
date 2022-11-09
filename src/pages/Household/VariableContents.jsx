import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import TableOfContents from "../Layout/TableOfContents";


export default function VariableContents(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const variables = PolicyEngine.variables;

    const treeData = [
        {
            title: "Government",
            key: "gov",
            children: [],
        }
    ];

    return <TableOfContents tree={treeData} />
}