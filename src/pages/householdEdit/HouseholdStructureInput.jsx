import { Col, Row } from "react-bootstrap";
import ChildCountInput from "./ChildCountInput";
import MaritalStatusInput from "./MaritalStatusInput";


export default function HouseholdStructureInput() {
  return (
    <Row>
      <Col
        md={3}
        style={{
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>About your household</h2>
      </Col>
      <Col>
        <MaritalStatusInput />
        <ChildCountInput />
      </Col>
    </Row>
  );
}
