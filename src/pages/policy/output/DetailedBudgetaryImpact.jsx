import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency, cardinal } from "../../../api/language";
import { formatVariableValue } from "../../../api/variables";
import HoverCard, {HoverCardContext} from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";
import DownloadCsvButton from './DownloadCsvButton';
import { avgChangeDirection, plotLayoutFont} from './utils';

export default function DetailedBudgetaryImpact(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const mobile = useMobile();

  // impact.budget_detail[program] = { baseline: x, reform: y, different: y - z }
  // We need a bar chart showing the programs with nonzero different

  const xValues = [];
  const yValues = [];
  const textValues = [];

  if (!impact.detailed_budget) {
    return null;
  }

    Object.entries(impact.detailed_budget).forEach(([program, values]) => {
        if (values.difference !== 0) {
            yValues.push(values.difference);
            const programLabel = metadata.variables[program].label;
            xValues.push(programLabel);
            // [label]'s budgetary impact [rises/falls] by [abs(value)], from [baseline] to [reform].
            textValues.push(
                `${programLabel}'s budgetary impact ${avgChangeDirection(values.different)} by ${aggregateCurrency(
                values.difference,
                metadata.countryId
                )}, from ${aggregateCurrency(
                values.baseline,
                metadata.countryId
                )} to ${aggregateCurrency(values.reform, metadata.countryId)}.`
            );
        }
    });
    
    console.log(xValues, yValues, textValues)


  function DetailedBudgetaryImpactPlot() {
    const setHoverCard = useContext(HoverCardContext);
    // Decile bar chart. Bars are grey if negative, green if positive.
    return (
      <Plot
        data={[
          {
            x: xValues.concat(["Total"]),
            y: yValues.concat([impact.budget.budgetary_impact]),
            type: "waterfall",
            orientation: "v",
            measure:
              textValues.length > 0
                ? Array(textValues.length - 1)
                  .fill("relative")
                  .concat(["total"])
                : ["total"],
            marker: {
              color: Object.values(impact.decile.average).map((value) =>
                value < 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN
              ),
            },
            increasing: { marker: { color: style.colors.DARK_GREEN } },
            decreasing: { marker: { color: style.colors.DARK_GRAY } },
            // Total should be dark gray if negative, dark green if positive
            totals: {
              marker: {
                color:
                  impact.budget.budgetary_impact < 0
                    ? style.colors.DARK_GRAY
                    : style.colors.DARK_GREEN,
              },
            },
            text: textValues,
            textangle: 0,
            hoverinfo: "none",
          },
        ]}
        layout={{
          xaxis: {
            title: "Income decile",
            tickvals: Object.keys(impact.decile.average),
          },
          yaxis: {
            title: "Average change",
            tickprefix: metadata.countryId === "uk" ? "£" : "$",
            tickformat: ",.0f",
          },
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
          ...plotLayoutFont
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: "100%",
          marginBottom: !mobile && 50,
        }}
        onHover={(data) => {
          const decile = cardinal(data.points[0].x);
          const change = data.points[0].y;
          const message =
            change > 0.0001
              ? `This reform raises the income of households in the ${decile} decile by an average of ${formatVariableValue(
                metadata.variables.household_net_income,
                change,
                0
              )} per year.`
              : change < -0.0001
                ? `This reform lowers the income of households in the ${decile} decile by an average of ${formatVariableValue(
                  metadata.variables.household_net_income,
                  -change,
                  0
                )} per year.`
                : change === 0
                  ? `This reform has no impact on the income of households in the ${decile} decile.`
                  : (change > 0 ? "This reform raises " : "This reform lowers ") +
                  ` the income of households in the ${decile} decile by less than 0.01%.`;
          setHoverCard({
            title: `Decile ${data.points[0].x}`,
            body: message,
          });
        }}
        onUnhover={() => {
          setHoverCard(null);
        }}
      />
    );
  }

  const averageChange =
    -impact.budget.budgetary_impact / impact.budget.households;
  
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
  region === "us" || region === "uk"
    ? ""
    : "in " + options.find((option) => option.value === region)?.label;
  
  const data = Object.entries(impact.decile.average).map(([key, value]) => [
    `Decile ${key}`,
    value,
  ]);    
  const downloadButtonStyle = {
    position: "absolute",
    bottom: "48px",
    left: "70px",
  };

  return (
    <>
      <Screenshottable>
        <h2>
          {`${policyLabel} ${avgChangeDirection(averageChange)} the net income of households ${label} by ${
          formatVariableValue(
            metadata.variables.household_net_income,
            Math.abs(averageChange),
            0
          )} on average`}
        </h2>
        <HoverCard>
          <DetailedBudgetaryImpactPlot/>
        </HoverCard>
      </Screenshottable>
        <div className="chart-container"> 
          {!mobile &&
            <DownloadCsvButton preparingForScreenshot={preparingForScreenshot}
              content={data}
              filename="absoluteImpactByIncomeDecile.csv"
              style={downloadButtonStyle}
            />
          }
        </div>
      <p>
        {JSON.stringify(impact.detailed_budget)}
      </p>
    </>
  );
}
