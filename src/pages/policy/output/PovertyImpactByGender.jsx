import { useState } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { capitalize, percent } from "../../../api/language";
import HoverCard from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import Screenshottable from "../../../layout/Screenshottable";
import style from "../../../style";

export default function PovertyImpactByGender(props) {
  const { impact, policyLabel } = props;
  console.log(impact)
  const malePovertyChange =
    impact.poverty_by_gender.poverty.male.reform /
      impact.poverty_by_gender.poverty.male.baseline -
    1;
  const femalePovertyChange =
    impact.poverty_by_gender.poverty.female.reform /
      impact.poverty_by_gender.poverty.female.baseline -
    1;
  const maleDeepPovertyChange =
    impact.poverty_by_gender.deep_poverty.male.reform /
      impact.poverty_by_gender.deep_poverty.male.baseline -
    1;
  const femaleDeepPovertyChange =
    impact.poverty_by_gender.deep_poverty.female.reform /
      impact.poverty_by_gender.deep_poverty.female.baseline -
    1;
  const [hovercard, setHoverCard] = useState(null);
  const mobile = useMobile();
  // Decile bar chart. Bars are grey if negative, green if positive.
  const chart = (
    <Plot
      data={[
        {
          x: ["Poverty", "Deep poverty"],
          y: [malePovertyChange, maleDeepPovertyChange],
          type: "bar",
          marker: {
            color: [malePovertyChange, maleDeepPovertyChange].map((value) =>
              value < 0 ? style.colors.DARK_GREEN : style.colors.DARK_GRAY
            ),
          },
          text: [malePovertyChange, maleDeepPovertyChange].map(
            (value) =>
              (value >= 0 ? "+" : "") +
              (value * 100).toFixed(1).toString() +
              "%"
          ),
          textangle: 0,
          hoverinfo: "none",
        },
        {
          x: ["Poverty", "Deep poverty"],
          y: [femalePovertyChange, femaleDeepPovertyChange],
          type: "bar",
          marker: {
            color: [femalePovertyChange, femaleDeepPovertyChange].map((value) =>
              value < 0 ? style.colors.DARK_GREEN : style.colors.DARK_GRAY
            ),
          },
          text: [femalePovertyChange, femaleDeepPovertyChange].map(
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
        bargroupgap: 0.1,
        xaxis: {
          title: "",
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
        const gender = data.points[0].curveNumber == 0 ?
          "male":
          "female";
        const change = data.points[0].y;
        setHoverCard({
          title: group,
          body: `${capitalize(gender)} ${group === "Poverty" ? "" : "deep "}poverty ${change < 0 ? "falls" : "rises"} by ${percent(Math.abs(change))}`
        });
      }}
    />
  );

  const malePovertyRises = malePovertyChange > 0.001;
  const malePovertyFalls = malePovertyChange < -0.001;
  const femalePovertyRises = femalePovertyChange > 0.001;
  const femalePovertyFalls = femalePovertyChange < -0.001;
  const sameEffect = (malePovertyRises == femalePovertyRises) && (malePovertyFalls == femalePovertyFalls);

  return (
    <>
      <Screenshottable>
        <h2>
          {policyLabel}{" "}
          {
            malePovertyRises ?
              "raises"
              : malePovertyFalls ?
                "reduces"
                : "has no effect on"
          }{" male poverty and "}
          {
            sameEffect ?
              "" :
              femalePovertyRises ?
                "raises"
                : femalePovertyFalls ?
                  "reduces"
                  : "has no effect on"
          }{" female poverty"}
        </h2>
        <HoverCard content={hovercard}>{chart}</HoverCard>
      </Screenshottable>
      <p>
        The chart above shows the relative change in the poverty rate for each
        age group.
      </p>
    </>
  );
}
