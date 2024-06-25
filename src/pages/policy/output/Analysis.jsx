import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../../layout/Spinner";
import Button from "../../../controls/Button";
import CodeBlock from "../../../layout/CodeBlock";
import colors from "../../../style/colors";
import { getParameterAtInstant } from "../../../api/parameters";
import { MarkdownFormatter } from "../../../layout/MarkdownFormatter";
import { asyncApiCall, countryApiCall } from "../../../api/call";
import { getImpactReps } from "./ImpactTypes";
import { promptContent } from "./promptContent";

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
  // metadata.economy_options.region = [{name: "uk", label: "United Kingdom"}]
  const regionKeyToLabel = metadata.economy_options.region.reduce(
    (acc, { name, label }) => {
      acc[name] = label;
      return acc;
    },
    {},
  );
  const [audience, setAudience] = useState("Normal");
  const audienceDescriptions = {
    ELI5: "Write this for a five-year-old who doesn't know anything about economics or policy. Explain fundamental concepts like taxes, poverty rates, and inequality as needed.",
    Normal:
      "Write this for a policy analyst who knows a bit about economics and policy.",
    Wonk: "Write this for a policy analyst who knows a lot about economics and policy. Use acronyms and jargon if it makes the content more concise and informative.",
  };

  const prompt =
    promptContent(
      metadata,
      selectedVersion,
      timePeriod,
      regionKeyToLabel,
      impact,
      policyLabel,
      policy,
      region,
      relevantParameterBaselineValues,
      relevantParameters,
    ) + audienceDescriptions[audience];

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasClickedGenerate, setHasClickedGenerate] = useState(false);

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
    markdown.replace(
      /{{(.*?)}}/g,
      (match, impactType) => `<abbr title="${impactType}"></abbr>`,
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
                  displayCharts(analysis + " " + analysisWords[i]).replaceAll(
                    "  ",
                    " ",
                  ),
                );
              }, 100 * i);
            }
            fullAnalysis = analysisFromCall;
          },
        ).then((data) => {
          setAnalysis(
            displayCharts(data.result.analysis).replaceAll("  ", " "),
          );
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
        {buttonText && (
          <Button
            type="primary"
            text={buttonText}
            onClick={onGenerate}
            style={{ maxWidth: 250, margin: "20px auto 25px" }}
          />
        )}
        {hasClickedGenerate && analysis && (
          <MarkdownFormatter markdown={analysis} dict={chartDict} />
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
          onClick={() => setShowPrompt(!showPrompt)}
          style={{ maxWidth: 250, margin: "20px auto 10px" }}
        />
      </div>
      {showPrompt ? (
        <CodeBlock lines={lines} language={"markdown"} data={prompt} />
      ) : null}
    </>
  );
}
