import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";
import DownloadCsvButton from './DownloadCsvButton';
import { plotLayoutFont } from 'pages/policy/output/utils';

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
  const povertyLabels = ["Male", "Female", "All"];
  const labelToKey = {
    Male: "male",
    Female: "female",
    All: "all",
  };
  const [hovercard, setHoverCard] = useState(null);
  const mobile = useMobile();
  // Decile bar chart. Bars are grey if negative, green if positive.
  const chart = (
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
          title: "Sex",
        },
        yaxis: {
          title: "Relative change",
          tickformat: "+,.1%",
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
      onHover={(data) => {
        const group = data.points[0].x;
        const change = data.points[0].y;
        const baseline =
          group === "All"
            ? impact.poverty.deep_poverty[labelToKey[group]].baseline
            : impact.poverty_by_gender.deep_poverty[labelToKey[group]].baseline;
        const reform =
          group === "All"
            ? impact.poverty.deep_poverty[labelToKey[group]].reform
            : impact.poverty_by_gender.deep_poverty[labelToKey[group]].reform;
        const message = `The percentage of ${
          group === "All"
            ? "people"
            : { male: "men", female: "women" }[group.toLowerCase()]
        } in deep poverty ${
          change < -0.001
            ? `would fall ${percent(-change)} from ${percent(
                baseline
              )} to ${percent(reform)}.`
            : change > 0.001
            ? `would rise ${percent(change)} from ${percent(
                baseline
              )} to ${percent(reform)}.`
            : `would remain at ${percent(baseline)}.`
        }`;
        setHoverCard({
          title: group,
          body: message,
        });
      }}
      onUnhover={() => {
        setHoverCard(null);
      }}
    />
  );

  const povertyRateChange = percent(Math.abs(totalPovertyChange));
  const percentagePointChange =
    Math.round(
      Math.abs(
        impact.poverty.deep_poverty.all.reform -
          impact.poverty.deep_poverty.all.baseline
      ) * 1000
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
    

  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel}{" "}
          {totalPovertyChange > 0
            ? `would raise the deep poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : totalPovertyChange < 0
            ? `would reduce the deep poverty rate ${label} by ${povertyRateChange} (${percentagePointChange}pp)`
            : `wouldn't change the deep poverty rate ${label}`}
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
        <div className="chart-container">
          {!mobile && (
            <DownloadCsvButton preparingForScreenshot={preparingForScreenshot}
              content={data}
              filename="deepPovertyImpactBySex.csv"
              className="download-button"
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
