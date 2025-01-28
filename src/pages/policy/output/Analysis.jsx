import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../../layout/Spinner";
import Button from "../../../controls/Button";
import CodeBlock from "../../../layout/CodeBlock";
import { getParameterAtInstant } from "../../../api/parameters";
import { MarkdownFormatter } from "../../../layout/MarkdownFormatter";
import { countryApiCall } from "../../../api/call";
import { getImpactReps } from "./ImpactTypes";
import ErrorComponent from "../../../layout/ErrorComponent";
import { Radio, Segmented } from "antd";

export default function Analysis(props) {
  const { impact, policyLabel, metadata, policy, region, timePeriod } = props;
  const [searchParams] = useSearchParams();
  const selectedVersion = searchParams.get("version") || metadata.version;
  const impactLabels = [
    "distributionalImpact.incomeDecile.relative",
    "povertyImpact.regular.byAge",
    metadata.countryId === "us" && "povertyImpact.regular.byRace",
    "inequalityImpact",
  ].filter((x) => x);
  if (metadata.countryId === "uk") {
    impactLabels.splice(2, 1);
  }
  const chartDict = Object.fromEntries(
    impactLabels.map((label) => [
      label,
      getImpactReps(label, {
        impact: impact,
        metadata: metadata,
        policyLabel: policyLabel,
        // mobile plots have smaller heights
        mobile: true,
      }).chart,
    ]),
  );
  const relevantParameters = Object.keys(policy.reform.data).map(
    (parameter) => metadata.parameters[parameter],
  );
  const relevantParameterBaselineValues = relevantParameters.map(
    (parameter) => {
      return {
        [parameter.parameter]: getParameterAtInstant(
          parameter,
          `${timePeriod}-01-01`,
        ),
      };
    },
  );
  const [audience, setAudience] = useState("Normal");
  const [analysis, setAnalysis] = useState("");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [hasClickedGenerate, setHasClickedGenerate] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [isError, setIsError] = useState(false);

  const lines = prompt.split("\n");

  const jsonPostBody = {
    currency: metadata.currency,
    selected_version: selectedVersion,
    time_period: timePeriod,
    impact: impact,
    policy_label: policyLabel,
    policy: policy,
    region: region,
    relevant_parameter_baseline_values: relevantParameterBaselineValues,
    relevant_parameters: relevantParameters,
    audience: audience,
  };

  const handleAudienceChange = (e) => {
    setAudience(e);
    setAnalysis("");
    setPrompt("");
    setShowPrompt(false);
    setHasClickedGenerate(false);
  };

  async function handleShowPrompt() {
    const newShowPrompt = !showPrompt;
    setShowPrompt(newShowPrompt);
    if (newShowPrompt) {
      generatePrompt();
    }
  }

  async function generatePrompt() {
    const PROMPT_NAME = "simulation_analysis";

    try {
      const res = await countryApiCall(
        metadata.countryId,
        `/ai-prompts/${PROMPT_NAME}`,
        jsonPostBody,
        "POST",
      );

      if (!res || !res.ok) {
        throw new Error("Error response within generatePrompt");
      } 
      
      const resJson = await res.json();
      const prompt = resJson.result;
      setPrompt(prompt);
      setShowPrompt(true);

    } catch (error) {
      console.error("Error generating prompt:", error);
      setIsError(true);
    }
  }

  const audienceOptions = [
    "ELI5",
    "Normal",
    "Wonk",
  ]

  const AudienceButton = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <p style={{ marginBottom: "5px" }}>Select an audience:</p>
        <Segmented
          block
          options={audienceOptions}
          value={audience}
          onChange={handleAudienceChange}
          defaultValue={audienceOptions[1]} // Default to "Normal"
          style={{
            width: "100%",
          }}
        />
      </div>
    )
  }

  const displayCharts = (markdown) =>
    markdown.replace(
      /{{(.*?)}}/g,
      (match, impactType) => `<abbr title="${impactType}"></abbr>`,
    );

  const handleAnalysisGeneration = async () => {
    setIsError(false);
    setHasClickedGenerate(true);
    setAnalysisLoading(true);
    setAnalysis(""); // Reset analysis content

    const res = await countryApiCall(
      metadata.countryId,
      `/simulation-analysis`,
      jsonPostBody,
      "POST",
    );

    if (!res || !res.ok) {
      console.error("Error response within handleAnalysisGeneration");
      console.error(res);
      setAnalysisLoading(false);
      setIsError(true);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let isComplete = false;
    while (!isComplete) {
      const { done, value } = await reader.read().catch((error) => {
        console.error("Error reading response stream:", error);
      });
      if (done) {
        isComplete = true;
      }
      const chunks = decoder.decode(value, { stream: true }).split("\n");
      for (const chunk of chunks) {
        if (chunk) {
          const data = JSON.parse(chunk);
          if (data.stream) {
            setAnalysis((prevAnalysis) => prevAnalysis + data.stream);
          }
        }
      }
    }

    setAnalysis((analysis) => displayCharts(analysis).replaceAll("  ", " "));
    setAnalysisLoading(false);
  };

  const buttonText = analysisLoading ? (
    <>
      <Spinner style={{ marginRight: 10 }} />
      Generating
    </>
  ) : "Generate an analysis";

  return (
    <>
      <h2>Analysis</h2>
      <p>
        <a href="/us/research/gpt-analysis">
          Read more about PolicyEngine&apos;s AI policy analysis, powered by
          Claude 3.5 Sonnet.
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
          marginTop: "24px"
        }}
      >
        <AudienceButton
          handleAudienceChange={handleAudienceChange}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "24px"
          }}
        >
          <Button
            type="primary"
            text={buttonText}
            onClick={handleAnalysisGeneration}
            style={{
              width: "100%",
              height: "32px"
            }}
          />
          <Button
            text={showPrompt ? "Hide prompt" : "Show prompt"}
            type="secondary"
            onClick={handleShowPrompt}
            style={{
              width: "100%",
              height: "32px"
            }}
          />
        </div>
        {showPrompt ? (
          <div
            style={{
              marginBottom: "12px"
            }}
          >
            <CodeBlock lines={lines} language={"markdown"} data={prompt} />
          </div>
        ) : null}
        {hasClickedGenerate && analysis && (
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.65)"
            }}
          >
            <MarkdownFormatter markdown={analysis} dict={chartDict} />
          </div>
        )}
      </div>
    </>
  );
}


/*
        {buttonText && (
          <Button
            type="primary"
            text={buttonText}
            onClick={handleAnalysisGeneration}
            style={{ maxWidth: 250, margin: "20px auto 25px" }}
          />
        )}
        {hasClickedGenerate && analysis && (
          <MarkdownFormatter markdown={analysis} dict={chartDict} />
        )}
        {isError && (
          <ErrorComponent message="There was an error generating the analysis." />
        )}
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
          type="secondary"
          onClick={handleShowPrompt}
          style={{ maxWidth: 250, margin: "20px auto 10px" }}
        />
      </div>
      {showPrompt ? (
        <CodeBlock lines={lines} language={"markdown"} data={prompt} />
      ) : null}

*/