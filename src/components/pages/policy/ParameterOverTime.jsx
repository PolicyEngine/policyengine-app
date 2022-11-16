import { useContext } from "react";
import Plot from "react-plotly.js";
import { getParameterAtInstant, getReformedParameter } from "../../../logic/parameterValues";
import PolicyEngineContext from "../../../logic/PolicyEngineContext";
import { getPlotlyAxisFormat } from "../../../logic/variableValues";
import style from "../../../style";


export default function ParameterOverTime(props) {
    const { parameter } = props;
    const PolicyEngine = useContext(PolicyEngineContext);
    const parameters = PolicyEngine.metadata.parameters;
    if (!parameters[parameter]) {
        return "No parameter found";
    }
    const metadata = parameters[parameter];
    let values = metadata.values;
    if (!values) {
        return "No values";
    }
    const earliestValue = Object.keys(values).sort()[0];
    const latestValue = Object.keys(values).sort().reverse()[0];
    const earliestYear = parseInt(earliestValue.split("-")[0]);
    const latestYear = parseInt(latestValue.split("-")[0]);
    // Remove pre-1900 values
    values = Object.fromEntries(Object.entries(values).filter(([key, value]) => parseInt(key.split("-")[0]) >= 1900));
    if (earliestYear > 2000) {
        values["2000-01-01"] = values[earliestValue];
    }
    if (latestYear < 2030) {
        values["2030-01-01"] = values[latestValue];
    }

    // Ensure the line doesn't go back on itself.

    values = Object.keys(values).sort().reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
    }, {});

    let reformLine = null;

    if (PolicyEngine.policyReform[parameter]) {
        // Add a blue line for the reform
        let reformPoints = [];
        for (let [key, value] of Object.entries(PolicyEngine.policyReform[parameter])) {
            const [start, end] = key.split(".");

            reformPoints.push({ x: start, y: getParameterAtInstant(metadata, start) });
            reformPoints.push({ x: start, y: value });
            reformPoints.push({ x: end, y: getParameterAtInstant(metadata, end) });
        }

        reformLine = {
            x: reformPoints.map(point => point.x),
            y: reformPoints.map(point => point.y),
            type: "line",
            line: {
                color: style.colors.BLUE,
                shape: "hv",
            },
            name: "Reform",
        }

    }

    return <>
        
    <Plot
        data={[
            {
                x: Object.keys(values),
                y: Object.values(values),
                type: 'line',
                line: {
                    shape: "hv",
                },
                marker: {
                    color: style.colors.DARK_GRAY,
                },
                name: "Current law",
            },
            reformLine,
        ].filter(x => x)}
        layout={{
            yaxis: getPlotlyAxisFormat(metadata.unit),
            xaxis: {
                range: ["2000-01-01", "2025-01-01"],
            }
        }}
        style={{
            width: "100%",
            height: 400,
            padding: 20,
        }}
        config={{
            displayModeBar: false,
        }}
    /></>
}