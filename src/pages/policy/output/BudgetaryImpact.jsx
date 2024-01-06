import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { formatCurrencyAbbr, localeCode } from "../../../lang/format";
import { HoverCardContext } from "../../../layout/HoverCard";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import ImpactChart, { absoluteChangeMessage, regionName } from "./ImpactChart";

function ImpactPlot(props) {
  const { budgetaryImpact, values, labels, metadata, mobile, useHoverCard } =
    props;
  const setHoverCard = useContext(HoverCardContext);
  const xArray = labels.length > 0 ? labels : ["Net impact"];
  const yArray = labels.length > 0 ? values : [budgetaryImpact / 1e9];
  const formatCur = (x) =>
    formatCurrencyAbbr(x, metadata, {
      maximumFractionDigits: 1,
    });
  const hoverMessage = (x, y) => {
    y = y * 1e9;
    // If not tax revenues, negate
    if (!x.toLowerCase().includes("tax")) {
      y = -y;
    }
    const obj = x.toLowerCase().includes("tax")
      ? x.toLowerCase()
      : x.toLowerCase().includes("benefit")
        ? "benefit spending"
        : "the budget deficit";
    return absoluteChangeMessage("This reform", obj, y, 0, formatCur);
  };
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
            yArray.length > 1 &&
            Array(yArray.length - 1)
              .fill("relative")
              .concat(["total"]),
          textposition: "inside",
          text: values.map((value) => formatCur(value * 1e9)),
          increasing: { marker: { color: style.colors.BLUE } },
          decreasing: { marker: { color: style.colors.DARK_GRAY } },
          // Total should be dark gray if negative, dark green if positive
          totals: {
            marker: {
              color:
                budgetaryImpact < 0
                  ? style.colors.DARK_GRAY
                  : style.colors.BLUE,
            },
          },
          connector: {
            line: { color: style.colors.GRAY, width: 2, dash: "dot" },
          },
          ...(useHoverCard
            ? {
                hoverinfo: "none",
              }
            : {
                customdata: xArray.map((x, i) => hoverMessage(x, yArray[i])),
                hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
              }),
        },
      ]}
      layout={{
        xaxis: {
          title: "",
        },
        yaxis: {
          title: "Budgetary impact (bn)",
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
      {...(useHoverCard
        ? {
            onHover: (data) => {
              const x = data.points[0].x;
              const y = yArray[xArray.indexOf(x)];
              setHoverCard({
                title: x,
                body: hoverMessage(x, y),
              });
            },
            onUnhover: () => {
              setHoverCard(null);
            },
          }
        : {})}
    />
  );
}

export function title(policyLabel, change, metadata) {
  const term1 = "the budget";
  const term2 = formatCurrencyAbbr(Math.abs(change), metadata, {
    maximumFractionDigits: 1,
  });
  const signTerm = change > 0 ? "raise" : "cost";
  const region = regionName(metadata);
  const regionPhrase = region ? ` in ${region}` : "";
  const msg =
    change === 0
      ? `${policyLabel} would have no effect on ${term1}${regionPhrase} this year`
      : `${policyLabel} would ${signTerm} ${term2}${regionPhrase} this year`;
  return msg;
}

export default function budgetaryImpact(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  const budgetaryImpact = impact.budget.budgetary_impact;
  const spendingImpact = impact.budget.benefit_spending_impact;
  const stateTaxImpact = impact.budget.state_tax_revenue_impact;
  const taxImpact = impact.budget.tax_revenue_impact - stateTaxImpact;
  const desktopLabels = [
    "Federal tax revenues",
    "State and local income tax revenues",
    "Benefit spending",
    "Net impact",
  ];
  const mobileLabels = [
    "Federal taxes",
    "State and local income taxes",
    "Benefits",
    "Net",
  ];
  if (metadata.countryId !== "us") {
    desktopLabels[0] = "Tax revenues";
    mobileLabels[0] = "Taxes";
  }
  const labelsBeforeFilter = mobile ? mobileLabels : desktopLabels;
  const valuesBeforeFilter = [
    taxImpact / 1e9,
    stateTaxImpact / 1e9,
    -spendingImpact / 1e9,
    budgetaryImpact / 1e9,
  ];
  const values = valuesBeforeFilter.filter((value) => value !== 0);
  // Only include labels for which there is a value
  const labels = labelsBeforeFilter.filter(
    (label, index) => valuesBeforeFilter[index] !== 0,
  );
  const chart = (
    <ImpactChart title={title(policyLabel, budgetaryImpact, metadata)}>
      <ImpactPlot
        budgetaryImpact={budgetaryImpact}
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
