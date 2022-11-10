import { useEffect } from "react";
import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PolicyEngineContext from "../../countries/PolicyEngine";
import Page from "../Layout/Page";
import Breakdown from "./Breakdown";
import EarningsVariation from "./EarningsVariation";

export default function HouseholdPage(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    const household = variable => PolicyEngine.getHouseholdValue(variable);
    const householdStr = variable => PolicyEngine.getFormattedHouseholdValue(variable);

    if (PolicyEngine.householdNeedsSaving) {
        PolicyEngine.saveHousehold();
    }

    if (!PolicyEngine.householdNeedsSaving && !PolicyEngine.householdUnderPolicyCache[PolicyEngine.policyId]) {
        PolicyEngine.countryApiCall(`/household/${PolicyEngine.householdId}/${PolicyEngine.policyId}`)
            .then((data) => {
                let cache = PolicyEngine.householdUnderPolicyCache;
                cache[PolicyEngine.policyId] = data;
                PolicyEngine.setState({householdUnderPolicyCache: cache});
            });
    }

    const tree = [
        {
            title: "How we computed your income",
            key: "breakdown",
        },
        {
            title: "How earnings affect your net income",
            key: "earnings_variation",
            children: [
                {
                    title: "Net income by earnings",
                    key: "earnings_variation_net_income",
                },
                {
                    title: "Marginal tax rate by earnings",
                    key: "earnings_variation_marginal_tax_rate",
                }
            ]
        }
    ]
    
    return (
        <Page
            title={`Your household net income is ${householdStr('household_net_income')}`}
            subtitle="See the details of your household's taxes and benefits below"
            tree={tree}
        >
            <Breakdown />
            <EarningsVariation />
        </Page>
    );
}
