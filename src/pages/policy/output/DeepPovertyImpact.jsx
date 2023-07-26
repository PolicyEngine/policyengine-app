import { useContext, useEffect } from 'react';
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard, {HoverCardContext} from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from './DownloadCsvButton';
import React, { useRef } from "react";
import { plotLayoutFont } from 'pages/policy/output/utils';
import { PovertyChangeContext } from './PovertyChangeContext';

export default function DeepPovertyImpact(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const childPovertyChange =
    impact.poverty.deep_poverty.child.reform /
      impact.poverty.deep_poverty.child.baseline -
    1;
  const adultPovertyChange =
    impact.poverty.deep_poverty.adult.reform /
      impact.poverty.deep_poverty.adult.baseline -
    1;
  const seniorPovertyChange =
    impact.poverty.deep_poverty.senior.reform /
      impact.poverty.deep_poverty.senior.baseline -
    1;
  const totalPovertyChange =
    impact.poverty.deep_poverty.all.reform /
      impact.poverty.deep_poverty.all.baseline -
    1;
  const povertyChanges = [
    childPovertyChange,
    adultPovertyChange,
    seniorPovertyChange,
    totalPovertyChange,
  ];
  const { minChange, maxChange, addChanges } = useContext(PovertyChangeContext);
  useEffect(() => {
    addChanges(povertyChanges);
  }, [povertyChanges, addChanges]);
  const povertyLabels = ["Children", "Working-age adults", "Seniors", "All"];
  const labelToKey = {
    Children: "child",
    "Working-age adults": "adult",
    Seniors: "senior",
    All: "all",
  };
  const mobile = useMobile();

  function DeepPovertyImpactPlot() {
    const {setContent, setCoordinates} = useContext(HoverCardContext);

    const dataHandler = (data) => {
      const point = data.points[0];
      const group = point.x;
      const change = point.y;
      const plotLeft = point.xaxis.d2p(group);
      const left = plotLeft + point.xaxis._offset;
      const top = point.yaxis.d2p(change) + point.yaxis._offset;
      if (plotLeft <= point.xaxis._length / 2) {
        setCoordinates(left, top, change >= 0 ? "bottom-left" : "top-left");
      } else {
        setCoordinates(left, top, change >= 0 ? "bottom-right" : "top-right");
      }
      const baseline =
        impact.poverty.deep_poverty[labelToKey[group]].baseline;
      const reform = impact.poverty.deep_poverty[labelToKey[group]].reform;
      const message = `The percentage of ${
        group === "All" ? "people" : group.toLowerCase()
      } in deep poverty ${
        change < -0.001
          ? `would fall ${percent(-change)} from ${percent(
            baseline
          )} to ${percent(reform)}.`
          : change > 0.001
            ? `would rise ${percent(change)} from ${percent(
              baseline
            )} to ${percent(reform)}.`
            : change === 0
              ? `would remain at ${percent(baseline)}.`
              :(change > 0 ? "would rise " : "would fall ") +
              ` by less than 0.1%.`
      }`;
      setContent({
        title: group,
        body: message,
      });
    };

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
                value < 0 ? style.colors.DARK_GREEN : style.colors.DARK_GRAY
              ),
            },
            text: povertyChanges.map(
              (value) =>
                (value >= 0 ? "+" : "") +
                (value * 100).toFixed(1).toString() +
                "%"
            ),
            textangle: 0,
            hoverinfo: "none",
          },
        ]}
        layout={{
          xaxis: {
            title: "Age group",
          },
          yaxis: {
            title: "Relative change",
            tickformat: "+,.1%",
            range: [Math.min(minChange, 0), Math.max(maxChange, 0)],
          },
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

  const povertyRateChange = percent(Math.abs(totalPovertyChange));
  const percentagePointChange =
    Math.round(
      Math.abs(
        impact.poverty.poverty.all.reform - impact.poverty.poverty.all.baseline
      ) * 1000
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
  
  const csvHeader = ['Age Group', 'Baseline', 'Reform', 'Change'];
  const data = [
    csvHeader,
    ...povertyLabels.map((label, index) => {
      return [
        label,
        impact.poverty.deep_poverty[labelToKey[label]].baseline,
        impact.poverty.deep_poverty[labelToKey[label]].reform,
        povertyChanges[index],
      ];
    }),
  ];
  const downloadButtonStyle = {
    position: "absolute",
    bottom: "17px",
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
            ? `would lower the deep poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : `wouldn't change the deep poverty rate ${label}`}
        </h2>
        <HoverCard>
          <DeepPovertyImpactPlot/>
        </HoverCard>
      </DownloadableScreenshottable>
      <div className="chart-container">
        {!mobile && (
          <DownloadCsvButton
            preparingForScreenshot={preparingForScreenshot}
            content={data}
            filename={`deepPovertyImpactByAge${policyLabel}.csv`}
            style={downloadButtonStyle}
            screenshotRef={screenshotRef}
          />
        )}
      </div>
      <p>
        The chart above shows the relative change in the deep poverty rate for
        each age group.
      </p>
    </>
  );
}
