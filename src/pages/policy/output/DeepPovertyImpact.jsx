import React, { useContext, useEffect, useRef } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard, { HoverCardContext } from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import { plotLayoutFont } from "pages/policy/output/utils";
import { PovertyChangeContext } from "./PovertyChangeContext";

const povertyLabels = ["Children", "Working-age adults", "Seniors", "All"];

const labelToKey = {
  Children: "child",
  "Working-age adults": "adult",
  Seniors: "senior",
  All: "all",
};

class DeepPovertyImpact {}

DeepPovertyImpact.getProps = (impact) => {
  const deepPoverty = impact.poverty.deep_poverty;
  const childPovertyChange =
    deepPoverty.child.reform / deepPoverty.child.baseline - 1;
  const adultPovertyChange =
    deepPoverty.adult.reform / deepPoverty.adult.baseline - 1;
  const seniorPovertyChange =
    deepPoverty.senior.reform / deepPoverty.senior.baseline - 1;
  const totalPovertyChange =
    deepPoverty.all.reform / deepPoverty.all.baseline - 1;
  return {
    deepPoverty: deepPoverty,
    povertyChanges: [
      childPovertyChange,
      adultPovertyChange,
      seniorPovertyChange,
      totalPovertyChange,
    ],
  };
};

DeepPovertyImpact.getCsvData = (props) => {
  const { deepPoverty, povertyChanges } = props;
  const header = ["Age Group", "Baseline", "Reform", "Change"];
  const data = [
    header,
    ...povertyLabels.map((label, index) => {
      return [
        label,
        deepPoverty[labelToKey[label]].baseline,
        deepPoverty[labelToKey[label]].reform,
        povertyChanges[index],
      ];
    }),
  ];
  return data;
};

DeepPovertyImpact.Chart = (props) => {
  const { deepPoverty, povertyChanges, policyLabel, metadata } = props;
  const { minChange, maxChange, addChanges } = useContext(PovertyChangeContext);
  useEffect(() => {
    addChanges(povertyChanges);
  }, [povertyChanges, addChanges]);
  const mobile = useMobile();

  function DeepPovertyImpactPlot(props) {
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
                    const baseline = deepPoverty[labelToKey[group]].baseline;
                    const reform = deepPoverty[labelToKey[group]].reform;
                    return `The percentage of ${
                      group === "All" ? "people" : group.toLowerCase()
                    } in deep poverty<br>${
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
                const baseline = deepPoverty[labelToKey[group]].baseline;
                const reform = deepPoverty[labelToKey[group]].reform;
                const message = `The percentage of ${
                  group === "All" ? "people" : group.toLowerCase()
                } in deep poverty ${
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

  const totalPovertyChange = povertyChanges[3];
  const povertyRateChange = percent(Math.abs(totalPovertyChange));
  const percentagePointChange =
    Math.round(
      Math.abs(deepPoverty.all.reform - deepPoverty.all.baseline) * 1000,
    ) / 10;
  const screenshotRef = useRef();
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
    region === "us" || region === "uk"
      ? ""
      : "in " + options.find((option) => option.value === region)?.label;

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2>
          {policyLabel}{" "}
          {totalPovertyChange > 0
            ? `would raise the deep poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : totalPovertyChange < 0
              ? `would lower the deep poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
              : `wouldn't change the deep poverty rate ${label}`}
        </h2>
        <HoverCard>
          <DeepPovertyImpactPlot />
        </HoverCard>
      </DownloadableScreenshottable>
      <p>
        The chart above shows the relative change in the deep poverty rate for
        each age group.
      </p>
    </>
  );
};

DeepPovertyImpact.Chart.displayName = "DeepPovertyImpact.Chart";

export default DeepPovertyImpact;
