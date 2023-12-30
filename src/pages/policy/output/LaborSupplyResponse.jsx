import React from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatCurrencyAbbr, localeCode } from "../../../api/language";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart from "./ImpactChart";
import { COUNTRY_NAMES } from "pages/statusPageDefaults";

function ImpactPlot(props) {
  const { values, labels, metadata, mobile, useHoverCard } = props;
  const xArray = labels;
  const yArray = values;
  // Waterfall chart
  return (
    <Plot
      data={[
        {
          x: xArray,
          y: yArray,
          type: "waterfall",
          orientation: "v",
          // 'relative' for all but the last, which is 'total'
          measure:
            labels.length > 0
              ? Array(labels.length - 1)
                  .fill("relative")
                  .concat(["total"])
              : ["total"],
          textposition: "inside",
          text: values.map((value) =>
            formatCurrencyAbbr(value * 1e9, metadata, {
              maximumFractionDigits: 1,
            }),
          ),
          increasing: { marker: { color: style.colors.BLUE } },
          decreasing: { marker: { color: style.colors.DARK_GRAY } },
          // Total should be dark gray if negative, dark green if positive
          totals: {
            marker: {
              color: values[2] < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
            },
          },
          connector: {
            line: { color: style.colors.GRAY, width: 1, dash: "dot" },
          },
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: xArray.map(() => {}),
                hovertemplate: `<b>%{x}</b><extra></extra>`,
              }),
        },
      ]}
      layout={{
        xaxis: {
          title: "",
        },
        yaxis: {
          title: "Employment income (bn)",
          tickformat: "$,.1f",
        },
        ...(useHoverCard
          ? {}
          : {
              hoverlabel: {
                align: "left",
                bgcolor: "#FFF",
                font: { size: "16" },
              },
            }),
        uniformtext: {
          mode: "hide",
          minsize: 12,
        },
        ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
        margin: {
          t: 0,
          b: 100,
          r: 0,
        },
        height: mobile ? 300 : 500,
        ...plotLayoutFont,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
        locale: localeCode(metadata.countryId),
      }}
      style={{
        width: "100%",
      }}
    />
  );
}

export function title(policyLabel, change, metadata) {
  const term1 = "employment income";
  const term2 = formatCurrencyAbbr(Math.abs(change * 1e9), metadata, {
    maximumFractionDigits: 1,
  });
  const signTerm = change > 0 ? "increase" : "decrease";
  const countryId = metadata.countryId;
  const countryPhrase =
    countryId === "us" || countryId === "uk"
      ? ""
      : `in ${COUNTRY_NAMES(countryId)}`;
  // TODO: a tolerance should be used to decide the sign.
  const msg =
    change === 0
      ? `${policyLabel} would have no effect on ${term1} this year ${countryPhrase}`
      : `${policyLabel} would ${signTerm} ${term1} by ${term2} this year ${countryPhrase}`;
  return msg;
}

export default function lsrImpact(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const incomeEffect = impact.labour_supply_response.income_lsr;
  const substitutionEffect = impact.labour_supply_response.substitution_lsr;

  const labels = ["Income effect", "Substitution effect", "Net change"];
  const values = [
    incomeEffect / 1e9,
    substitutionEffect / 1e9,
    incomeEffect / 1e9 + substitutionEffect / 1e9,
  ];
  const chart = (
    <ImpactChart title={title(policyLabel, values[2], metadata)}>
      <ImpactPlot
        values={values}
        labels={labels}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    const data = labels.map((label, index) => {
      return [label, values[index]];
    });
    return data;
  };
  return { chart: chart, csv: csv };
}
