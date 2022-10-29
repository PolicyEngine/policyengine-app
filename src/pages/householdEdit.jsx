import { useContext } from "react";
import { Container } from "react-bootstrap";
import PolicyEngineContext from "../countries/PolicyEngine";


export default function HouseholdEditPage() {
    const PolicyEngine = useContext(PolicyEngineContext);
    return (
        <Container>
        <h1>Household Edit</h1>
        <p>{JSON.stringify(PolicyEngine.household)}</p>
        </Container>
    );
    }