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

export function ImpactPlot(props) {
  const { yaxistitle, all, policyLabel, metadata, mobile } = props;

  const chartWidth = useContext(ChartWidthContext);

  const colorMap = {
    "Gain more than 5%": style.colors.BLUE,
    "Gain less than 5%": style.colors.BLUE_LIGHT,
    "No change": style.colors.LIGHT_GRAY,
    "Lose less than 5%": style.colors.MEDIUM_LIGHT_GRAY,
    "Lose more than 5%": style.colors.DARK_GRAY,
  };

  const hoverTextMap = {
    "Gain more than 5%": "gain more than 5% of",
    "Gain less than 5%": "gain less than 5% of",
    "No change": "neither gain nor lose",
    "Lose less than 5%": "lose less than 5% of",
    "Lose more than 5%": "lose more than 5% of",
  };

  const legendTextMap = {
    "Gain more than 5%": "Gain more than 5%",
    "Gain less than 5%": "Gain less than 5%",
    "No change": "No change",
    "Lose less than 5%": "Loss less than 5%",
    "Lose more than 5%": "Loss more than 5%",
  };

  // type1: "all" | "deciles"
  // type2: "Gain more than 5%" | "Gain less than 5%" | "No change" | "Lose less than 5%" | "Lose more than 5%"
  function trace(type1, type2) {
    const hoverTitle = (y) => (y === "All" ? `All households` : `Decile ${y}`);
    function hoverMessage(x, y) {
      const term1 =
        type1 === "all"
          ? "Of all households,"
          : `Of households in the ${ordinal(y)} decile,`;
      const term2 = x;
      const msg = `${policyLabel} would cause ${term2} constituencies to ${hoverTextMap[type2]} their net income.`;
      return wordWrap(msg, 50).replaceAll("\n", "<br>");
    }
    const xArray = [all[type2]];
    const yArray = ["All"];
    return {
      x: xArray,
      y: yArray,
      xaxis: "x",
      yaxis: "y",
      type: "bar",
      name: legendTextMap[type2],
      legendgroup: type2,
      showlegend: true,
      marker: {
        color: colorMap[type2],
      },
      orientation: "h",
      text: xArray,
      textposition: "inside",
      textangle: 0,
      customdata: xArray.map((x, i) => {
        const y = yArray[i];
        return { title: hoverTitle(y), msg: hoverMessage(x, y) };
      }),
      hovertemplate: `<b>%{customdata.title}</b><br><br>%{customdata.msg}<extra></extra>`,
    };
  }

  const product = (a, b) =>
    a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);

  const data = product(
    ["all"],
    [
      "Gain more than 5%",
      "Gain less than 5%",
      "No change",
      "Lose less than 5%",
      "Lose more than 5%",
    ],
  );

  const plotData = data.map((types) => trace(types[0], types[1]));

  return (
    <Plot
      data={plotData}
      layout={{
        barmode: "stack",
        orientation: "h",
        yaxis: {
          title: "",
          tickvals: ["All"],
          domain: [0.8, 1],
        },
        xaxis: {
          title: "Constituencies",
        },
        ...ChartLogo(0.9, 0.3),
        margin: {
          t: 0,
          b: 80,
          l: 40,
          r: 0,
        },
        hoverlabel: {
          align: "left",
          bgcolor: "#FFF",
          font: { size: "16" },
        },
        height: 300,
        uniformtext: {
          mode: "hide",
          minsize: mobile ? 7 : 10,
        },
        ...plotLayoutFont,
        showlegend: true,
        legend: {
          x: 1,
          y: 1.25,
          title: {
            text: "Change in income<br>",
            font: {
              family: "Roboto Serif",
            },
          },
          font: {
            family: "Roboto Serif",
          },
        },
      }}
      config={{
        displayModeBar: false,
        locale: localeCode(metadata.countryId),
      }}
    />
  );
}

export function title(policyLabel, impact) {
  const count_benefiting =
    impact?.constituency_impact?.overall["Gain more than 5%"] +
    impact?.constituency_impact?.overall["Gain less than 5%"];
  const count_losing =
    impact?.constituency_impact?.overall["Lose more than 5%"] +
    impact?.constituency_impact?.overall["Lose less than 5%"];
  const count_no_change = impact?.constituency_impact?.overall["No change"];
  if (count_benefiting > count_no_change + count_no_change) {
    return `${policyLabel} would raise net income on average in a majority (of ${count_benefiting - count_losing - count_no_change}) of Parliamentary constituencies`;
  } else if (count_no_change > count_benefiting + count_losing) {
    return `${policyLabel} would lower net income on average in a majority (of ${count_losing - count_benefiting - count_no_change}) of Parliamentary constituencies`;
  } else if (count_benefiting > count_losing) {
    return `${policyLabel} would raise net income on average in ${count_benefiting} Parliamentary constituencies`;
  } else if (count_benefiting < count_losing) {
    return `${policyLabel} would lower net income on average in ${count_losing} Parliamentary constituencies`;
  }
  return `${policyLabel} would not change net income on average in any Parliamentary constituency`;
}

export default function WinnersLosersByConstituency(props) {
  const { impact, policyLabel, metadata, mobile } = props;

  const chart = (
    <ImpactChart title={title(policyLabel, impact)}>
      <ImpactPlot
        policyLabel={policyLabel}
        all={impact?.constituency_impact?.overall}
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
