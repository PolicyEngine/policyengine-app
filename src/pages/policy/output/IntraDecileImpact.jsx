import React from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import style from "../../../style";
import { ordinal, formatPercent, localeCode } from "../../../lang/format";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { regionName, wordWrap } from "./ImpactChart";

// this function is called in this file with yaxistitle="Income decile" from
// IntraWealthDecileImpact with yaxistitle="Wealth decile"
export function ImpactPlot(props) {
  const {
    yaxistitle,
    deciles,
    all,
    decileNumbers,
    policyLabel,
    metadata,
    mobile,
  } = props;
  const colorMap = {
    "Gain more than 5%": style.colors.BLUE,
    "Gain less than 5%": style.colors.BLUE_98,
    "No change": style.colors.LIGHT_GRAY,
    "Lose less than 5%": style.colors.GRAY,
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
      const term2 = formatPercent(x, metadata.countryId, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
      const msg = `${term1} ${policyLabel} would cause ${term2} of people to ${hoverTextMap[type2]} their net income.`;
      return wordWrap(msg, 50).replaceAll("\n", "<br>");
    }
    const xArray = type1 === "all" ? [all[type2]] : deciles[type2];
    const yArray = type1 === "all" ? ["All"] : decileNumbers;
    return {
      x: xArray,
      y: yArray,
      xaxis: type1 === "all" ? "x" : "x2",
      yaxis: type1 === "all" ? "y" : "y2",
      type: "bar",
      name: legendTextMap[type2],
      legendgroup: type2,
      showlegend: type1 === "decile",
      marker: {
        color: colorMap[type2],
      },
      orientation: "h",
      text: xArray.map((value) => (value * 100).toFixed(0).toString() + "%"),
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
    ["all", "decile"],
    [
      "Gain more than 5%",
      "Gain less than 5%",
      "No change",
      "Lose less than 5%",
      "Lose more than 5%",
    ],
  );

  return (
    <Plot
      data={data.map((types) => trace(types[0], types[1]))}
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
          domain: [0.91, 1],
        },
        xaxis: {
          title: "",
          tickformat: ".0%",
          anchor: "y",
          matches: "x2",
          showgrid: false,
          showticklabels: false,
        },
        xaxis2: {
          title: "Population share",
          tickformat: ".0%",
          anchor: "y2",
        },
        yaxis2: {
          title: yaxistitle,
          tickvals: decileNumbers,
          anchor: "x2",
          domain: [0, 0.85],
        },
        hoverlabel: {
          align: "left",
          bgcolor: "#FFF",
          font: { size: "16" },
        },
        uniformtext: {
          mode: "hide",
          minsize: mobile ? 7 : 10,
        },
        showlegend: true,
        legend: {
          title: {
            text: "Change in income<br />",
            font: {
              family: "Roboto Serif",
            },
          },
          //# add spacing between title and entries
          tracegroupgap: 10,
          font: {
            family: "Roboto Serif",
          },
        },
        ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
        margin: {
          t: 0,
          b: 80,
          l: 40,
          r: 0,
        },
        height: mobile ? 300 : 450,
        ...plotLayoutFont,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
        locale: localeCode(metadata.countryId),
      }}
      style={{
        width: "100%",
        marginBottom: !mobile && 50,
      }}
    />
  );
}

export function csv(deciles, all, decileNumbers) {
  const header = [
    "Decile",
    "Gain more than 5%",
    "Gain less than 5%",
    "No change",
    "Lose less than 5%",
    "Lose more than 5%",
  ];
  const data = [
    header,
    ...decileNumbers.map((decile) => {
      return [
        decile,
        deciles["Gain more than 5%"][decile - 1],
        deciles["Gain less than 5%"][decile - 1],
        deciles["No change"][decile - 1],
        deciles["Lose less than 5%"][decile - 1],
        deciles["Lose more than 5%"][decile - 1],
      ];
    }),
    [
      "All",
      all["Gain more than 5%"],
      all["Gain less than 5%"],
      all["No change"],
      all["Lose less than 5%"],
      all["Lose more than 5%"],
    ],
  ];
  return data;
}

export function title(policyLabel, all, metadata) {
  const totalAhead = all["Gain more than 5%"] + all["Gain less than 5%"];
  const totalBehind = all["Lose more than 5%"] + all["Lose less than 5%"];
  const percent = (n) =>
    formatPercent(n, metadata.countryId, { maximumFractionDigits: 0 });
  const totalAheadTerm = percent(totalAhead);
  const totalBehindTerm = percent(totalBehind);
  const objectTerm = "the net income";
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  let msg;
  if (totalAhead > 0 && totalBehind > 0) {
    msg = `${policyLabel} would increase ${objectTerm} for ${totalAheadTerm} of the population${regionPhrase} and decrease it for ${totalBehindTerm}`;
  } else if (totalAhead > 0) {
    msg = `${policyLabel} would increase ${objectTerm} for ${totalAheadTerm} of the population${regionPhrase}`;
  } else if (totalBehind > 0) {
    msg = `${policyLabel} would decrease ${objectTerm} for ${totalBehindTerm} of the population${regionPhrase}`;
  } else {
    msg = `${policyLabel} would have no effect on ${objectTerm} for the population${regionPhrase}`;
  }
  return msg;
}

const description = (countryId) => (
  <p>
    Households are sorted into ten equally-populated groups according to their
    baseline {countryId === "uk" ? "equivalised" : "equivalized"} household net
    income.
  </p>
);

export default function intraDecileImpact(props) {
  const { impact, policyLabel, metadata, mobile } = props;
  const deciles = impact.intra_decile.deciles;
  const all = impact.intra_decile.all;
  const decileNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const chart = (
    <ImpactChart
      title={title(policyLabel, all, metadata)}
      description={description(metadata.countryId)}
    >
      <ImpactPlot
        yaxistitle={"Income decile"}
        deciles={deciles}
        all={all}
        decileNumbers={decileNumbers}
        policyLabel={policyLabel}
        metadata={metadata}
        mobile={mobile}
      />
    </ImpactChart>
  );
  return {
    chart: chart,
    csv: () => csv(deciles, all, decileNumbers),
  };
}
