import { useState } from "react";
import { optimiseHousehold } from "../../../api/variables";
import ResultsPanel from "../../../layout/ResultsPanel";
import Button from "../../../controls/Button";
import { Switch } from "antd";
import CodeBlock from "layout/CodeBlock";
import { getReformDefinitionCode } from "data/reformDefinitionCode";

export default function HouseholdReproducibility(props) {
  const { policy, metadata, householdInput } = props;
  const [earningVariation, setEarningVariation] = useState(false);

  let lines = ["from " + metadata.package + " import Simulation"];

  if (policy.reform.data) {
    lines = lines.concat(getReformDefinitionCode(metadata, policy));
  }

  let householdInputCopy = JSON.parse(
    JSON.stringify(optimiseHousehold(householdInput, metadata, true)),
  );

  for (const entityPlural of Object.keys(householdInputCopy)) {
    for (const entity of Object.keys(householdInputCopy[entityPlural])) {
      for (const variable of Object.keys(
        householdInputCopy[entityPlural][entity],
      )) {
        if (variable !== "members") {
          if (
            householdInputCopy[entityPlural][entity][variable][2024] === null
          ) {
            delete householdInputCopy[entityPlural][entity][variable];
          }
        }
        if (earningVariation && variable === "employment_income") {
          delete householdInputCopy[entityPlural][entity][variable];
        }
      }
    }
  }

  if (earningVariation) {
    householdInputCopy["axes"] = [
      [{ name: "employment_income", count: 200, min: 0, max: 200_000 }],
    ];
  }

  let householdJson = JSON.stringify(householdInputCopy, null, 2);
  // It's Python-safe, so we need to make true -> True and false -> False and null -> None
  householdJson = householdJson
    .replace(/true/g, "True")
    .replace(/false/g, "False")
    .replace(/null/g, "None");

  lines = lines.concat([
    "situation = " + householdJson,
    "",
    "simulation = Simulation(",
  ]);

  if (Object.keys(policy.reform.data).length) {
    lines.push("    reform=reform,");
  }

  lines = lines.concat([
    "    situation=situation,",
    ")",
    "",
    "simulation.trace = True",
    'simulation.calculate("household_net_income", 2024)',
    "simulation.tracer.print_computation_log()",
  ]);

  // This component shows the Python code necessary to run a microsimulation to reproduce
  // results on PolicyEngine.
  return (
    <ResultsPanel
      title="Reproduce these results"
      description="Run the code below into a Python notebook to reproduce the microsimulation results."
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
      >
        <Button
          text="Copy"
          style={{ width: 100, margin: "20px auto 10px" }}
          onClick={() => {
            navigator.clipboard.writeText(lines.join("\n"));
          }}
        />
      </div>
    </ResultsPanel>
  );
}
