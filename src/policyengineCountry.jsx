import Header from "./layout/header"
import {
    Routes,
    Route,
} from "react-router-dom";
import HouseholdEditPage from "./pages/household_edit";
import HomePage from "./pages/home";
import PolicyPage from "./pages/policy";
import HouseholdPage from "./pages/household";
import EconomyPage from "./pages/economy";
import { useState } from "react";

export default function PolicyEngineCountry(props) {
    const [householdId, setHouseholdId] = useState("single-adult");
    const [policyId, setPolicyId] = useState("current-law");

    const [household, setHousehold] = useState(null);
    const [policy, setPolicy] = useState(null);

    if(household === null) {
        fetch(
            `http://127.0.0.1:5000/${props.country}/household/${householdId}`,
        ).then(
            (response) => response.json(),
        ).then(
            (data) => setHousehold({...data, householdId: householdId}),
        );
    }

    if(policy === null) {
        fetch(
            `http://127.0.0.1:5000/${props.country}/policy/${policyId}`,
        ).then(
            (response) => response.json(),
        ).then(
            (data) => setPolicy({...data, policyId: policyId}),
        );
    }

    return <>
        <Header country={props.country} household={household} policy={policy} />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/household/edit" element={<HouseholdEditPage />} />
            <Route path="/household" element={<HouseholdPage household={household} policy={policy} />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/economy" element={<EconomyPage />} />
        </Routes>
    </>
}