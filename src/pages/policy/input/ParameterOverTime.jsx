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

  if (policy[parameter.parameter]) {
    let reformedValues = getReformedParameter(parameter, policy).values;
    reformedX = Object.keys(reformedValues);
    reformedY = Object.values(reformedValues);
    reformedX.push("2099-12-31");
    reformedY.push(reformedY[reformedY.length - 1]);
  }

  return (
    <>
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: "line",
            line: {
              shape: "hv",
            },
            marker: {
              color: style.colors.DARK_GRAY,
            },
            name: "Current law",
          },
          policy[parameter.parameter] && {
            x: reformedX,
            y: reformedY,
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
          yaxis: getPlotlyAxisFormat(
            parameter.unit,
            Object.values(parameter.values)
          ),
          xaxis: {
            range: ["2000-01-01", "2025-01-01"],
          },
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
