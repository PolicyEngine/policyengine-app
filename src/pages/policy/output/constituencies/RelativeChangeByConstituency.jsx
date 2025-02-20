import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import {
  ordinal,
  localeCode,
  formatCurrency,
  precision,
  formatPercent,
} from "../../../../lang/format";
import {
  ChartWidthContext,
  HoverCardContext,
} from "../../../../layout/HoverCard";
import style from "../../../../style";
import { plotLayoutFont } from "../utils";
import React from "react";
import ImpactChart, { absoluteChangeMessage, wordWrap } from "../ImpactChart";
import { title } from "./WinnersLosersByConstituency";

export function ImpactPlot(props) {
  const { data, policyLabel, metadata, mobile } = props;

  let xValues = Object.values(data).map((item) => item.x);
  const yValues = Object.values(data).map((item) => item.y);
  for (let i = 0; i < xValues.length; i++) {
    if (yValues[i] % 2 === 0) {
      xValues[i] = xValues[i] + 0.5;
    }
  }
  const colorValues = Object.values(data).map(
    (item) => item.relative_household_income_change,
  );
  const maxAbsValue = Math.max(...colorValues.map(Math.abs));
  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "markers",
          x: xValues,
          y: yValues,
          text: colorValues.map((value) =>
            formatPercent(value, metadata.countryId, {
              minimumFractionDigits: 1,
            }),
          ),
          marker: {
            color: colorValues,
            symbol: "hexagon",
            size: 12,
            coloraxis: "coloraxis",
          },
          showscale: true,
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
            tickformat: ".0%",
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

export default function RelativeChangeByConstituency(props) {
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
    return null;
  };
  return { chart: chart, csv: csv };
}
