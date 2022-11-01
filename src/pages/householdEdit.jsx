import { useContext } from "react";
import { Container } from "react-bootstrap";
import PolicyEngineContext from "../countries/PolicyEngine";
import HouseholdStructureInput from "./householdEdit/HouseholdStructureInput";
import VariableCategory from "./householdEdit/VariableCategory";


export default function HouseholdEditPage() {
    const PolicyEngine = useContext(PolicyEngineContext);
    return (
        <Container>
        <h1>Household Edit</h1>
        <button onClick={() => PolicyEngine.saveHousehold()}>Save</button>
        <p>Describe your household in as much detail as you'd like. Then, <a href={PolicyEngine.getCountryLink("/household")}>see your taxes and benefits</a>.</p>
       <HouseholdStructureInput />
       <VariableCategory category="income" />
       <VariableCategory category="demographic" />
        </Container>
    );
}