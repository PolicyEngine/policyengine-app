import Plot from "react-plotly.js";
import { getReformedParameter } from "../../../api/parameters";
import { getPlotlyAxisFormat } from "../../../api/variables";
import style from "../../../style";

export default function ParameterOverTime(props) {
  const { parameter, policy } = props;
  let values = parameter.values;
  if (!values) {
    return null;
  }

  // Ensure the line doesn't go back on itself.

  values = Object.keys(values)
    .sort()
    .reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});

  let x = Object.keys(values);
  let y = Object.values(values);
  // Extend the last value to 2099.
  x.push("2099-12-31");
  y.push(y[y.length - 1]);

  let reformedX;
  let reformedY;

  if (policy.reform.data[parameter.parameter]) {
    let reformedValues = getReformedParameter(
      parameter,
      policy.reform.data
    ).values;
    reformedX = Object.keys(reformedValues);
    reformedY = Object.values(reformedValues);
    reformedX.push("2099-12-31");
    reformedY.push(reformedY[reformedY.length - 1]);
  }

  let yAxisFormat = getPlotlyAxisFormat(
    parameter.unit,
    Object.values(parameter.values)
  );
  let yAxisTickVals;
  let yAxisTickLabels;
  if (parameter.unit === "bool" || parameter.unit === "abolition") {
    yAxisFormat = null;
    yAxisTickVals = [0, 1];
    yAxisTickLabels = ["False", "True"];
  }

  return (
    <>
      <Plot
        data={[
          {
            x: x,
            y: y.map((y) => +y),
            type: "line",
            line: {
              shape: "hv",
            },
            marker: {
              color: style.colors.GRAY,
            },
            name: "Current law",
          },
          policy.reform.data[parameter.parameter] && {
            x: reformedX,
            y: reformedY.map((y) => +y),
            type: "line",
            line: {
              shape: "hv",
            },
            marker: {
              color: style.colors.BLUE,
            },
            name: "Reform",
          },
        ]
          .reverse()
          .filter((x) => x)}
        layout={{
          xaxis: {
            range: ["2000-01-01", "2025-01-01"],
          },
          yaxis: {
            ...yAxisFormat,
            tickvals: yAxisTickVals || null,
            ticktext: yAxisTickLabels || null,
          },
          legend: {
            // Position above the plot
            y: 1.1,
            orientation: "h",
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
      />
    </>
  );
}
