import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { percent } from "../../../api/language";
import HoverCard from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";

export default function PovertyImpactByGender(props) {
  const { impact, policyLabel } = props;
  const malePovertyChange =
    impact.poverty_by_gender.poverty.male.reform /
      impact.poverty_by_gender.poverty.male.baseline -
    1;
  const femalePovertyChange =
    impact.poverty_by_gender.poverty.female.reform /
      impact.poverty_by_gender.poverty.female.baseline -
    1;
  const totalPovertyChange =
    impact.poverty.poverty.all.reform / impact.poverty.poverty.all.baseline - 1;
  const povertyChanges = [
    malePovertyChange,
    femalePovertyChange,
    totalPovertyChange,
  ];
  const povertyLabels = ["Male", "Female", "All"];
  const labelToKey = {
    Male: "male",
    "Female": "female",
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
        ...ChartLogo,
        margin: {
          t: 0,
          b: 100,
          r: 0,
        },
        height: mobile ? 350 : 450,
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
        const baseline = group == "All" ?
          impact.poverty.poverty[labelToKey[group]].baseline :
          impact.poverty_by_gender.poverty[labelToKey[group]].baseline;
        const reform = group == "All" ?
          impact.poverty.poverty[labelToKey[group]].reform :
          impact.poverty_by_gender.poverty[labelToKey[group]].reform;
        const message = `The percentage of ${
          group === "All" ? "people" : {"male": "men", "female": "women"}[group.toLowerCase()]
        } in poverty ${
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
        impact.poverty.poverty.all.reform - impact.poverty.poverty.all.baseline
      ) * 1000
    ) / 10;

  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel}{" "}
          {totalPovertyChange > 0
            ? `would raise the poverty rate by ${povertyRateChange} (${percentagePointChange}pp)`
            : totalPovertyChange < 0
            ? `would reduce the poverty rate by ${povertyRateChange} (${percentagePointChange}pp)`
            : "wouldn't change the poverty rate"}
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
      <p>
        The chart above shows the relative change in the poverty rate for each sex.
      </p>
    </>
  );
}
