import ImpactChart from "./ImpactChart";
import Plot from "react-plotly.js";
import plotlyMapData from "./map.json";
import { plotLayoutFont } from "pages/policy/output/utils";
import SearchOptions from "../../../controls/SearchOptions";

export default function DistrictImpact(props) {
  const { policyLabel } = props;

  const chart = (
    <ImpactChart title={`${policyLabel}'s district-level impact`}>
      <p style={{ fontFamily: "Roboto Serif" }}>
        See how this reform impacts{" "}
        <SearchOptions
          options={[
            {
              value: "child_poverty",
              label: "child poverty",
            },
            {
              value: "all_poverty",
              label: "all poverty",
            },
            {
              value: "inequality",
              label: "the Gini index",
            },
            {
              value: "average income",
              label: "average income",
            },
          ]}
          defaultValue="child_poverty"
        />{" "}
        by U.S. congressional district.
      </p>
      {plotlyMapData && (
        <Plot
          data={plotlyMapData["data"]}
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
        />
      )}
      <p style={{ fontFamily: "Roboto Serif" }}>
        PolicyEngine uses data science and administrative statistics to estimate
        district-level impacts of policicies. Learn more about our methodology{" "}
        <a href="/methodology">here</a>.
      </p>
    </ImpactChart>
  );

  return { chart: chart, csv: () => {} };
}
