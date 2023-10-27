import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { aggregateCurrency, localeString } from "../../../api/language";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";
import DownloadCsvButton from "./DownloadCsvButton";
import { avgChangeDirection, plotLayoutFont } from "./utils";

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
      yValues.push(values.difference / 1e9);
      const programLabel = metadata.variables[program].label;
      xValues.push(programLabel);
      // [label]'s budgetary impact [rises/falls] by [abs(value)], from [baseline] to [reform].
      textValues.push(
        `${programLabel}'s budgetary impact ${avgChangeDirection(
          values.different,
        )} by ${aggregateCurrency(
          values.difference,
          metadata.countryId,
        )}, from ${aggregateCurrency(
          values.baseline,
          metadata.countryId,
        )} to ${aggregateCurrency(values.reform, metadata.countryId)}.`,
      );
    }
  });

  console.log(xValues, yValues, textValues);

  function DetailedBudgetaryImpactPlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
    const xArray = xValues.concat(["Total"]);
    const yArray = yValues.concat([impact.budget.budgetary_impact]);
    // Decile bar chart. Bars are grey if negative, green if positive.
    return (
      <Plot
        data={[
          {
            x: xArray,
            y: yArray,
            type: "waterfall",
            orientation: "v",
            measure:
              textValues.length > 0
                ? Array(textValues.length).fill("relative").concat(["total"])
                : ["total"],
            marker: {
              color: Object.values(impact.decile.average).map((value) =>
                value < 0 ? style.colors.DARK_GRAY : style.colors.BLUE,
              ),
            },
            increasing: { marker: { color: style.colors.BLUE } },
            decreasing: { marker: { color: style.colors.DARK_GRAY } },
            // Total should be dark gray if negative, dark green if positive
            totals: {
              marker: {
                color:
                  impact.budget.budgetary_impact < 0
                    ? style.colors.DARK_GRAY
                    : style.colors.BLUE,
              },
            },
            text: textValues,
            textangle: 0,
            ...(useHoverCard
              ? {
                  hoverinfo: "none",
                }
              : {
                  customdata: yArray.map((change) =>
                    aggregateCurrency(change, metadata),
                  ),
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
          locale: localeString(metadata),
        }}
        style={{
          width: "100%",
          marginBottom: !mobile && 50,
        }}
        {...(useHoverCard
          ? {
              onHover: (data) => {
                const program = data.points[0].x;
                const change = data.points[0].y;
                setHoverCard({
                  title: `${program}`,
                  body: aggregateCurrency(change, metadata),
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

  const budgetaryImpact = impact.budget.budgetary_impact;

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label;

  const downloadButtonStyle = {
    position: "absolute",
    bottom: "48px",
    left: "70px",
  };

  // We have data in the form {child_benefit: {baseline: -14664753735.275948, difference: 0, reform: -14664753735.275948}, ...}
  // We need it in the form: [["Program", "Baseline", "Reform", "Difference"], ["Child benefit", -14664753735.275948, -14664753735.275948, 0], ...]

  let data = Object.entries(impact.detailed_budget).map(([program, values]) => {
    const programLabel = metadata.variables[program].label;
    return [programLabel, values.baseline, values.reform, values.difference];
  });
  data.unshift(["Program", "Baseline", "Reform", "Difference"]);

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
        <HoverCard>
          <DetailedBudgetaryImpactPlot />
        </HoverCard>
      </Screenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename="budgetaryImpactByProgram.csv"
            style={downloadButtonStyle}
          />
        )}
      </div>
    </>
  );
}
