import { useState } from "react";
import ResultsPanel from "../../../layout/ResultsPanel";
import { Switch } from "antd";
import CodeBlock from "layout/CodeBlock";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getReproducibilityCodeBlock } from "../../../data/reformDefinitionCode";

export default function HouseholdReproducibility(props) {
  const { policy, policyLabel, metadata, householdInput, year } = props;
  const [earningVariation, setEarningVariation] = useState(false);
  const [searchParams] = useSearchParams();
  const region = searchParams.get("region");

  let lines = getReproducibilityCodeBlock(
    "household",
    metadata,
    policy,
    region,
    year,
    householdInput,
    earningVariation,
  );

  // This component shows the Python code necessary to run a microsimulation to reproduce
  // results on PolicyEngine.
  return (
    <>
      <Helmet>
        <title>{`${policyLabel} | Reproduce these results | PolicyEngine`}</title>
      </Helmet>
      <ResultsPanel
        title="Reproduce these results"
        description="Run the code below in a Python notebook to reproduce the results."
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            columnGap: "10px",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          <p style={{ margin: 0 }}>Include earning variation</p>
          <Switch
            checked={earningVariation}
            onChange={() => setEarningVariation(!earningVariation)}
          />
        </div>
        <CodeBlock lines={lines} language={"python"} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 30,
          }}
        ></div>
      </ResultsPanel>
    </>
  );
}
