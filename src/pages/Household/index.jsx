import { useEffect } from "react";
import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PolicyEngineContext from "../../countries/PolicyEngine";
import EarningsVariation from "./EarningsVariation";
import HouseholdResult from "./HouseholdResult";

export default function HouseholdPage(props) {
    const PolicyEngine = useContext(PolicyEngineContext);

    if (PolicyEngine.householdNeedsSaving) {
        PolicyEngine.saveHousehold();
    }

    if (!PolicyEngine.householdUnderPolicyCache[PolicyEngine.policyId]) {
        PolicyEngine.countryApiCall(`/household/${PolicyEngine.householdId}/${PolicyEngine.policyId}`)
            .then((data) => {
                let cache = PolicyEngine.householdUnderPolicyCache;
                cache[PolicyEngine.policyId] = data;
                PolicyEngine.setState({householdUnderPolicyCache: cache});
            });
    }
    
    return (
        <Container>
        <h5>Household</h5>
        <h1>
            Your household net income is{" "}
            <b>
            <HouseholdResult
                variable="household_net_income"
                period="2022"
                entity="Your household"
            />
            </b>
            .
        </h1>
        <p>
            This is your household's remaining income after subtracting taxes and
            adding eligible benefits.
        </p>
        <Row style={{ paddingTop: 30 }}>
            <Col>
            <h1 style={{ paddingLeft: 25 }}>
                <HouseholdResult
                variable="household_market_income"
                period="2022"
                entity="Your household"
                />
            </h1>
            <h5 style={{ paddingLeft: 25 }}>Market income</h5>
            </Col>
            <Col>
            <h4>
                <HouseholdResult
                variable="household_market_income"
                period="2022"
                entity="Your household"
                />{" "}
                market income
            </h4>
            </Col>
        </Row>
        <Row style={{ paddingTop: 30 }}>
            <Col>
            <h1>-<HouseholdResult
                variable="household_tax"
                period="2022"
                entity="Your household"
                /></h1>
            <h5 style={{ paddingLeft: 25 }}>Taxes</h5>
            </Col>
            <Col>
            <h4><HouseholdResult
                variable="income_tax"
                period="2022"
                entity="You"
                /> in Income Tax</h4>
            <h4>+ <HouseholdResult
                variable="tv_licence"
                period="2022"
                entity="Your household"
                /> in TV licences</h4>
            <h4>= <HouseholdResult
                variable="household_tax"
                period="2022"
                entity="Your household"
                /></h4>
            </Col>
        </Row>
        <Row style={{ paddingTop: 30 }}>
            <Col>
            <h1>+<HouseholdResult
                variable="household_benefits"
                period="2022"
                entity="Your household"
                /></h1>
            <h5 style={{ paddingLeft: 25 }}>Benefits</h5>
            </Col>
            <Col>
            <h4><HouseholdResult
                variable="universal_credit"
                period="2022"
                entity="Your benefit unit"
                /> from Universal Credit</h4>
            </Col>
        </Row>
        <Row style={{ paddingTop: 30 }}>
            <Col>
            <h1>=<HouseholdResult
                variable="household_net_income"
                period="2022"
                entity="Your household"
                /></h1>
            <h5 style={{ paddingLeft: 25 }}>Net income</h5>
            </Col>
            <Col></Col>
        </Row>
        <Row style={{ paddingTop: 30 }}>
            <EarningsVariation />
        </Row>
        </Container>
    );
}
