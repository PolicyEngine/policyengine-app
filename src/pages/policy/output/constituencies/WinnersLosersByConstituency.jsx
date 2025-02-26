import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { localeCode } from "../../../../lang/format";
import style from "../../../../style";
import { plotLayoutFont } from "../utils";
import React from "react";
import ImpactChart, { wordWrap } from "../ImpactChart";

export function ImpactPlot(props) {
  const { yaxistitle, outcomes_by_region, policyLabel, metadata, mobile } =
    props;

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
        type1 === "all" ? "Of all constituencies," : `Of households in ${y},`;
      const term2 = x;
      const msg = `${term1} ${policyLabel} would cause ${term2} constituencies to ${hoverTextMap[type2]} their net income.`;
      return wordWrap(msg, 50).replaceAll("\n", "<br>");
    }
    const regions =
      type1 === "all"
        ? ["uk"]
        : ["england", "wales", "scotland", "northern_ireland"].reverse();
    const regionLabels =
      type1 === "all"
        ? ["All"]
        : ["England", "Wales", "Scotland", "Northern Ireland"].reverse();
    const counstituencyCounts = regions.map(
      (region) => outcomes_by_region[region][type2],
    );
    const totalConstituencies = regions.map((region) =>
      Object.values(outcomes_by_region[region]).reduce((a, b) => a + b),
    );
    let percentages = [];
    for (let i = 0; i < counstituencyCounts.length; i++) {
      percentages.push(counstituencyCounts[i] / totalConstituencies[i]);
    }
    return {
      x: percentages,
      y: regionLabels,
      xaxis: type1 === "all" ? "x" : "x2",
      yaxis: type1 === "all" ? "y" : "y2",
      type: "bar",
      name: legendTextMap[type2],
      legendgroup: type2,
      showlegend: type1 === "all",
      marker: {
        color: colorMap[type2],
      },
      orientation: "h",
      text: counstituencyCounts,
      textposition: "inside",
      textangle: 0,
      customdata: counstituencyCounts.map((x, i) => {
        const y = regionLabels[i];
        return { title: hoverTitle(y), msg: hoverMessage(x, y) };
      }),
      hovertemplate: `<b>%{customdata.title}</b><br><br>%{customdata.msg}<extra></extra>`,
    };
  }

  const product = (a, b) =>
    a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);

  const data = product(
    ["all", "regions"],
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
        grid: {
          rows: 2,
          columns: 1,
        },
        yaxis: {
          title: "",
          tickvals: ["All"],
          domain: [0.8, 1],
        },
        xaxis: {
          title: "",
          tickformat: ".0%",
          anchor: "y",
          matches: "x2",
          showgrid: false,
          showticklabels: false,
          fixedrange: true,
        },
        xaxis2: {
          title: "Constituency share",
          tickformat: ".0%",
          anchor: "y2",
          fixedrange: true,
        },
        yaxis2: {
          title: yaxistitle,
          anchor: "x2",
          domain: [0, 0.75],
        },
        ...ChartLogo(0.97, -0.3),
        margin: {
          t: 0,
          b: 80,
          l: 130,
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
          tracegroupgap: 10,
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
      style={{
        width: "100%",
        marginBottom: !mobile && 50,
      }}
    />
  );
}

export function title(policyLabel, impact) {
  const outcomes = impact?.constituency_impact?.outcomes_by_region?.uk;
  const count_benefiting =
    outcomes["Gain more than 5%"] + outcomes["Gain less than 5%"];
  const count_losing =
    outcomes["Lose more than 5%"] + outcomes["Lose less than 5%"];
  const count_no_change = outcomes["No change"];
  if (count_benefiting > count_no_change + count_no_change) {
    return `${policyLabel} would raise net income on average in a majority (of ${Math.abs(count_benefiting - count_losing - count_no_change)}) of parliamentary constituencies`;
  } else if (count_losing > count_benefiting + count_no_change) {
    return `${policyLabel} would lower net income on average in a majority (of ${Math.abs(count_losing - count_benefiting - count_no_change)}) of parliamentary constituencies`;
  } else if (count_benefiting > count_losing) {
    return `${policyLabel} would raise net income on average in ${count_benefiting} parliamentary constituencies`;
  } else if (count_benefiting < count_losing) {
    return `${policyLabel} would lower net income on average in ${count_losing} parliamentary constituencies`;
  }
  return `${policyLabel} would not change net income on average in any parliamentary constituency`;
}

export default function WinnersLosersByConstituency(props) {
  const { impact, policyLabel, metadata, mobile } = props;

  const chart = (
    <ImpactChart title={title(policyLabel, impact)}>
      <ImpactPlot
        policyLabel={policyLabel}
        outcomes_by_region={impact?.constituency_impact?.outcomes_by_region}
        metadata={metadata}
        mobile={mobile}
      />
    </ImpactChart>
  );
  const csv = () => {
    const header = ["Region", "Category", "Count", "Percentage"];
    const outcomesData = impact?.constituency_impact?.outcomes_by_region || {};

    const regions = ["uk", "england", "wales", "scotland", "northern_ireland"];
    const regionLabels = [
      "All",
      "England",
      "Wales",
      "Scotland",
      "Northern Ireland",
    ];
    const categories = [
      "Gain more than 5%",
      "Gain less than 5%",
      "No change",
      "Lose less than 5%",
      "Lose more than 5%",
    ];

    const data = [header];

    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];
      const regionLabel = regionLabels[i];

      if (outcomesData[region]) {
        const totalConstituencies = Object.values(outcomesData[region]).reduce(
          (a, b) => a + b,
          0,
        );

        for (const category of categories) {
          const count = outcomesData[region][category] || 0;
          const percentage =
            totalConstituencies > 0 ? count / totalConstituencies : 0;

          data.push([regionLabel, category, count, percentage]);
        }
      }
    }

    return data;
  };
  return { chart: chart, csv: csv };
}
