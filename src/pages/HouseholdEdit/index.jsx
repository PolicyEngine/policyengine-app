import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import PolicyEngineContext from "../../countries/PolicyEngine";
import HouseholdStructureInput from "./HouseholdStructureInput";
import VariableCategory from "./VariableCategory";


export default function HouseholdEditPage() {
    const PolicyEngine = useContext(PolicyEngineContext);
    const navigate = useNavigate();
    return (
        <Container>
        <h1>Household Edit</h1>
        <p>Describe your household in as much detail as you'd like. Then, <u><a style={{cursor: "pointer"}} onClick={() => navigate(PolicyEngine.getCountryLink("/household"))}>see your taxes and benefits</a></u>.</p>
       <HouseholdStructureInput />
       <VariableCategory category="income" />
       <VariableCategory category="demographic" />
        </Container>
    );
}