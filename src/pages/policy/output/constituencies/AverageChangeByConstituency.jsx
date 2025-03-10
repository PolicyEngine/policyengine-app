import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { localeCode, formatCurrency } from "../../../../lang/format";
import style from "../../../../style";
import React from "react";
import ImpactChart from "../ImpactChart";
import { title } from "./WinnersLosersByConstituency";

export function ImpactPlot(props) {
  const { data, metadata, mobile } = props;

  let xValues = Object.values(data).map((item) => item.x);
  const constituencyNames = Object.keys(data);
  let text = [];
  const yValues = Object.values(data).map((item) => item.y);
  const colorValues = Object.values(data).map(
    (item) => item.average_household_income_change,
  );
  let valueStr;
  for (let i = 0; i < xValues.length; i++) {
    if (yValues[i] % 2 === 0) {
      xValues[i] = xValues[i] + 0.5;
    }
    valueStr = formatCurrency(colorValues[i], metadata.countryId);
    text.push(`${constituencyNames[i]}: ${valueStr}`);
  }
  const maxAbsValue = Math.max(...colorValues.map(Math.abs));
  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "markers",
          x: xValues,
          y: yValues,
          text: text,
          marker: {
            color: colorValues,
            symbol: "hexagon",
            size: 12,
            coloraxis: "coloraxis",
          },
          showscale: true,
          hoverinfo: "text",
        },
      ]}
      layout={{
        xaxis: {
          visible: false,
          showgrid: false,
          showline: false,
        },
        yaxis: {
          visible: false,
          showgrid: false,
          showline: false,
        },
        height: 600,
        showlegend: false,
        coloraxis: {
          showscale: true,
          cmin: -maxAbsValue,
          cmax: maxAbsValue,
          colorbar: {
            outlinewidth: 0,
            thickness: 10,
            tickformat: "$,.0f",
          },
          colorscale: [
            [0, style.colors.DARK_GRAY],
            [0.2, style.colors.MEDIUM_LIGHT_GRAY],
            [0.4, style.colors.LIGHT_GRAY],
            [0.6, style.colors.BLUE_LIGHT],
            [1, style.colors.BLUE],
          ],
        },
        margin: {
          t: 0,
          b: 80,
          l: 80,
          r: 0,
        },
        ...ChartLogo(1.1, -0.05),
      }}
      style={{
        width: "90%",
        marginLeft: 20,
        marginBottom: !mobile && 50,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
        locale: localeCode(metadata.countryId),
      }}
    />
  );
}

export default function AverageChangeByConstituency(props) {
  const { impact, policyLabel, metadata, mobile } = props;

  const chart = (
    <ImpactChart title={title(policyLabel, impact)}>
      <ImpactPlot
        data={impact?.constituency_impact?.by_constituency}
        metadata={metadata}
        mobile={mobile}
      />
    </ImpactChart>
  );
  const csv = () => {
    const header = ["Constituency", "Average Change"];
    const constituencyData = impact?.constituency_impact?.by_constituency || {};
    const data = [
      header,
      ...Object.entries(constituencyData).map(([constituency, data]) => {
        return [constituency, data.average_household_income_change];
      }),
    ];
    return data;
  };
  return { chart: chart, csv: csv };
}
