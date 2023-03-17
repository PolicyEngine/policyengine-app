import Button from "../../../controls/Button";
import Screenshottable from "../../../layout/Screenshottable";
import { PythonCodeBlock } from "./PolicyReproducibility";
import { useSearchParams } from "react-router-dom";


export default function Prompt(props) {
  const { impact, policyLabel, metadata, policy, region, timePeriod } = props;
  const [searchParams] = useSearchParams();
  const selectedVersion = searchParams.get("version") || metadata.version;
  const relevantParameters = Object.keys(policy.reform.data).map(parameter => metadata.parameters[parameter]);
  // metadata.economy_options.region = [{name: "uk", label: "United Kingdom"}]
  const regionKeyToLabel = metadata.economy_options.region.reduce((acc, {name, label}) => {
    acc[name] = label;
    return acc;
  }, {});
  const policyDetails = `I'm a researcher using PolicyEngine, a free, open source tool to compute the impact of public policy. I'm writing up an economic analysis of a tax-benefit policy reform. Please write the analysis for me using the details below, in their order. You should:
  
  * First explain each provision of the reform in detail, noting that it represents policy reforms for ${timePeriod} and ${regionKeyToLabel[region]}.
  * Write concisely and clearly, using plain English.
  * Explain concepts where a layperson might be unfamiliar.
  * Write in detail and in paragraphs (minimum 5).
  * Round large numbers like: ${metadata.currency}3.1bn, ${metadata.currency}300m, ${metadata.currency}106,000, ${metadata.currency}1.50.
  * Round percentages to one decimal place.
  * Avoid normative language like 'requires', 'should', 'must', and use quantitative statements over general adjectives and adverbs. If you don't know what something is, don't make it up.
  * Avoid speculating about the intent of the policy; only describe what the policy does.
  * Use the active voice where possible; for example, write phrases where the reform is the subject, such as "the reform [or a description of the reform] reduces poverty by x%".
  * Use ${metadata.countryId === "uk" ? "British" : "American"} English spelling and grammar.
  * Cite PolicyEngine ${metadata.countryId.toUpperCase()} v${selectedVersion} and the ${metadata.countryId === "uk" ? "PolicyEngine-enhanced 2019 Family Resources Survey" : "2021 Current Population Survey March Supplement"} microdata when describing policy impacts.
  * When describing poverty impacts, note that the poverty measure reported is ${metadata.countryId === "uk" ? "absolute poverty before housing costs" : "the Supplemental Poverty Measure"}.
  
  This JSON snippet describes the baseline and reform policies being compared: ${JSON.stringify(policy)}\n`;
  const description = `${policyLabel} has the following impacts from the PolicyEngine microsimulation model: 

  This JSON snippet describes the relevant parameters with more details: ${JSON.stringify(relevantParameters)}
  
  This JSON describes the total budgetary impact, the change to tax revenues and benefit spending (ignore 'households' and 'baseline_net_income': ${JSON.stringify(impact.budget)}

  This JSON describes how common different outcomes were at each income decile: ${JSON.stringify(impact.intra_decile)}

  This JSON describes the average and relative changes to income by each income decile: ${JSON.stringify(impact.decile)}

  This JSON describes the baseline and reform poverty rates by age group (describe the relative changes): ${JSON.stringify(impact.poverty.poverty)}

  This JSON describes the baseline and reform deep poverty rates by age group (describe the relative changes): ${JSON.stringify(impact.poverty.deep_poverty)}

  This JSON describes the baseline and reform poverty and deep poverty rates by gender (briefly describe the relative changes): ${JSON.stringify(impact.poverty_by_gender)}

  This JSON describes three inequality metrics in the baseline and reform, the Gini coefficient of income inequality, the share of income held by the top 10% of households and the share held by the top 1% (describe the relative changes): ${JSON.stringify(impact.inequality)}`;
  const analysisPrompt = policyDetails + description;
  const lines = analysisPrompt.split("\n");


  return (
    <>
      <Screenshottable>
        <h2>Prompt</h2>
      </Screenshottable>
      <p>Copy the below prompt into ChatGPT to generate a written analysis of your policy reform.</p>
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
            navigator.clipboard.writeText(lines.join("\n"));
          }}
        />
      </div>
      <p>
        <PythonCodeBlock lines={lines} />
      </p>
    </>
  );
}
