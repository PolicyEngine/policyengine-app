import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency } from "../../../api/language";
import HoverCard, {HoverCardContext} from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from "./DownloadCsvButton";
import { plotLayoutFont } from 'pages/policy/output/utils';
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
  if (region !== "us" && region !== "ca") {
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
    (label, index) => valuesBeforeFilter[index] !== 0
  );
  const screenshotRef = useRef();
  console.log(values, labels, valuesBeforeFilter, labelsBeforeFilter);

  function BudgetaryImpactPlot() {
    const {setContent, setCoordinates} = useContext(HoverCardContext);

    const dataHandler = (data) => {
      const point = data.points[0];
      const label = point.x;
      const plotLeft = point.xaxis.d2p(label);
      const left = plotLeft + point.xaxis._offset;
      const top = point.yaxis.d2p(point.y) + point.yaxis._offset;
      if (plotLeft <= point.xaxis._length / 2) {
        setCoordinates(left, top, point.y >= 0 ? "bottom-left" : "top-left");
      } else {
        setCoordinates(left, top, point.y >= 0 ? "bottom-right" : "top-right");
      }
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
          metadata
        )}.`;
      }
      setContent({
        title: label,
        body: body,
      });
    };

    // Waterfall chart
    return (
      <Plot
        data={[
          {
            x: labels.length > 0 ? labels : ["Net impact"],
            y: labels.length > 0 ? values : [budgetaryImpact / 1e9],
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
            text: values.map((value) => aggregateCurrency(value * 1e9, metadata)),
            increasing: { marker: { color: style.colors.DARK_GREEN } },
            decreasing: { marker: { color: style.colors.DARK_GRAY } },
            // Total should be dark gray if negative, dark green if positive
            totals: {
              marker: {
                color:
                  budgetaryImpact < 0
                    ? style.colors.DARK_GRAY
                    : style.colors.DARK_GREEN,
              },
            },
            connector: { line: { color: style.colors.DARK_GRAY } },
            hoverinfo: "none",
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
          ...plotLayoutFont
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: "100%",
        }}
        onClick={dataHandler}
        onHover={dataHandler}
        onUnhover={() => {
          setContent(null);
        }}
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
          <BudgetaryImpactPlot/>
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
