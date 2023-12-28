import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency, localeCode } from "../../../api/language";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import React, { useRef } from "react";

export default function LabourSupplyResponse(props) {
  const { impact, policyLabel, metadata } = props;
  const mobile = useMobile();

  const incomeEffect = impact.labour_supply_response.income_lsr;
  const substitutionEffect = impact.labour_supply_response.substitution_lsr;

  const labels = ["Income elasticity", "Substitution elasticity", "Net change"];
  const values = [
    incomeEffect / 1e9,
    substitutionEffect / 1e9,
    incomeEffect / 1e9 + substitutionEffect / 1e9,
  ];
  const screenshotRef = useRef();

  function BudgetaryImpactPlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
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
              aggregateCurrency(value * 1e9, metadata),
            ),
            increasing: { marker: { color: style.colors.BLUE } },
            decreasing: { marker: { color: style.colors.DARK_GRAY } },
            // Total should be dark gray if negative, dark green if positive
            totals: {
              marker: {
                color:
                  yArray[2] < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
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
                  customdata: xArray.map(() => {
                    // If tax revenues, negate
                    let body = "blah";
                    return body;
                  }),
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
                const label = data.points[0].x;
                // look up label/values array
                let relevantFigure = values[labels.indexOf(label)] * 1e9;
                // If tax revenues, negate
                if (label.toLowerCase().includes("tax")) {
                  relevantFigure = -relevantFigure;
                }
                let body =
                  relevantFigure < 0
                    ? "This reform would increase "
                    : relevantFigure > 0
                    ? "This reform would reduce "
                    : "This reform would not impact ";
                body += label.toLowerCase().includes("tax")
                  ? label.toLowerCase()
                  : label.toLowerCase().includes("benefit")
                  ? "benefit spending"
                  : "the budget deficit";
                if (relevantFigure === 0) {
                  body += ".";
                } else {
                  body += ` by ${aggregateCurrency(
                    Math.abs(relevantFigure),
                    metadata,
                  )}.`;
                }
                setHoverCard({
                  title: label,
                  body: body,
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

  const netChange = incomeEffect + substitutionEffect;

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2>
          {policyLabel}
          {" would "}
          {netChange > 0 ? "raise " : "lower "}
          {" labor supply by "}
          {aggregateCurrency(netChange, metadata)}
          {" this year "}
        </h2>
        <HoverCard>
          <BudgetaryImpactPlot />
        </HoverCard>
      </DownloadableScreenshottable>
    </>
  );
}
