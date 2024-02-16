import CodeBlock from "layout/CodeBlock";
import { useSearchParams } from "react-router-dom";
import colors from "../../../redesign/style/colors";
import { getReproducibilityCodeBlock } from "../../../data/reformDefinitionCode";

export default function PolicyReproducibility(props) {
  const { policy, metadata } = props;
  const [searchParams] = useSearchParams();
  const timePeriod = searchParams.get("timePeriod");
  const region = searchParams.get("region");

  let codeLines = getReproducibilityCodeBlock("policy", metadata, policy, region, timePeriod);

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
