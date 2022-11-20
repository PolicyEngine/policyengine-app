import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall } from "../../../api/call";
import ErrorPage from "../../../layout/Error";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import PolicySearch from "../PolicySearch";
import BudgetaryImpact from "./BudgetaryImpact";
import DistributionalImpact from "./DistributionalImpact";


export default function PolicyOutput(props) {
    const [searchParams] = useSearchParams();
    const focus = searchParams.get("focus");
    const [impact, setImpact] = useState(null);
    const [error, setError] = useState(null);
    const { metadata, policy } = props;

    useEffect(() => {
        if (policy.id) {
            asyncApiCall(`/${metadata.countryId}/economy/${policy.id}`)
                .then((data) => {
                    setImpact(data);
                })
                .catch((err) => {
                    setError(err);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [policy.id])

    if (error) {
        return (
            <ErrorPage message={`We ran into an issue when trying to simulate your policy. Please try again later. The full message is ${JSON.stringify(error)}`} />
        );
    }

    if (!policy.id) {
        return (
            <ErrorPage message="No policy selected." />
        );
    }

    if (!impact) {
        return <LoadingCentered message="Simulating your policy"/>;
    }

    const policyLabel = policy.label || `Policy #${policy.id}`;

    let pane;

    if (focus === "policyOutput.netIncome") {
        pane = <BudgetaryImpact metadata={metadata} impact={impact} policyLabel={policyLabel} />;
    } else if (focus === "policyOutput.distributionalImpact") {
        pane = <DistributionalImpact metadata={metadata} impact={impact} policyLabel={policyLabel} />;
    }

    return <>
        <div style={{
            display: "flex",
            justifyContent: "centerl",
        }}>
            <h4>Comparing</h4>
            <PolicySearch metadata={metadata} defaultPolicyId={policy.id} defaultPolicyLabel={policy.label}/>
        </div>
        <ResultsPanel>
            {pane}
        </ResultsPanel>
    </>
}