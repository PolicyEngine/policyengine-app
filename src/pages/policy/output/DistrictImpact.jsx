import style from "../../../style";
import ImpactChart from "./ImpactChart";
import Plot from "react-plotly.js";
import plotlyMapData from "./map.json";
import { plotLayoutFont } from "pages/policy/output/utils";

export default function DistrictImpact(props) {
  const { policyLabel, metadata, impact, timePeriod, region } = props;

  const chart = <ImpactChart title={`${policyLabel}'s district-level impact`}>
    {plotlyMapData &&
    <Plot
      data={
        plotlyMapData["data"]
      }
      layout={{
        ...plotlyMapData["layout"],
        xaxis: { title: "Longitude" },
        yaxis: { title: "Latitude" },
        margin: {
          t: 0,
          b: 100,
          r: 0,
        },
        height: 500,
        ...plotLayoutFont,
        showlegend: false,
        // don't show color scale
        coloraxis: { showscale: false },
      }}
      config={{ displayModeBar: false }}
    />}
    <p style={{fontFamily: "Roboto Serif"}}>
      PolicyEngine uses data science and administrative statistics to estimate district-level impacts of policicies. Learn more about our methodology <a href="/methodology">here</a>.
    </p>
  </ImpactChart>

  return { chart: chart, csv: () => {} };
}