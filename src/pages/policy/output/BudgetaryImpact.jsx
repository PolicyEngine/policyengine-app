import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency } from "../../../api/language";
import HoverCard from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";
import DownloadCsvButton from './DownloadCsvButton';

export default function BudgetaryImpact(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const mobile = useMobile();

  const budgetaryImpact = impact.budget.budgetary_impact;
  const spendingImpact = impact.budget.benefit_spending_impact;
  const stateTaxImpact = impact.budget.state_tax_revenue_impact;
  const taxImpact = impact.budget.tax_revenue_impact - stateTaxImpact;
  const splitFederalState = metadata.countryId === "us" && stateTaxImpact != 0;
  const desktopLabels = splitFederalState ? ["Federal tax revenues", "Benefit spending", "State tax revenues", "Net impact"] : ["Tax revenues", "Benefit spending", "Net impact"];
  const mobileLabels = splitFederalState ? ["Federal taxes", "Benefits", "State taxes", "Net"] : ["Tax", "Benefit", "Net"];
  const labels = mobile ? mobileLabels : desktopLabels;
  const values = splitFederalState ? [taxImpact / 1e9, -spendingImpact / 1e9, stateTaxImpact / 1e9, -budgetaryImpact / 1e9] : [taxImpact / 1e9, -spendingImpact / 1e9, -budgetaryImpact / 1e9];
  stateTaxImpact;

  const [hovercard, setHoverCard] = useState(null);

  // Waterfall chart
  const chart = (
    <Plot
      data={[
        {
          x: labels,
          y: values,
          type: "waterfall",
          orientation: "v",
          measure: stateTaxImpact != 0 ? ["relative", "relative", "relative", "total"] : ["relative", "relative", "total"],
          textposition: "inside",
          text: [
            aggregateCurrency(-taxImpact, metadata),
            aggregateCurrency(spendingImpact, metadata),
            aggregateCurrency(budgetaryImpact, metadata),
          ],
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
        ...ChartLogo,
        margin: {
          t: 0,
          b: 100,
          r: 0,
        },
        height: mobile ? 300 : 500,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{
        width: "100%",
      }}
      onHover={(data) => {
        const label = data.points[0].x;
        // look up label/values array
        let relevantFigure = values[labels.indexOf(label)] * 1e9;
        // If tax revenues, negate
        if (label.toLowerCase().includes("tax")) {
          relevantFigure = -relevantFigure;
        }
        let body = relevantFigure < 0 ? "This reform would increase " : relevantFigure > 0 ? "This reform would reduce " : "This reform would not impact ";
        body += label.toLowerCase().includes("tax") ? label.toLowerCase() : label.toLowerCase().includes("benefit") ? "benefit spending" : "the budget deficit";
        if (relevantFigure === 0) {
          body += ".";
        } else {
          body += ` by ${aggregateCurrency(
            Math.abs(relevantFigure),
            metadata
          )}.`;
        }
        setHoverCard({
          title: label,
          body: body,
        });
      }}
      onUnhover={() => {
        setHoverCard(null);
      }}
    />
  );
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");

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
    
  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel}
          {" would "}
          {budgetaryImpact > 0 ? "raise " : "cost "}
          {aggregateCurrency(budgetaryImpact, metadata)}
          {" this year "}
          {label}
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
        <div className="chart-container"> 
          {!mobile &&
            <DownloadCsvButton preparingForScreenshot={preparingForScreenshot}
              content={data}
              filename="budgetaryImpact.csv"
              className="download-button"
            />
          }
        </div>
    </>
  );
  
}
