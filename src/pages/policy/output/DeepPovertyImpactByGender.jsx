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

export default function DeepPovertyImpactByGender(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const malePovertyChange =
    impact.poverty_by_gender.deep_poverty.male.reform /
      impact.poverty_by_gender.deep_poverty.male.baseline -
    1;
  const femalePovertyChange =
    impact.poverty_by_gender.deep_poverty.female.reform /
      impact.poverty_by_gender.deep_poverty.female.baseline -
    1;
  const totalPovertyChange =
    impact.poverty.deep_poverty.all.reform /
      impact.poverty.deep_poverty.all.baseline -
    1;
  const povertyChanges = [
    malePovertyChange,
    femalePovertyChange,
    totalPovertyChange,
  ];
  const { minChange, maxChange, addChanges } = useContext(PovertyChangeContext);
  useEffect(() => {
    addChanges(povertyChanges);
  }, [povertyChanges, addChanges]);
  const povertyLabels = ["Male", "Female", "All"];
  const labelToKey = {
    Male: "male",
    Female: "female",
    All: "all",
  };
  const mobile = useMobile();

  function DeepPovertyImpactByGenderPlot(props) {
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
                        ? impact.poverty.deep_poverty[labelToKey[group]]
                            .baseline
                        : impact.poverty_by_gender.deep_poverty[
                            labelToKey[group]
                          ].baseline;
                    const reform =
                      group === "All"
                        ? impact.poverty.deep_poverty[labelToKey[group]].reform
                        : impact.poverty_by_gender.deep_poverty[
                            labelToKey[group]
                          ].reform;
                    return `The percentage of ${
                      group === "All"
                        ? "people"
                        : { male: "men", female: "women" }[group.toLowerCase()]
                    } in deep poverty<br>${
                      change < -0.001
                        ? `would fall ${percent(-change)} from ${percent(
                            baseline,
                          )} to ${percent(reform)}.`
                        : change > 0.001
                        ? `would rise ${percent(change)} from ${percent(
                            baseline,
                          )} to ${percent(reform)}.`
                        : `would remain at ${percent(baseline)}.`
                    }`;
                  }),
                  hovertemplate: `<b>%{x}</b><br><br>%{customdata}<extra></extra>`,
                }),
          },
        ]}
        layout={{
          xaxis: {
            title: "Sex",
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
                    ? impact.poverty.deep_poverty[labelToKey[group]].baseline
                    : impact.poverty_by_gender.deep_poverty[labelToKey[group]]
                        .baseline;
                const reform =
                  group === "All"
                    ? impact.poverty.deep_poverty[labelToKey[group]].reform
                    : impact.poverty_by_gender.deep_poverty[labelToKey[group]]
                        .reform;
                const message = `The percentage of ${
                  group === "All"
                    ? "people"
                    : { male: "men", female: "women" }[group.toLowerCase()]
                } in deep poverty ${
                  change < -0.001
                    ? `would fall ${percent(-change)} from ${percent(
                        baseline,
                      )} to ${percent(reform)}.`
                    : change > 0.001
                    ? `would rise ${percent(change)} from ${percent(
                        baseline,
                      )} to ${percent(reform)}.`
                    : `would remain at ${percent(baseline)}.`
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
        impact.poverty.deep_poverty.all.reform -
          impact.poverty.deep_poverty.all.baseline,
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
  const csvHeader = ["Sex", "Baseline", "Reform", "Change"];
  const data = [
    csvHeader,
    ...povertyLabels.map((label) => {
      const baseline =
        label === "All"
          ? impact.poverty.deep_poverty[labelToKey[label]].baseline
          : impact.poverty_by_gender.deep_poverty[labelToKey[label]].baseline;
      const reform =
        label === "All"
          ? impact.poverty.deep_poverty[labelToKey[label]].reform
          : impact.poverty_by_gender.deep_poverty[labelToKey[label]].reform;
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
            ? `would raise the deep poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : totalPovertyChange < 0
            ? `would reduce the deep poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : `wouldn't change the deep poverty rate ${label}`}
        </h2>
        <HoverCard>
          <DeepPovertyImpactByGenderPlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`deepPovertyImpactBySex${policyLabel}.csv`}
            className="download-button"
            style={downloadButtonStyle}
          />
        )}
      </div>
      <p>
        The chart above shows the relative change in the deep poverty rate for
        each sex.
      </p>
    </>
  );
}
