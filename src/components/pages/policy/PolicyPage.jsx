import { useContext } from "react";
import { Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";
import ParameterOverTime from "./ParameterOverTime";


export default function PolicyPage() {
    const PolicyEngine = useContext(PolicyEngineContext);
    const page = PolicyEngine.page;
    const parameters = PolicyEngine.metadata.parameters;
    if (!parameters[page]) {
        return null;
    }
    // value is in the format: {"1999-01-01": 0.5, "2000-01-01": 0.6, ...}
    // We want to show a line chart with the values over time.

    return <div>
        <h1>Policy</h1>
        <ParameterOverTime parameter={page} />
    </div>
}