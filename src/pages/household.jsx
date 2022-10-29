import {
    useContext,
    useState,
} from "react";
import { Col, Container, Row } from "react-bootstrap";
import PolicyEngineContext from "../countries/PolicyEngine";

export default function HouseholdPage(props) {
    const PolicyEngine = useContext(PolicyEngineContext);
    return (
        <Container>
            <h5>Household</h5>
            <h1>Your household net income is <b><u>$39,000</u></b>.</h1>
            <p>This is your household's remaining income after subtracting taxes and adding eligible benefits.</p>
            <Row style={{paddingTop: 30}}>
                <Col>
                    <h1 style={{paddingLeft: 25}}>$40,000</h1>
                    <h5 style={{paddingLeft: 25}}>Market income</h5>
                </Col>
                <Col>
                    <h4>$40,000 employment income</h4>
                </Col>
            </Row>
            <Row style={{paddingTop: 30}}>
                <Col>
                    <h1>-$5,000</h1>
                    <h5 style={{paddingLeft: 25}}>Taxes</h5>
                </Col>
                <Col>
                    <h4>$3,000 in federal income taxes</h4>
                    <h4>+ 2,000 in State income taxes</h4>
                    <h4>= $7,000</h4>
                </Col>
            </Row>
            <Row style={{paddingTop: 30}}>
                <Col>
                    <h1>+$4,000</h1>
                    <h5 style={{paddingLeft: 25}}>Benefits</h5>
                </Col>
                <Col>
                    <h4>$3,000 from SNAP</h4>
                    <h4>+ $1,000 from SSI</h4>
                    <h4>= $4,000</h4>
                </Col>
            </Row>
            <Row style={{paddingTop: 30}}>
                <Col>
                    <h1>=$39,000</h1>
                    <h5 style={{paddingLeft: 25}}>Net income</h5>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row style={{paddingTop: 30}}>
                <h4>Your marginal tax rate is <b><u>30%</u></b>.</h4>
                <p>If your employment income increased by $1, your household net income would increase by 30c.</p>
            </Row>
            <Row>
                <h2>How your earnings affect your net income</h2>
                <p>If your earnings varied between $0 and $100,000, here's how your net income would respond.</p>
            </Row>
        </Container>
    );
}