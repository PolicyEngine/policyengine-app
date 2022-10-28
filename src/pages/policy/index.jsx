import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";


export default function PolicyPage() {
    const PolicyEngine = useContext(PolicyEngineContext);
    return (
        <div>
        <h1>Policy</h1>
        <p>Country: {PolicyEngine.country}</p>
        <p>Household: {PolicyEngine.householdId}</p>
        <p>Policy: {JSON.stringify(PolicyEngine.policy)}</p>
        <p>Reform policy: {JSON.stringify(PolicyEngine.policy)}</p>
        </div>
    );
    }