import CodeBlock from "layout/CodeBlock";
import { getReformDefinitionCode } from "data/reformDefinitionCode";
import Button from "../../../controls/Button";
import { defaultYear } from "data/constants";

export default function PolicyReproducibility(props) {
  const { policy, metadata } = props;

  let initialLines = ["from " + metadata.package + " import Microsimulation"];

  initialLines = initialLines.concat(getReformDefinitionCode(metadata, policy));

  initialLines = initialLines.concat([
    "baseline = Microsimulation()",
    "reformed = Microsimulation(reform=reform)",
    'HOUSEHOLD_VARIABLES = ["person_id", "household_id", "age", "household_net_income", "household_income_decile", "in_poverty", "household_tax", "household_benefits"]',
    `baseline_person_df = baseline.calculate_dataframe(HOUSEHOLD_VARIABLES, ${defaultYear})`,
    `reformed_person_df = reformed.calculate_dataframe(HOUSEHOLD_VARIABLES, ${defaultYear})`,
    "difference_person_df = reformed_person_df - baseline_person_df",
  ]);

  const colabLink =
    metadata.countryId === "uk"
      ? "https://colab.research.google.com/drive/16h6v-EAYk5n4qZ4krXbmFG4_oKAaflo9#scrollTo=TBTIupkjIThF"
      : metadata.countryId === "us"
        ? "https://colab.research.google.com/drive/1hqA9a2LrNj2leJ9YtXXC3xyaCXQ7mwUW?usp=sharing"
        : null;

  const notebookLink = colabLink ? (
    <a href={colabLink} target="_blank" rel="noreferrer">
      Python notebook
    </a>
  ) : (
    "Python notebook"
  );

  // This component shows the Python code necessary to run a microsimulation to reproduce
  // results on PolicyEngine.
  return (
    <>
      <h2>Reproduce these results</h2>
      <p>
        Run the code below into a {notebookLink} to reproduce the
        microsimulation results.
      </p>
      <CodeBlock lines={initialLines} language={"python"} />
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
