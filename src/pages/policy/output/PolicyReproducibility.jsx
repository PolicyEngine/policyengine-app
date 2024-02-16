import CodeBlock from "layout/CodeBlock";
import { getReformDefinitionCode } from "data/reformDefinitionCode";
import { defaultYear } from "data/constants";
import { useSearchParams } from "react-router-dom";
import colors from "../../../redesign/style/colors";
import { getReproducibilityCodeBlock } from "../../../data/reformDefinitionCode";

const US_REGIONS = ["us", "enhanced_us"];

export default function PolicyReproducibility(props) {
  const { policy, metadata } = props;
  const [searchParams] = useSearchParams();
  const timePeriod = searchParams.get("timePeriod");
  const region = searchParams.get("region");

  /*
  let codeLines = [
    ...getHeaderLines(metadata),
    ...getReformDefinitionCode(metadata, policy),
    ...getBaselineDefinitionCode(region, policy),
    ...getImplementationCode(region, timePeriod),
  ];
  */

  let codeLines = getReproducibilityCodeBlock(metadata, policy, region, "policy");

  const colabLink =
    metadata.countryId === "uk"
      ? "https://colab.research.google.com/drive/16h6v-EAYk5n4qZ4krXbmFG4_oKAaflo9#scrollTo=TBTIupkjIThF"
      : metadata.countryId === "us"
        ? "https://colab.research.google.com/drive/1hqA9a2LrNj2leJ9YtXXC3xyaCXQ7mwUW?usp=sharing"
        : null;

  const notebookLink = colabLink ? (
    <a
      href={colabLink}
      target="_blank"
      rel="noreferrer"
      style={{ color: colors.BLUE_PRIMARY, textDecoration: "underline" }}
    >
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
        Run the code below in a {notebookLink} to reproduce the microsimulation
        results.
      </p>
      <CodeBlock lines={codeLines} language={"python"} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 30,
          marginBottom: 30,
        }}
      ></div>
    </>
  );
}

function getHeaderLines(metadata) {
  // Note that all other header lines are currently provided by getReformDefinitionCode;
  // this could be refactored in the future to create clearer distinctions between
  // code segments and/or create a shared "Reproducibility" component, considering
  // the overlap between household and policy, as long as HouseholdReproducibility
  // also is

  return ["from " + metadata.package + " import Microsimulation"];
}

function getBaselineDefinitionCode(region, policy) {
  if (!US_REGIONS.includes(region)) {
    return [];
  }

  // Calculate the earliest start date and latest end date for
  // the policies included in the simulation
  let earliestStart = null;
  let latestEnd = null;

  for (const parameter of Object.keys(policy.reform.data)) {
    for (const instant of Object.keys(policy.reform.data[parameter])) {
      const [start, end] = instant.split(".");
      if (!earliestStart || Date.parse(start) < Date.parse(earliestStart)) {
        earliestStart = start;
      }
      if (!latestEnd || Date.parse(end) > Date.parse(latestEnd)) {
        latestEnd = end;
      }
    }
  }

  return [
    `"""`,
    "In US nationwide simulations,",
    "use reported state income tax liabilities",
    `"""`,
    "def modify_baseline(parameters):",
    "    parameters.simulation.reported_state_income_tax.update(",
    `        start=instant("${earliestStart}"), stop=instant("${latestEnd}"),`,
    "        value=True)",
    "    return parameters",
    "",
    "",
    "class baseline_reform(Reform):",
    "    def apply(self):",
    "        self.modify_parameters(modify_baseline)",
    "",
    "",
  ];
}

function getImplementationCode(region, timePeriod) {
  const isCountryUS = US_REGIONS.includes(region);

  return [
    `baseline = Microsimulation(${
      isCountryUS ? "reform=baseline_reform" : ""
    })`,
    "reformed = Microsimulation(reform=reform)",
    `baseline_person = baseline.calc("household_net_income",`,
    `    period=${timePeriod || defaultYear}, map_to="person")`,
    `reformed_person = reformed.calc("household_net_income",`,
    `    period=${timePeriod || defaultYear}, map_to="person")`,
    "difference_person = reformed_person - baseline_person",
  ];
}
