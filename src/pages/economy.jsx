import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PolicyEngineContext from "../countries/PolicyEngine";


export default function EconomyPage() {
  const PolicyEngine = useContext(PolicyEngineContext);
  return (
    <Container>
      <h2>Economic impact</h2>
      <h5>If the UK's tax-benefit system moved from {PolicyEngine.policy.label} to {PolicyEngine.reformPolicy.label}, PolicyEngine estimates:</h5>
      <Row style={{paddingTop: 15}}>
        <Col style={{
          textAlign: "right",
        }}>
          <h1>In 2023, <u>{PolicyEngine.reformPolicy.label}</u></h1>
        </Col>
        <Col>
          <h1>raises <u>$18.1bn</u></h1>
          <h1>lowers poverty by  <u>30%</u></h1>
          <h1>lowers inequality by  <u>6%</u></h1>
        </Col>
      </Row>
      <Row>
        <h2>Net cost breakdown</h2>
        <div style={{height: 400}} />
        <h2>Distributional impact</h2>
        <div style={{height: 400}} />
        <h2>Poverty impact</h2>
        <div style={{height: 400}} />
        <h2>Inequality impact</h2>
        <div style={{height: 400}} />
      </Row>
    </Container>
  );
}