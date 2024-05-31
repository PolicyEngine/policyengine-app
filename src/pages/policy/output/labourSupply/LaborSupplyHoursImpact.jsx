import React from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import {
  formatNumberAbbr,
  formatPercent,
  localeCode,
} from "../../../../lang/format";
import style from "../../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { regionName } from "../ImpactChart";

function ImpactPlot(props) {
  const { values, labels, metadata, mobile } = props;
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
            formatNumberAbbr(value, metadata.countryId, {
              maximumFractionDigits: 1,
            }),
          ),
          increasing: { marker: { color: style.colors.BLUE } },
          decreasing: { marker: { color: style.colors.DARK_GRAY } },
          // Total should be dark gray if negative, dark blue if positive
          totals: {
            marker: {
              color: values[2] < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
            },
          },
          connector: {
            line: {
              color: style.colors.MEDIUM_LIGHT_GRAY,
              width: 1,
              dash: "dot",
            },
          },
          hovertemplate: `<b>%{x}</b><extra></extra>`,
        },
      ]}
      layout={{
        xaxis: {
          title: "",
        },
        yaxis: {
          title: "Full time-equivalent hours",
          tickformat: ",.0f",
          fixedrange: true,
        },
        hoverlabel: {
          align: "left",
          bgcolor: "#FFF",
          font: { size: "16" },
        },
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

function title(policyLabel, change, metadata) {
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const term1 = `hours worked${regionPhrase}`;
  const term2 = formatPercent(Math.abs(change), metadata.countryId, {
    maximumFractionDigits: 2,
  });
  const signTerm = change > 0 ? "increase" : "decrease";
  const msg =
    change === 0
      ? `${policyLabel} would have no effect on ${term1}`
      : `${policyLabel} would ${signTerm} ${term1} by ${term2}`;
  return msg;
}

export default function lsrHoursImpact(props) {
  const { impact, policyLabel, metadata, mobile } = props;
  const laborSupply = impact.labour_supply_response;
  const incomeEffect = laborSupply.hours.income_effect;
  const substitutionEffect = laborSupply.hours.substitution_effect;
  const overallEffect = laborSupply.hours.change;
  const relEffect = overallEffect / laborSupply.hours.baseline;
  const labels = ["Income effect", "Substitution effect", "Net change"];
  const values = [
    incomeEffect / 40,
    substitutionEffect / 40,
    overallEffect / 40,
  ];
  const hoursToFTE = (weeklyHours) => weeklyHours / 40;
  const baselineFTE = hoursToFTE(laborSupply.hours.baseline);
  const reformFTE = hoursToFTE(laborSupply.hours.reform);
  const changeFTE = hoursToFTE(overallEffect);
  const fmt = (x) =>
    formatNumberAbbr(x, metadata.countryId, {
      maximumFractionDigits: 1,
    });
  const chart = (
    <ImpactChart title={title(policyLabel, relEffect, metadata)}>
      <p>
        This is equivalent to {fmt(changeFTE)},{" "}
        {overallEffect > 0 ? "increasing" : "decreasing"} full time-equivalent
        hours from {fmt(baselineFTE)} to {fmt(reformFTE)}.
      </p>
      <ImpactPlot
        values={values}
        labels={labels}
        metadata={metadata}
        mobile={mobile}
      />
      <p>
        The income effect is the change in earnings from individuals responding
        to the policy&apos;s effect on their net income. The substitution effect
        is the response due the policy&apos;s effect on effective marginal
        wages.
      </p>
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
