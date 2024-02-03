import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../../api/charts";
import { formatCurrencyAbbr, localeCode } from "../../../../lang/format";
import style from "../../../../style";
import { plotLayoutFont } from "../utils";
import React from "react";
import ImpactChart, { absoluteChangeMessage } from "../ImpactChart";
import { HoverCardContext } from "layout/HoverCard";
import { title } from "./BudgetaryImpact";

function ImpactPlot(props) {
  const { xValues, yValues, budgetaryImpact, useHoverCard, metadata, mobile } =
    props;
  const setHoverCard = useContext(HoverCardContext);
  const formatCur = (x) =>
    formatCurrencyAbbr(x, metadata.countryId, {
      maximumFractionDigits: 1,
    });
  function hoverMessage(x, y) {
    y = y * 1e9;
    const obj =
      x === "Total"
        ? "the budget deficit"
        : `the ${x} program's budgetary impact`;
    const change = x === "Total" ? -y : y;
    return absoluteChangeMessage("This reform", obj, change, 0, formatCur);
  }
  const xArray = xValues.concat(["Total"]);
  const yArray = yValues.concat([budgetaryImpact / 1e9]);
  // Decile bar chart. Bars are grey if negative, green if positive.
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
          textposition: "inside",
          text: yArray.map((y) => formatCur(y * 1e9)),
          textangle: 0,
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
          title: "Program",
        },
        yaxis: {
          title: "Budgetary impact (bn)",
          tickformat: "$,.1f",
          fixedrange: true,
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
        showlegend: false,
        uniformtext: {
          mode: "hide",
          minsize: mobile ? 4 : 8,
        },
        ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
        margin: {
          t: 0,
          b: 80,
          l: 60,
          r: 20,
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
        marginBottom: !mobile && 50,
      }}
      {...(useHoverCard
        ? {
            onHover: (data) => {
              const x = data.points[0].x;
              const y = data.points[0].y;
              setHoverCard({
                title: `${x}`,
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

export default function detailedBudgetaryImpact(props) {
  const { impact, policyLabel, metadata, mobile, useHoverCard = false } = props;
  if (!impact.detailed_budget) {
    return {};
  }
  const budgetaryImpact = impact.budget.budgetary_impact;
  // impact.budget_detail[program] = { baseline: x, reform: y, different: y - z }
  // We need a bar chart showing the programs with nonzero different
  const xValues = [];
  const yValues = [];
  Object.entries(impact.detailed_budget).forEach(([program, values]) => {
    if (values.difference !== 0) {
      yValues.push(values.difference / 1e9);
      const programLabel = metadata.variables[program].label;
      xValues.push(programLabel);
    }
  });
  const chart = (
    <ImpactChart title={title(policyLabel, budgetaryImpact, metadata)}>
      <ImpactPlot
        xValues={xValues}
        yValues={yValues}
        budgetaryImpact={budgetaryImpact}
        metadata={metadata}
        mobile={mobile}
        useHoverCard={useHoverCard}
      />
    </ImpactChart>
  );
  const csv = () => {
    // We have data in the form {child_benefit: {baseline: -14664753735.275948, difference: 0, reform: -14664753735.275948}, ...}
    // We need it in the form: [["Program", "Baseline", "Reform", "Difference"], ["Child benefit", -14664753735.275948, -14664753735.275948, 0], ...]
    let data = Object.entries(impact.detailed_budget).map(
      ([program, values]) => {
        const programLabel = metadata.variables[program].label;
        return [
          programLabel,
          values.baseline,
          values.reform,
          values.difference,
        ];
      },
    );
    data.unshift(["Program", "Baseline", "Reform", "Difference"]);
    return data;
  };
  return { chart: chart, csv: csv };
}
