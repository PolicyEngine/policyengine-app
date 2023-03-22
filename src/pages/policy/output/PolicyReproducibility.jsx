import Button from "../../../controls/Button";
import style from "../../../style";

export function PythonCodeBlock({ lines }) {
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
    <div style={{ display: "flex", justifyContent: "center" }}>
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

export function getReformDefinitionCode(metadata, policy) {
  let lines = [
    "from policyengine_core.reforms import Reform",
    "from policyengine_core.periods import instant",
    "import pandas as pd",
    "",
    "",
    "def modify_parameters(parameters):",
  ];

  if (Object.keys(policy.reform.data).length === 0) {
    lines.pop();
    return lines;
  }

  for (const [parameterName, parameter] of Object.entries(policy.reform.data)) {
    for (let [instant, value] of Object.entries(parameter)) {
      const [start, end] = instant.split(".");
      if (value === false) {
        value = "False";
      } else if (value === true) {
        value = "True";
      }
      lines.push(
        "    parameters." +
          parameterName +
          '.update(start=instant("' +
          start +
          '"), stop=instant("' +
          end +
          '"), value=' +
          value +
          ")"
      );
    }
  }
  lines.push("    return parameters");

  lines = lines.concat([
    "",
    "",
    "class reform(Reform):",
    "    def apply(self):",
    "        self.modify_parameters(modify_parameters)",
    "",
    "",
  ]);
  return lines;
}

export default function PolicyReproducibility(props) {
  const { policy, metadata } = props;

  let initialLines = [
    "from policyengine_" + metadata.countryId + " import Microsimulation",
  ];

  initialLines = initialLines.concat(getReformDefinitionCode(metadata, policy));

  initialLines = initialLines.concat([
    "baseline = Microsimulation()",
    "reformed = Microsimulation(reform=reform)",
    'HOUSEHOLD_VARIABLES = ["person_id", "household_id", "age", "household_net_income", "household_income_decile", "in_poverty", "household_tax", "household_benefits"]',
    "baseline_person_df = baseline.calculate_dataframe(HOUSEHOLD_VARIABLES, 2022).astype(float)",
    "reformed_person_df = reformed.calculate_dataframe(HOUSEHOLD_VARIABLES, 2022).astype(float)",
    "difference_person_df = reformed_person_df - baseline_person_df",
  ]);

  // This component shows the Python code necessary to run a microsimulation to reproduce
  // results on PolicyEngine.
  return (
    <>
      <h2>Reproduce these results</h2>
      <p>
        Run the code below into a Python notebook to reproduce the
        microsimulation results.
      </p>
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
    </>
  );
}
