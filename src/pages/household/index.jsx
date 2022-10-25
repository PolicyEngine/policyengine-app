import {
    useEffect,
    useState,
} from "react";

export default function HouseholdPage(props) {
    const [netIncome, setNetIncome] = useState(null);
    console.log(props);
    if(!netIncome && props.household && props.policy) {
        fetch(
            `http://127.0.0.1:5000/uk/household/${props.household.householdId}/${props.policy.policyId}/households/household/household_net_income/2022`,
        ).then(
            (response) => response.json(),
        ).then(
            (data) => setNetIncome(data.value),
        );
    }
    if (!props.household || !props.household) {
        return <div>Loading...</div>;
    }
    return (
        <div>
        <h1>Household</h1>
        <p>Your net income is {netIncome}.</p>
        </div>
    );
}