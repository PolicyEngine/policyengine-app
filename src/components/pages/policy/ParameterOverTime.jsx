import { useContext } from "react";
import Plot from "react-plotly.js";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import style from "../../../style";


export default function ParameterOverTime(props) {
    const { parameter } = props;
    const PolicyEngine = useContext(PolicyEngineContext);
    const parameters = PolicyEngine.metadata.parameters;
    if (!parameters[parameter]) {
        return "No parameter found";
    }
    const values = parameters[parameter].values;
    if (!values) {
        return "No values";
    }

    <Plot
        data={[
            {
                x: Object.keys(values),
                y: Object.values(values),
                type: 'line',
            }]}
        layout={{
            plot_bgcolor: style.colors.LIGHT_GRAY,
            paper_bgcolor: style.colors.LIGHT_GRAY,
        }}
        style={{
            width: "100%",
            height: 400,
        }}
        config={{
            displayModeBar: false,
        }}
    />
}