import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import PolicyEngineContext from "../../countries/PolicyEngine";
import Page from "../Layout/Page";
import TableOfContents from "../Layout/TableOfContents";
import HouseholdStructureInput from "./HouseholdStructureInput";
import Variables from "./Variables";


export default function HouseholdEditPage() {
    const PolicyEngine = useContext(PolicyEngineContext);

    let tree = [
        {
            title: "Your household",
            key: "your_household",
            children: [],
        }
    ]

    tree = tree.concat(PolicyEngine.variableModuleTree);

    return (
        <Page
            title="Household"
            subtitle="Edit household structure and variables"
            leftContent={<TableOfContents tree={tree} />}
        >
            <HouseholdStructureInput />
            <Variables />
        </Page>
    );
}