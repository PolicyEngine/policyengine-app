import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import {
  getSortedParameterValues,
  getReformedParameter,
} from "../../../api/parameters";
import { getPlotlyAxisFormat } from "../../../api/variables";
import useMobile from "../../../layout/Responsive";
import useWindowHeight from "layout/WindowHeight";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import { localeCode } from "lang/format";

export default function ParameterOverTime(props) {
  const { parameter, policy, metadata } = props;
  const mobile = useMobile();
  const windowHeight = useWindowHeight();

  // Extend the last value to 2099 so that the line appears to extend to +inf in
  // the chart
  const extendForDisplay = (x, y) => {
    x.push("2099-12-31");
    y.push(y[y.length - 1]);
  };

  const values = getSortedParameterValues(parameter);
  let x = Object.keys(values);
  let y = Object.values(values);
  extendForDisplay(x, y);
  let reformedX;
  let reformedY;

  if (policy.reform.data[parameter.parameter]) {
    const reformedParameter = getReformedParameter(
      parameter,
      policy.reform.data,
    );
    const reformedValues = getSortedParameterValues(reformedParameter);
    reformedX = Object.keys(reformedValues);
    reformedY = Object.values(reformedValues);
    extendForDisplay(reformedX, reformedY);
  }

  let xaxisValues = reformedX ? x.concat(reformedX) : x;
  xaxisValues = xaxisValues.filter(
    (e) => e !== "0000-01-01" && e !== "2099-12-31",
  );
  const yaxisValues = reformedY ? y.concat(reformedY) : y;
  const xaxisFormat = getPlotlyAxisFormat("date", xaxisValues);
  const yaxisFormat = getPlotlyAxisFormat(parameter.unit, yaxisValues);

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
          xaxis: { ...xaxisFormat },
          yaxis: { ...yaxisFormat },
          legend: {
            // Position above the plot
            y: 1.1,
            orientation: "h",
          },
          ...ChartLogo,
          margin: {
            t: mobile && 10,
            r: mobile && 10,
            l: mobile && 30,
            b: mobile && 30,
          },
          ...plotLayoutFont,
        }}
        // Note that plotly does not dynamically resize inside flexbox
        style={{
          width: "100%",
          height: mobile ? 0.5 * windowHeight : 400,
        }}
        config={{
          displayModeBar: false,
          responsive: true,
          locale: localeCode(metadata.countryId),
        }}
      />
    </>
  );
}
