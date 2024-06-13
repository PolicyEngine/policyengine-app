import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { formatCurrencyAbbr, localeCode } from "../../../../lang/format";
import style from "../../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { regionName } from "../ImpactChart";
import { ChartWidthContext } from "../../../../layout/HoverCard";

function ImpactPlot(props) {
  const { values, labels, metadata, mobile } = props;
  const xArray = labels;
  const yArray = values;
  const chartWidth = useContext(ChartWidthContext);
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
            formatCurrencyAbbr(value * 1e9, metadata.countryId, {
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
          title: "Earnings (bn)",
          tickformat: "$,.1f",
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
        width: chartWidth,
        ...plotLayoutFont,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
        locale: localeCode(metadata.countryId),
      }}
    />
  );
}

function title(policyLabel, change, metadata) {
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const term1 = `earnings${regionPhrase}`;
  const term2 = formatCurrencyAbbr(Math.abs(change * 1e9), metadata.countryId, {
    maximumFractionDigits: 1,
  });
  const signTerm = change > 0 ? "increase" : "decrease";
  const msg =
    change === 0
      ? `${policyLabel} would have no effect on ${term1}`
      : `${policyLabel} would ${signTerm} ${term1} by ${term2}`;
  return msg;
}

export default function lsrImpactAbsolute(props) {
  const { impact, policyLabel, metadata, mobile } = props;
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
