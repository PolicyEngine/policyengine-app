import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../../layout/Spinner";
import Button from "../../../controls/Button";
import { PythonCodeBlock } from "./PolicyReproducibility";
import colors from "../../../style/colors";
import { getParameterAtInstant } from "../../../api/parameters";
import { BlogPostMarkdown } from "../../BlogPage";
import { asyncApiCall, countryApiCall } from "../../../api/call";

export default function Analysis(props) {
  const { impact, policyLabel, metadata, policy, region, timePeriod } = props;
  const [searchParams] = useSearchParams();
  const selectedVersion = searchParams.get("version") || metadata.version;
  const relevantParameters = Object.keys(policy.reform.data).map(
    (parameter) => metadata.parameters[parameter]
  );
  const relevantParameterBaselineValues = relevantParameters.map(
    (parameter) => {
      return {
        [parameter.parameter]: getParameterAtInstant(
          parameter,
          `${timePeriod}-01-01`
        ),
      };
    }
  );
  // metadata.economy_options.region = [{name: "uk", label: "United Kingdom"}]
  const regionKeyToLabel = metadata.economy_options.region.reduce(
    (acc, { name, label }) => {
      acc[name] = label;
      return acc;
    },
    {}
  );
  const baseResultsUrl = `https://policyengine.org/${metadata.countryId}/policy?version=${selectedVersion}&region=${region}&timePeriod=${timePeriod}&reform=${policy.reform.id}&baseline=${policy.baseline.id}&embed=True`;
  const buildIFrame = (chartName) =>
    `<iframe src="${baseResultsUrl}&focus=policyOutput.${chartName}" width="100%" height="400" style="border: none; overflow: hidden;" onload="scroll(0,0);"></iframe>`;
  const policyDetails = `I'm using PolicyEngine, a free, open source tool to compute the impact of public policy. I'm writing up an economic analysis of a hypothetical tax-benefit policy reform. Please write the analysis for me using the details below, in their order. You should:
  
  * First explain each provision of the reform, noting that it's hypothetical and won't represents policy reforms for ${timePeriod} and ${
    regionKeyToLabel[region]
  }. Explain how the parameters are changing from the baseline to the reform values using the given data.
  * Round large numbers like: ${metadata.currency}3.1 billion, ${
    metadata.currency
  }300 million, ${metadata.currency}106,000, ${metadata.currency}1.50 (never ${
    metadata.currency
  }1.5).
  * Round percentages to one decimal place.
  * Avoid normative language like 'requires', 'should', 'must', and use quantitative statements over general adjectives and adverbs. If you don't know what something is, don't make it up.
  * Avoid speculating about the intent of the policy or inferring any motives; only describe the observable effects and impacts of the policy. Refrain from using subjective language or making assumptions about the recipients and their needs.
  * Use the active voice where possible; for example, write phrases where the reform is the subject, such as "the reform [or a description of the reform] reduces poverty by x%".
  * Use ${
    metadata.countryId === "uk" ? "British" : "American"
  } English spelling and grammar.
  * Cite PolicyEngine ${metadata.countryId.toUpperCase()} v${selectedVersion} and the ${
    metadata.countryId === "uk"
      ? "PolicyEngine-enhanced 2019 Family Resources Survey"
      : "2021 Current Population Survey March Supplement"
  } microdata when describing policy impacts.
  * When describing poverty impacts, note that the poverty measure reported is ${
    metadata.countryId === "uk"
      ? "absolute poverty before housing costs"
      : "the Supplemental Poverty Measure"
  }.
  * Don't use headers, but do use Markdown formatting. Use - for bullets, and include a newline after each bullet.
  * Include the following embeds inline, without a header so it flows.
  * Immediately after you describe the changes by decile, include the text: {{decileRelativeImpact}}
  * And after the poverty rate changes, include the text: {{povertyImpact}}
  * And after the inequality changes, include the text: {{inequalityImpact}}
  * Make sure to accurately represent the changes observed in the data.

  This JSON snippet describes the default parameter values: ${JSON.stringify(
    relevantParameterBaselineValues
  )}\n
  This JSON snippet describes the baseline and reform policies being compared: ${JSON.stringify(
    policy
  )}\n`;
  const description = `${policyLabel} has the following impacts from the PolicyEngine microsimulation model: 

  This JSON snippet describes the relevant parameters with more details: ${JSON.stringify(
    relevantParameters
  )}

  This JSON describes the total budgetary impact, the change to tax revenues and benefit spending (ignore 'households' and 'baseline_net_income': ${JSON.stringify(
    impact.budget
  )}

  This JSON describes how common different outcomes were at each income decile: ${JSON.stringify(
    impact.intra_decile
  )}

  This JSON describes the average and relative changes to income by each income decile: ${JSON.stringify(
    impact.decile
  )}

  This JSON describes the baseline and reform poverty rates by age group (describe the relative changes): ${JSON.stringify(
    impact.poverty.poverty
  )}

  This JSON describes the baseline and reform deep poverty rates by age group (describe the relative changes): ${JSON.stringify(
    impact.poverty.deep_poverty
  )}

  This JSON describes the baseline and reform poverty and deep poverty rates by gender (briefly describe the relative changes): ${JSON.stringify(
    impact.poverty_by_gender
  )}

  This JSON describes three inequality metrics in the baseline and reform, the Gini coefficient of income inequality, the share of income held by the top 10% of households and the share held by the top 1% (describe the relative changes): ${JSON.stringify(
    impact.inequality
  )}
  
  `;

  const [audience, setAudience] = useState("Normal");

  const audienceDescriptions = {
    ELI5: "Write this for a five-year-old who doesn't know anything about economics or policy. Explain fundamental concepts like taxes, poverty rates, and inequality as needed.",
    Normal:
      "Write this for a policy analyst who knows a bit about economics and policy.",
    Wonk: "Write this for a policy analyst who knows a lot about economics and policy. Use acronyms and jargon if it makes the content more concise and informative.",
  };

  const prompt = policyDetails + description + audienceDescriptions[audience];

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasClickedGenerate, setHasClickedGenerate] = useState(false);

  //const openai = new OpenAIApi(configuration);
  const [showPrompt, setShowPrompt] = useState(false);
  const lines = prompt.split("\n");

  const handleAudienceChange = (audienceValue) => {
    setAudience(audienceValue);
  };

  const buttonWidth = "80px";
  const activeColor = colors.DARK_GRAY;

  const inactiveColor = "white";
  const borderColor = "1px solid #6c757d";

  function AudienceButton({
    audienceValue,
    currentAudience,
    handleAudienceChange,
  }) {
    return (
      <button
        style={{
          backgroundColor:
            audienceValue === currentAudience ? activeColor : inactiveColor,
          color:
            audienceValue === currentAudience ? inactiveColor : activeColor,
          borderRadius:
            audienceValue === "ELI5"
              ? "5px 0 0 5px"
              : audienceValue === "Wonk"
              ? "0 5px 5px 0"
              : 0,
          border: borderColor,
          borderRight: audienceValue !== "Wonk" ? "none" : borderColor,
          padding: "5px 10px",
          margin: 0,
          cursor: "pointer",
          width: buttonWidth,
        }}
        onClick={() => handleAudienceChange(audienceValue)}
      >
        {audienceValue}
      </button>
    );
  }

  const displayCharts = (markdown) =>
    markdown.replace(/{{(.*?)}}/g, (match, chartName) =>
      buildIFrame(chartName)
    );

  const onGenerate = () => {
    setHasClickedGenerate(true);
    setLoading(true);
    setAnalysis(""); // Reset analysis content
    let fullAnalysis = "";

    countryApiCall(metadata.countryId, `/analysis`, {
      prompt: prompt,
    })
      .then((res) => res.json())
      .then((data) => {
        return data.result.prompt_id;
      })
      .then((promptId) => {
        asyncApiCall(
          `/${metadata.countryId}/analysis/${promptId}`,
          null,
          9_000,
          4_000,
          (data) => {
            // We've got to wait ten seconds for the next part of the response to be ready,
            // so let's add the response word-by-word with a small delay to make it seem typed.
            const analysisFromCall = data.result.analysis;
            // Start from the new bit (compare against fullAnalysis)
            const newAnalysis = analysisFromCall.substring(fullAnalysis.length);
            // Start from the
            const analysisWords = newAnalysis.split(" ");
            for (let i = 0; i < analysisWords.length; i++) {
              setTimeout(() => {
                setAnalysis((analysis) =>
                  displayCharts(analysis + " " + analysisWords[i]).replaceAll("  ", " ")
                );
              }, 100 * i);
            }
            fullAnalysis = analysisFromCall;
          }
        ).then((data) => {
          setAnalysis(displayCharts(data.result.analysis).replaceAll("  ", " "));
          setLoading(false);
        });
      });
  };
  const buttonText = !hasClickedGenerate ? (
    "Generate an analysis"
  ) : loading ? (
    <>
      <Spinner style={{ marginRight: 10 }} />
      Generating
    </>
  ) : null;

  console.log(analysis)

  return (
    <>
      <h2>Analysis</h2>
      <p>
        <a href="https://policyengine.org/uk/blog/2023-03-17-automate-policy-analysis-with-policy-engines-new-chatgpt-integration">
          Read more about PolicyEngine&apos;s automatic GPT4-powered policy
          analysis.
        </a>{" "}
        Generation usually takes around 60 seconds. Please verify any results of
        this experimental feature against our charts.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <AudienceButton
            audienceValue="ELI5"
            currentAudience={audience}
            handleAudienceChange={handleAudienceChange}
          />
          <AudienceButton
            audienceValue="Normal"
            currentAudience={audience}
            handleAudienceChange={handleAudienceChange}
          />
          <AudienceButton
            audienceValue="Wonk"
            currentAudience={audience}
            handleAudienceChange={handleAudienceChange}
          />
        </div>
        {buttonText && <Button
          primary
          text={buttonText}
          onClick={onGenerate}
          style={{ maxWidth: 250, marginBottom: 25 }}
        />}
        {!hasClickedGenerate ? (
          <BlogPostMarkdown markdown={analysis} />
        ) : analysis ? (
          <BlogPostMarkdown markdown={analysis} />
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Button
          text={showPrompt ? "Hide prompt" : "Show prompt"}
          onClick={() => setShowPrompt(!showPrompt)}
          style={{ maxWidth: 250 }}
        />
      </div>
      {showPrompt ? (
        <>
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
      ) : null}
    </>
  );
}
