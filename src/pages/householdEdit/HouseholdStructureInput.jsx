import { Col, Row } from "react-bootstrap";
import ChildCountInput from "./ChildCountInput";
import MaritalStatusInput from "./MaritalStatusInput";


export default function HouseholdStructureInput() {
  return (
    <>
      <div id="your_household" />
      <MaritalStatusInput />
      <ChildCountInput />
    </>
  );
}
