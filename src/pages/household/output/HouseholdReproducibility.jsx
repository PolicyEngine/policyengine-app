import { useState } from "react";
import { optimiseHousehold } from "../../../api/variables";
import ResultsPanel from "../../../layout/ResultsPanel";
import Button from "../../../controls/Button";
import { Switch } from "antd";
import style from "../../../style";
import { getReformDefinitionCode } from "../../policy/output/PolicyReproducibility";

function PythonCodeBlock({ lines }) {
  // Turn 4-space indents into padding-left
  const lineIndents = lines.map((line) => {
    let numIndents = 0;
    if (!line) {
      return 0;
    }
    let lineCopy = line.toString();
    while (
      Array.from(lineCopy.slice(0, 4)).filter((char) => char === " ").length ===
      4
    ) {
      lineCopy = lineCopy.slice(4);
      if (lineCopy.length < 4) {
        break;
      }
      numIndents++;
    }
    return numIndents;
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        maxHeight: "50vh",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          backgroundColor: style.colors.DARK_GRAY,
          borderRadius: 20,
          padding: 20,
          width: 600,
          overflowX: "scroll",
        }}
      >
        {lines.map((line, i) => {
          if (line === "") {
            return <div key={i} style={{ paddingTop: 15 }} />;
          } else if (line.includes("situation = {")) {
            return (
              <pre
                key={i}
                style={{
                  color: style.colors.WHITE,
                  fontFamily: "monospace",
                  margin: 0,
                  paddingTop: 5,
                }}
              >
                {line}
              </pre>
            );
          } else {
            return (
              <p
                key={i}
                style={{
                  color: style.colors.WHITE,
                  fontFamily: "monospace",
                  paddingLeft: lineIndents[i] * 30,
                  margin: 0,
                  whiteSpace: "nowrap",
                  paddingTop: 5,
                }}
              >
                {line}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}

export default function HouseholdReproducibility(props) {
  const { policy, metadata, householdInput } = props;
  const [earningVariation, setEarningVariation] = useState(false);

  let initialLines = ["from " + metadata.package + " import Simulation"];

  if (policy.reform.data) {
    initialLines = initialLines.concat(
      getReformDefinitionCode(metadata, policy),
    );
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
            householdInputCopy[entityPlural][entity][variable][2023] === null
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

  initialLines = initialLines.concat([
    "situation = " + householdJson,
    "",
    "simulation = Simulation(",
    Object.keys(policy.reform.data).length ? "    reform=reform," : "",
    "    situation=situation,",
    ")",
    "",
    "simulation.trace = True",
    'simulation.calculate("household_net_income", 2023)',
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
      <PythonCodeBlock lines={initialLines} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 30,
          marginBottom: 30,
        }}
      >
        <Button
          text="Copy"
          style={{ width: 100 }}
          onClick={() => {
            navigator.clipboard.writeText(initialLines.join("\n"));
          }}
        />
      </div>
    </ResultsPanel>
  );
}
