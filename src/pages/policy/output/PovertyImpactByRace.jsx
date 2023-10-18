import { useContext, useEffect } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from "./DownloadCsvButton";
import { plotLayoutFont } from "pages/policy/output/utils";
import { PovertyChangeContext } from "./PovertyChangeContext";
import React, { useRef } from "react";

export default function PovertyImpactByRace(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  // white, black, hispanic, other
  const whitePovertyChange =
    impact.poverty_by_race.poverty.white.reform /
      impact.poverty_by_race.poverty.white.baseline -
    1;
  const blackPovertyChange =
    impact.poverty_by_race.poverty.black.reform /
      impact.poverty_by_race.poverty.black.baseline -
    1;
  const hispanicPovertyChange =
    impact.poverty_by_race.poverty.hispanic.reform /
      impact.poverty_by_race.poverty.hispanic.baseline -
    1;
  const otherPovertyChange =
    impact.poverty_by_race.poverty.other.reform /
      impact.poverty_by_race.poverty.other.baseline -
    1;
  const totalPovertyChange =
    impact.poverty.poverty.all.reform / impact.poverty.poverty.all.baseline - 1;
  const povertyChanges = [
    whitePovertyChange,
    blackPovertyChange,
    hispanicPovertyChange,
    otherPovertyChange,
    totalPovertyChange,
  ];
  const { minChange, maxChange, addChanges } = useContext(PovertyChangeContext);
  useEffect(() => {
    addChanges(povertyChanges);
  }, [povertyChanges, addChanges]);
  const povertyLabels = [
    "White (non-Hispanic)",
    "Black (non-Hispanic)",
    "Hispanic",
    "Other",
    "All",
  ];
  const labelToKey = {
    "White (non-Hispanic)": "white",
    "Black (non-Hispanic)": "black",
    Hispanic: "hispanic",
    Other: "other",
    All: "all",
  };
  const mobile = useMobile();

  function PovertyImpactByRacePlot(props) {
    const setHoverCard = useContext(HoverCardContext);
    const { useHoverCard = false } = props;
    // Decile bar chart. Bars are grey if negative, green if positive.
    return (
      <Plot
        data={[
          {
            x: povertyLabels,
            y: povertyChanges,
            type: "bar",
            marker: {
              color: povertyChanges.map((value) =>
                value < 0 ? style.colors.BLUE : style.colors.DARK_GRAY,
              ),
            },
            text: povertyChanges.map(
              (value) =>
                (value >= 0 ? "+" : "") +
                (value * 100).toFixed(1).toString() +
                "%",
            ),
            textangle: 0,
            ...(useHoverCard
              ? {
                  hoverinfo: "none",
                }
              : {
                  customdata: povertyLabels.map((x, i) => {
                    const group = x;
                    const change = povertyChanges[i];
                    const baseline =
                      group === "All"
                        ? impact.poverty.poverty[labelToKey[group]].baseline
                        : impact.poverty_by_race.poverty[labelToKey[group]]
                            .baseline;
                    const reform =
                      group === "All"
                        ? impact.poverty.poverty[labelToKey[group]].reform
                        : impact.poverty_by_race.poverty[labelToKey[group]]
                            .reform;
                    return `The percentage of ${
                      group === "All"
                        ? "people"
                        : {
                            white: "White (non-Hispanic) people",
                            black: "Black (non-Hispanic) people",
                            hispanic: "Hispanic people",
                            other: "people of other racial groups",
                          }[labelToKey[group]]
                    } in poverty<br>${
                      change < -0.001
                        ? `would fall ${percent(-change)} from ${percent(
                            baseline,
                          )} to ${percent(reform)}.`
                        : change > 0.001
                        ? `would rise ${percent(change)} from ${percent(
                            baseline,
                          )} to ${percent(reform)}.`
                        : change === 0
                        ? `would remain at ${percent(baseline)}.`
                        : (change > 0 ? "would rise " : "would fall ") +
                          `by less than 0.1%.`
                    }`;
                  }),
                  hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
                }),
          },
        ]}
        layout={{
          xaxis: {
            title: "Race",
          },
          yaxis: {
            title: "Relative change",
            tickformat: "+,.1%",
            range: [Math.min(minChange, 0), Math.max(maxChange, 0)],
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
            minsize: 8,
          },
          ...ChartLogo(mobile ? 0.97 : 0.97, mobile ? -0.25 : -0.15),
          margin: {
            t: 0,
            b: 100,
            r: 0,
          },
          height: mobile ? 350 : 450,
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
                const group = data.points[0].x;
                const change = data.points[0].y;
                const baseline =
                  group === "All"
                    ? impact.poverty.poverty[labelToKey[group]].baseline
                    : impact.poverty_by_race.poverty[labelToKey[group]]
                        .baseline;
                const reform =
                  group === "All"
                    ? impact.poverty.poverty[labelToKey[group]].reform
                    : impact.poverty_by_race.poverty[labelToKey[group]].reform;
                const message = `The percentage of ${
                  group === "All"
                    ? "people"
                    : {
                        white: "White (non-Hispanic) people",
                        black: "Black (non-Hispanic) people",
                        hispanic: "Hispanic people",
                        other: "people of other racial groups",
                      }[labelToKey[group]]
                } in poverty ${
                  change < -0.001
                    ? `would fall ${percent(-change)} from ${percent(
                        baseline,
                      )} to ${percent(reform)}.`
                    : change > 0.001
                    ? `would rise ${percent(change)} from ${percent(
                        baseline,
                      )} to ${percent(reform)}.`
                    : change === 0
                    ? `would remain at ${percent(baseline)}.`
                    : (change > 0 ? "would rise " : "would fall ") +
                      `by less than 0.1%.`
                }`;
                setHoverCard({
                  title: group,
                  body: message,
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

  const povertyRateChange = percent(Math.abs(totalPovertyChange));
  const percentagePointChange =
    Math.round(
      Math.abs(
        impact.poverty.poverty.all.reform - impact.poverty.poverty.all.baseline,
      ) * 1000,
    ) / 10;

  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label;
  const screenshotRef = useRef();
  const csvHeader = ["Race", "Baseline", "Reform", "Change"];
  const data = [
    csvHeader,
    ...povertyLabels.map((label) => {
      const baseline =
        label === "All"
          ? impact.poverty.poverty[labelToKey[label]].baseline
          : impact.poverty_by_race.poverty[labelToKey[label]].baseline;
      const reform =
        label === "All"
          ? impact.poverty.poverty[labelToKey[label]].reform
          : impact.poverty_by_race.poverty[labelToKey[label]].reform;
      const change = reform / baseline - 1;
      return [label, baseline, reform, change];
    }),
  ];
  const downloadButtonStyle = {
    position: "absolute",
    bottom: "19px",
    left: "80px",
  };

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2>
          {policyLabel}{" "}
          {totalPovertyChange > 0
            ? `would raise the poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : totalPovertyChange < 0
            ? `would reduce the poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : `wouldn't change the poverty rate ${label}`}
        </h2>
        <HoverCard>
          <PovertyImpactByRacePlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`povertyImpactByRace${policyLabel}.csv`}
            style={downloadButtonStyle}
          />
        )}
      </div>
      <p>
        The chart above shows the relative change in the poverty rate for each
        top-level racial and ethnic group.
      </p>
    </>
  );
}
