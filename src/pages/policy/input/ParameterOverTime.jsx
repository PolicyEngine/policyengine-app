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

  // Extend the last value to 2099 so that the line appears to extend to +inf in
  // the chart
  const extendForDisplay = (x, y) => {
    x.push("2099-12-31");
    y.push(y[y.length - 1]);
  };

  let x = Object.keys(values);
  let y = Object.values(values);
  extendForDisplay(x, y);
  let reformedX;
  let reformedY;

  if (policy.reform.data[parameter.parameter]) {
    let reformedValues = getReformedParameter(
      parameter,
      policy.reform.data,
    ).values;
    reformedX = Object.keys(reformedValues);
    reformedY = Object.values(reformedValues);
    extendForDisplay(reformedX, reformedY);
  }

  let xaxisValues = reformedX ? x.concat(reformedX) : x;
  xaxisValues = xaxisValues.filter(
    (e) => e !== "0000-01-01" && e !== "2099-12-31",
  );
  const yaxisValues = reformedY ? y.concat(reformedY) : y;

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
          xaxis: getPlotlyAxisFormat("date", xaxisValues),
          yaxis: getPlotlyAxisFormat(parameter.unit, yaxisValues),
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
