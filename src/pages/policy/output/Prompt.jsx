import { useSearchParams } from "react-router-dom";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import Spinner from "../../../layout/Spinner";
import Button from "../../../controls/Button";
import { PythonCodeBlock } from "./PolicyReproducibility";


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
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasClickedGenerate, setHasClickedGenerate] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [showPrompt, setShowPrompt] = useState(false);
  const lines = analysisPrompt.split("\n");

  const onGenerate = () => {
    setHasClickedGenerate(true);
    setLoading(true);
    openai.createChatCompletion({
      model: "gpt-4",
      messages: [{role: "user", content: analysisPrompt}],
    }).then((response) => {
      console.log(response);
      setAnalysis(response.data.choices[0].message.content);
      setLoading(false);
    });
  };

  // Separate analysis into <p> tags
  const analysisContent = analysis.split("\n").map((line, i) => {
    return <p key={i}>{line}</p>;
  });
  const buttonText =
    !hasClickedGenerate ? 
      "Generate an analysis" : 
      loading ? 
        <><Spinner style={{marginRight: 10}} />Generating</> : 
        "Regenerate analysis";
  return (
    <>
      <h2>Analysis</h2>
      <p>PolicyEngine&apos;s automatic policy analysis is powered by GPT-4. Read more about this feature <a href="https://policyengine.org/uk/blog/2023-03-17-automate-policy-analysis-with-policy-engines-new-chatgpt-integration">here</a>. Generation usually takes around 20 seconds. This is an experimental feature, so please verify the claims made against the prompt.</p>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}>
        <Button primary text={buttonText} onClick={onGenerate} style={{maxWidth: 250}} />
      </div>
      {
        !hasClickedGenerate ? 
          null : 
          loading ? 
            null : 
            analysisContent
      }
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}>
        <Button text={
          showPrompt ?
            "Hide prompt" :
            "Show prompt"
        } onClick={
          () => setShowPrompt(!showPrompt)
        } style={{maxWidth: 250}} />
      </div>
      {
        showPrompt ?
          <>
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
          </> :
          null
      }
      
    </>
  );
}
