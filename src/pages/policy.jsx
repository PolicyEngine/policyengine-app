import { useContext } from "react";
import { Container } from "react-bootstrap";
import PolicyEngineContext from "../countries/PolicyEngine";


export default function PolicyPage() {
    const PolicyEngine = useContext(PolicyEngineContext);
    return (
        <Container>
        <h1>Policy</h1>
        <p>Country: {PolicyEngine.country}</p>
        <p>Household: {PolicyEngine.householdId}</p>
        <p>Policy: {JSON.stringify(PolicyEngine.policy)}</p>
        <p>Reform policy: {JSON.stringify(PolicyEngine.policy)}</p>
        </Container>
    );
    }