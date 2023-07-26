import { useContext } from "react";
import Plot from "react-plotly.js";
import { ChartLogo } from "../../../api/charts";
import { cardinal } from "../../../api/language";
import { formatVariableValue } from "../../../api/variables";
import HoverCard, {HoverCardContext} from "../../../layout/HoverCard";
import useMobile from "../../../layout/Responsive";
import DownloadableScreenshottable from "./DownloadableScreenshottable";
import style from "../../../style";
import DownloadCsvButton from './DownloadCsvButton';
import { avgChangeDirection, plotLayoutFont } from './utils';
import React, { useRef } from "react";

export default function AverageImpactByWealthDecile(props) {
  const { impact, policyLabel, metadata, preparingForScreenshot } = props;
  const mobile = useMobile();

  function AverageImpactByWealthDecilePlot() {
    const {setContent, setCoordinates} = useContext(HoverCardContext);

    const dataHandler = (data) => {
      const point = data.points[0];
      const change = point.y;
      const plotLeft = point.xaxis.d2p(point.x);
      const left = plotLeft + point.xaxis._offset;
      const top = point.yaxis.d2p(change) + point.yaxis._offset;
      if (plotLeft <= point.xaxis._length / 2) {
        setCoordinates(left, top, change >= 0 ? "bottom-left" : "top-left");
      } else {
        setCoordinates(left, top, change >= 0 ? "bottom-right" : "top-right");
      }
      const decile = cardinal(point.x);
      const message =
        change > 0.0001
          ? `This reform raises the income of households in the ${decile} wealth decile by an average of ${formatVariableValue(
            metadata.variables.household_net_income,
            change,
            0
          )} per year.`
          : change < -0.0001
            ? `This reform lowers the income of households in the ${decile} wealth decile by an average of ${formatVariableValue(
              metadata.variables.household_net_income,
              -change,
              0
            )} per year.`
            : change === 0
              ? `This reform has no impact on the income of households in the ${decile} wealth decile.`
              : (change > 0 ? "This reform raises " : "This reform lowers ") +
              ` the income of households in the ${decile} wealth decile by less than 0.01%.`;
      setContent({
        title: `Decile ${point.x}`,
        body: message,
      });
    };

    // Decile bar chart. Bars are grey if negative, green if positive.
    return (
      <Plot
        data={[
          {
            x: Object.keys(impact.wealth_decile.average),
            y: Object.values(impact.wealth_decile.average),
            type: "bar",
            marker: {
              color: Object.values(impact.wealth_decile.average).map((value) =>
                value < 0 ? style.colors.DARK_GRAY : style.colors.DARK_GREEN
              ),
            },
            text: Object.values(impact.wealth_decile.average).map(
              (value) =>
                metadata.currency +
                value.toLocaleString("en-GB", { maximumFractionDigits: 0 })
            ),
            textangle: 0,
            hoverinfo: "none",
          },
        ]}
        layout={{
          xaxis: {
            title: "Wealth decile",
            tickvals: Object.keys(impact.wealth_decile.average),
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
        onClick={dataHandler}
        onHover={dataHandler}
        onUnhover={() => {
          setContent(null);
        }}
      />
    );
  }

  const averageChange =
    -impact.budget.budgetary_impact / impact.budget.households;
  
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const screenshotRef = useRef(); 
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const label =
  region === "us" || region === "uk"
    ? ""
    : "in " + options.find((option) => option.value === region)?.label;
  const data = Object.entries(impact.wealth_decile.average).map(([key, value]) => [
    `Decile ${key}`,
    value,
  ]);    
  const downloadButtonStyle = {
    position: "absolute",
    bottom: "40px",
    left: "55px",
  };  

  return (
    <>
      <DownloadableScreenshottable ref={screenshotRef}>
        <h2 style={{ width: '700px', wordWrap: 'break-word' }}>
          {`${policyLabel} ${avgChangeDirection(averageChange)} the net income of households ${label} by ${
            formatVariableValue(
            metadata.variables.household_net_income,
            Math.abs(averageChange),
            0
          )} on average`}
        </h2>
        <HoverCard>
          <AverageImpactByWealthDecilePlot/>
        </HoverCard>
      </DownloadableScreenshottable>
        <div className="chart-container"> 
          {!mobile &&
            <DownloadCsvButton 
              preparingForScreenshot={preparingForScreenshot}
              content={data}
              filename={`absoluteImpactByWealthDecile${policyLabel}.csv`}
              style={downloadButtonStyle}
            />
          }
        </div>
      <p>
        The chart above shows the relative change in income for each wealth
        decile. Households are sorted into ten equally-populated groups
        according to their equivalised household net income.
      </p>
    </>
  );
}
