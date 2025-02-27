import { useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Spinner from "../../../layout/Spinner";
import Button from "../../../controls/Button";
import CodeBlock from "../../../layout/CodeBlock";
import { getParameterAtInstant } from "../../../api/parameters";
import { MarkdownFormatter } from "../../../layout/MarkdownFormatter";
import { countryApiCall } from "../../../api/call";
import { getImpactReps } from "./ImpactTypes";
import ErrorComponent from "../../../layout/ErrorComponent";
import { Segmented } from "antd";

export function AudienceSelector(props) {
  const { audience, setAudience, resetDisplay } = props;

  function handleAudienceChange(e) {
    setAudience(e);
    resetDisplay();
  }
  const audienceOptions = ["ELI5", "Normal", "Wonk"];
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
  );
}

export function PromptDisplayButton(props) {
  const {
    showPrompt,
    setShowPrompt,
    jsonPostBody,
    countryId,
    setPrompt,
    setPromptError,
  } = props;

  function resetPrompt() {
    setPrompt("");
    setPromptError(false);
  }

  async function handleShowPrompt() {
    const newShowPrompt = !showPrompt;
    setShowPrompt(newShowPrompt);
    if (newShowPrompt) {
      fetchPrompt();
    } else {
      resetPrompt();
    }
  }

  async function fetchPrompt() {
    const PROMPT_NAME = "simulation_analysis";

    try {
      const res = await countryApiCall(
        countryId,
        `/ai-prompts/${PROMPT_NAME}`,
        jsonPostBody,
        "POST",
      );

      if (!res || !res.ok) {
        throw new Error("Error response within fetchPrompt");
      }

      const resJson = await res.json();
      const prompt = resJson.result;
      setPrompt(prompt);
      setShowPrompt(true);
    } catch (error) {
      console.error("Error generating prompt:", error);
      setPrompt("");
      setPromptError(true);
    }
  }
  return (
    <Button
      text={showPrompt ? "Hide prompt" : "Show prompt"}
      type="secondary"
      onClick={handleShowPrompt}
      style={{
        width: "100%",
        height: "32px",
      }}
    />
  );
}

export function GenerateAnalysisButton(props) {
  const {
    jsonPostBody,
    countryId,
    setAnalysis,
    setAnalysisError,
    aiOutputStream,
  } = props;

  const [analysisLoading, setAnalysisLoading] = useState(false);

  const displayCharts = (markdown) =>
    markdown.replace(
      /{{(.*?)}}/g,
      (match, impactType) => `<abbr title="${impactType}"></abbr>`,
    );

  function resetAnalysis() {
    setAnalysisError(null);
    setAnalysis(""); // Reset analysis content
    setAnalysisLoading(false);
  }

  function updateAnalysisWithCharts() {
    setAnalysis((analysis) => displayCharts(analysis).replaceAll("  ", " "));
  }

  async function handleAnalysisGeneration() {
    resetAnalysis();
    setAnalysisLoading(true);
    try {
      const res = await countryApiCall(
        countryId,
        `/simulation-analysis`,
        jsonPostBody,
        "POST",
      );

      if (!res || !res.ok) {
        const errorMessage = "Non-OK response from server";
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Response can either be static or streaming; if static, parse and set analysis
      if (res.headers.get("Content-Type") !== "application/x-ndjson") {
        const resJson = await res.json();
        const result = await JSON.parse(resJson.result);
        setAnalysis(result);
        updateAnalysisWithCharts();
        aiOutputStream.current = null;
        return;
      }

      // Otherwise, handle streaming
      const reader = res.body.getReader();
      aiOutputStream.current = reader;

      const decoder = new TextDecoder();

      let isComplete = false;
      while (!isComplete) {
        const { done, value } = await reader.read().catch((error) => {
          throw error;
        });
        if (done) {
          isComplete = true;
        }
        const chunks = decoder.decode(value, { stream: true }).split("\n");
        for (const chunk of chunks) {
          if (chunk) {
            const data = JSON.parse(chunk);
            console.log(data);
            if (data.type === "error") {
              setAnalysisError(data.stream);
              break;
            } else if (data.type === "text" && data.stream) {
              setAnalysis((prevAnalysis) => prevAnalysis + data.stream);
            }
          }
        }
      }

      updateAnalysisWithCharts();
    } catch (error) {
      console.error("Error generating analysis:", error);
      setAnalysisError(true);
    } finally {
      setAnalysisLoading(false);
    }
  }

  const buttonText = analysisLoading ? (
    <>
      <Spinner style={{ marginRight: 10 }} />
      Generating
    </>
  ) : (
    "Generate an analysis"
  );

  return (
    <Button
      type="primary"
      text={buttonText}
      onClick={async () => await handleAnalysisGeneration()}
      style={{
        width: "100%",
        height: "32px",
      }}
    />
  );
}

export default function Analysis(props) {
  const { impact, policyLabel, metadata, policy, region, timePeriod } = props;
  const [searchParams] = useSearchParams();
  const selectedVersion = searchParams.get("version") || metadata.version;
  const dataset = searchParams.get("dataset") || null;
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

  // Stateful vars for analysis output
  const [audience, setAudience] = useState("Normal");
  const [analysis, setAnalysis] = useState("");
  const [analysisError, setAnalysisError] = useState(null);

  // Stateful vars for generating prompt itself
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptError, setPromptError] = useState(false);

  const aiOutputStream = useRef(null);

  const lines = prompt.split("\n");

  const jsonPostBody = {
    currency: metadata.currency,
    dataset: dataset,
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

  function resetDisplay() {
    setAnalysis("");
    setPrompt("");
    setPromptError(false);
    setShowPrompt(false);
    if (aiOutputStream.current) {
      aiOutputStream.current.cancel();
    }
  }

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
          marginTop: "24px",
        }}
      >
        <AudienceSelector
          audience={audience}
          setAudience={setAudience}
          resetDisplay={resetDisplay}
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
            marginBottom: "24px",
          }}
        >
          <GenerateAnalysisButton
            jsonPostBody={jsonPostBody}
            countryId={metadata.countryId}
            setAnalysis={setAnalysis}
            setAnalysisError={setAnalysisError}
            aiOutputStream={aiOutputStream}
          />
          <PromptDisplayButton
            showPrompt={showPrompt}
            setShowPrompt={setShowPrompt}
            jsonPostBody={jsonPostBody}
            setPrompt={setPrompt}
            setPromptError={setPromptError}
            countryId={metadata.countryId}
          />
        </div>
        {promptError ? (
          <div
            style={{
              marginBottom: "12px",
              width: "100%",
              border: "1px solid rgb(240, 240, 240)",
            }}
          >
            <ErrorComponent message="There was an error generating the prompt." />
          </div>
        ) : showPrompt ? (
          <div
            style={{
              marginBottom: "12px",
              width: "100%",
            }}
          >
            <CodeBlock lines={lines} language={"markdown"} data={prompt} />
          </div>
        ) : null}
        {analysisError ? (
          <ErrorComponent message={analysisError} />
        ) : (
          analysis && <MarkdownFormatter markdown={analysis} dict={chartDict} />
        )}
      </div>
    </>
  );
}
