import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { getReformedParameter } from "../../../api/parameters";
import { getPlotlyAxisFormat } from "../../../api/variables";
import useMobile from "../../../layout/Responsive";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";

export default function ParameterOverTime(props) {
  const { parameter, policy } = props;
  const mobile = useMobile();
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
      policy.reform.data,
    ).values;
    reformedX = Object.keys(reformedValues);
    reformedY = Object.values(reformedValues);
    reformedX.push("2099-12-31");
    reformedY.push(reformedY[reformedY.length - 1]);
  }

  let xForRange = reformedX ? x.concat(reformedX) : x;
  xForRange = xForRange.filter((e) => e !== "0000-01-01" && e !== "2099-12-31");
  let xAxisFormat = getPlotlyAxisFormat("date", xForRange);
  let yAxisFormat = getPlotlyAxisFormat(
    parameter.unit,
    reformedY ? y.concat(reformedY) : y,
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
              dash: "dot",
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
          xaxis: xAxisFormat,
          yaxis: {
            ...yAxisFormat,
            tickvals: yAxisTickVals || null,
            ticktext: yAxisTickLabels || null,
          },
          legend: {
            // Position above the plot
            y: 1.1,
            orientation: "h",
          },
          ...ChartLogo,
          margin: {
            t: 0,
            r: mobile && 30,
          },
          ...plotLayoutFont,
        }}
        style={{
          width: "100%",
          height: mobile ? 200 : 400,
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
      />
    </>
  );
}
