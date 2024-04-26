import style from "../../../style";
import ImpactChart from "./ImpactChart";
import Plot from "react-plotly.js";

export default function DistrictImpact(props) {
  const { policyLabel, metadata, impact, timePeriod, region } = props;

  const chart = <ImpactChart title={`${policyLabel}'s district-level impact`}>
    // Plotly heatmap of U.S. counties with random data
    <Plot
      data={[
        {
          type: "choroplethmapbox",
          geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-counties.json",
          locations: ["CA", "TX", "AZ"],
          z: [1, 2, 3],
        },
      ]}
      layout={{
        xaxis: { title: "Longitude" },
        yaxis: { title: "Latitude" },
        title: `${policyLabel}'s district-level impact`,
      }}
      config={{ displayModeBar: false }}
    />
  </ImpactChart>

  return { chart: chart, csv: () => {} };
}