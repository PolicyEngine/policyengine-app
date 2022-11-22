import { AutoComplete } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall } from "../../../api/call";
import SearchOptions from "../../../controls/SearchOptions";
import ErrorPage from "../../../layout/Error";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import PolicySearch from "../PolicySearch";
import BudgetaryImpact from "./BudgetaryImpact";
import DistributionalImpact from "./RelativeImpactByDecile";
import PovertyImpact from "./PovertyImpact";
import RelativeImpactByDecile from "./RelativeImpactByDecile";
import AverageImpactByDecile from "./AverageImpactByDecile";

function RegionSelector(props) {
    const { metadata } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const options = metadata.economy_options.region.map(region => {return {value: region.name, label: region.label}});
    const [value] = useState(searchParams.get("region") || options[0].value);

    return <SearchOptions
        options={options}
        defaultValue={value}
        onSelect={(value) => {
            let newSearch = {};
            for (const [key, value] of searchParams) {
                newSearch[key] = value;
            }
            newSearch["region"] = value;
            setSearchParams(newSearch);
        }}
        />;
}

function TimePeriodSelector(props) {
    const { metadata } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const options = metadata.economy_options.time_period.map(time_period => {return {value: time_period.name, label: time_period.label}});
    const [value] = useState(searchParams.get("timePeriod") || options[0].value);

    console.log(value, options);
    return <SearchOptions
        options={options}
        defaultValue={value}
        onSelect={(value) => {
            let newSearch = {};
            for (const [key, value] of searchParams) {
                newSearch[key] = value;
            }
            newSearch["timePeriod"] = value;
            setSearchParams(newSearch);
        }}
        />;
}


export default function PolicyOutput(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const focus = searchParams.get("focus");
    const region = searchParams.get("region");
    const timePeriod = searchParams.get("timePeriod");
    const reformPolicyId = searchParams.get("reform");
    const baselinePolicyId = searchParams.get("baseline");
    const [impact, setImpact] = useState(null);
    const [error, setError] = useState(null);
    const { metadata, policy } = props;
    useEffect(() => {
        if (!!region && !!timePeriod && !!reformPolicyId && !!baselinePolicyId) {
            const url = `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}?region=${region}&time_period=${timePeriod}`;
            setImpact(null);
            setError(null);
            asyncApiCall(url, null, 3_000)
                .then((data) => {
                    if (data.status === "error") {
                        setError(data.message);
                    } else {
                        setImpact(data.result);
                    }
                })
                .catch((err) => {
                    setError(err);
                });
        } else {
            const defaults = {region: "uk", timePeriod: 2022, baseline: "current-law"};
            // Set missing query parameters to their defaults.
            const newSearch = {};
            for (const [key, value] of searchParams) {
                newSearch[key] = value;
            }
            for (const [key, value] of Object.entries(defaults)) {
                if (!newSearch[key]) {
                    newSearch[key] = value;
                }
            }
            setSearchParams(newSearch);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

    if (error) {
        return (
            <ErrorPage message={`We ran into an issue when trying to simulate your policy. Please try again later. The full message is ${JSON.stringify(error)}`} />
        );
    }

    if (!reformPolicyId) {
        return (
            <ErrorPage message="No policy selected." />
        );
    }

    let reformLabel = policy.reform.label || `Policy #${reformPolicyId}`;
    let baselineLabel = policy.baseline.label || `Policy #${baselinePolicyId}`;
    let policyLabel;
    if (reformLabel !== "Current law" && baselineLabel === "Current law") {
        policyLabel = reformLabel;
    } else {
        policyLabel = `${baselineLabel} → ${reformLabel}`;
    }
    let pane;

    if (!impact) {
        pane = <LoadingCentered message="Simulating your policy"/>;
    } else if (focus === "policyOutput.netIncome") {
        pane = <BudgetaryImpact metadata={metadata} impact={impact} policyLabel={policyLabel} />;
    } else if (focus === "policyOutput.decileRelativeImpact") {
        pane = <RelativeImpactByDecile metadata={metadata} impact={impact} policyLabel={policyLabel} />;
    } else if (focus === "policyOutput.decileAverageImpact") {
        pane = <AverageImpactByDecile metadata={metadata} impact={impact} policyLabel={policyLabel} />;
    } else if (focus === "policyOutput.povertyImpact") {
        pane = <PovertyImpact metadata={metadata} impact={impact} policyLabel={policyLabel} />;
    }

    return <>
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <h4>Comparing</h4>
            <PolicySearch metadata={metadata} policy={policy} target="reform" />
            <h4>against</h4>
            <PolicySearch metadata={metadata} policy={policy} target="baseline" />
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <h4>in</h4>
            <RegionSelector metadata={metadata} />
            <h4>over</h4>
            <TimePeriodSelector metadata={metadata} />
        </div>
        <ResultsPanel>
            {pane}
        </ResultsPanel>
    </>
}