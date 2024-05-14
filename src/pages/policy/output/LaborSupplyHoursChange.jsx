import React from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatCurrency, formatCurrencyAbbr, formatNumber, formatNumberAbbr, formatPercent, localeCode } from "../../../lang/format";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { regionName } from "./ImpactChart";

function title(policyLabel, change, metadata) {
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const term1 = `full-time equivalent hours${regionPhrase}`;
  const term2 = formatNumberAbbr(Math.abs(change), metadata.countryId, {
    maximumFractionDigits: 1,
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

  const baseline = impact.labour_supply_response.hours.baseline / 40;
  const reform = impact.labour_supply_response.hours.reform / 40;
  const change = reform - baseline;
  const yArray = [baseline, change, reform];
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const term1 = `hours worked${regionPhrase}`;
  const term2 = formatNumberAbbr(Math.abs(change), metadata.countryId, {
    maximumFractionDigits: 1,
  });
  const relativeChange = formatPercent(Math.abs(change / baseline), metadata.countryId, {
    maximumFractionDigits: 1,
  });
  const signTerm = change > 0 ? "increase" : "decrease";
  const msg =
    change === 0
      ? `${policyLabel} would have no effect on ${term1}`
      : `${policyLabel} would ${signTerm} ${term1} by ${term2} (${relativeChange})`;
  const title = msg;
  const chart = (
    <ImpactChart title={title}>
      <Plot
        data={[
          {
            type: "waterfall",
            x: ["Baseline", "Response", "Net result"],
            y: yArray,
            orientation: "v",
            // 'relative' for all but the last, which is 'total'
            measure: ["relative", "relative", "total"],
            textposition: "inside",
            text: yArray.map((value) => formatNumberAbbr(value, metadata.countryId, { maximumFractionDigits: 1 })),
            increasing: { marker: { color: style.colors.BLUE } },
            decreasing: { marker: { color: style.colors.DARK_GRAY } },
            // Total should be dark gray if negative, dark green if positive
            totals: {
              marker: {
                color:
                  change < 0
                    ? style.colors.DARK_GRAY
                    : style.colors.BLUE,
              },
            },
            connector: {
              line: {
                color: style.colors.MEDIUM_LIGHT_GRAY,
                width: 2,
                dash: "dot",
              },
            },
          },
        ]} 
        layout={{
          xaxis: {
            title: "",
          },
          yaxis: {
            title: "FTE",
            tickformat: ",.0f",
            fixedrange: true,
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
    </ImpactChart>
  );
  const csv = () => {
    const data = null;
    return data;
  };
  return { chart: chart, csv: csv };
}
