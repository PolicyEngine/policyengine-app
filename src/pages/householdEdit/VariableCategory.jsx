import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import PolicyEngineContext from "../../countries/PolicyEngine";
import VariableInput from "./VariableInput";

const categoryData = {
    "income": {
        "label": "Income",
    },
    "demographic": {
        "label": "Demographics",
    },
}


export default function VariableCategory(props) {
    const category = props.category;
    const categoryLabel = categoryData[category].label;
    const PolicyEngine = useContext(PolicyEngineContext);

    return <Row style={{paddingTop: 30}}>
        <Col md={3} style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            }}>
            <h2>{categoryLabel}</h2>
        </Col>
        <Col>
            {
                Object.keys(PolicyEngine.variables).filter(
                    (variableName) => {
                        return PolicyEngine.variables[variableName].category === category;
                    }
                ).map((variableName) => {
                    return <VariableInput key={variableName} variable={variableName} />
                }
                )
            }
        </Col>
    </Row>;
}