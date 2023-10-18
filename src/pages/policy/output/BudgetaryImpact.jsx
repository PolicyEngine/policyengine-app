import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency } from "../../../api/language";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from "./DownloadCsvButton";
import { plotLayoutFont } from "pages/policy/output/utils";
import React, { useRef } from "react";

export default function BudgetaryImpact(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const mobile = useMobile();

  const budgetaryImpact = impact.budget.budgetary_impact;
  const spendingImpact = impact.budget.benefit_spending_impact;
  const stateTaxImpact = impact.budget.state_tax_revenue_impact;
  const taxImpact = impact.budget.tax_revenue_impact - stateTaxImpact;

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");

  let desktopLabels = [
    "Federal tax revenues",
    "State tax revenues",
    "Benefit spending",
    "Net impact",
  ];
  let mobileLabels = ["Federal taxes", "State taxes", "Benefits", "Net"];
  if (!window.location.pathname.includes("/us/")) {
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
  const screenshotRef = useRef();
  console.log(values, labels, valuesBeforeFilter, labelsBeforeFilter);

  function BudgetaryImpactPlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
    const xArray = labels.length > 0 ? labels : ["Net impact"];
    const yArray = labels.length > 0 ? values : [budgetaryImpact / 1e9];
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
                  budgetaryImpact < 0
                    ? style.colors.DARK_GRAY
                    : style.colors.BLUE,
              },
            },
            connector: { line: { color: style.colors.DARK_GRAY } },
            ...(useHoverCard
              ? {
                  hoverinfo: "none",
                }
              : {
                  customdata: xArray.map((x, i) => {
                    const label = x;
                    // look up label/values array
                    let relevantFigure = yArray[i] * 1e9;
                    // If tax revenues, negate
                    if (label.toLowerCase().includes("tax")) {
                      relevantFigure = -relevantFigure;
                    }
                    let body =
                      relevantFigure < 0
                        ? `This reform would increase<br>`
                        : relevantFigure > 0
                        ? `This reform would reduce<br>`
                        : `This reform would not impact<br>`;
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
            tickprefix: metadata.currency,
            tickformat: ",.1f",
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

  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label;

  // rewrite above but using labels/values
  const data = labels.map((label, index) => {
    return [label, values[index]];
  });

  const downloadButtonStyle = {
    position: "absolute",
    bottom: "11px",
    left: "80px",
  };

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2>
          {policyLabel}
          {" would "}
          {budgetaryImpact > 0 ? "raise " : "cost "}
          {aggregateCurrency(budgetaryImpact, metadata)}
          {" this year "}
          {label}
        </h2>
        <HoverCard>
          <BudgetaryImpactPlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`budgetaryImpact${policyLabel}.csv`}
            style={downloadButtonStyle}
          />
        )}
      </div>
    </>
  );
}
