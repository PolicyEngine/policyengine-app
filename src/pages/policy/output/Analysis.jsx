import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../../layout/Spinner";
import Button from "../../../controls/Button";
import CodeBlock from "../../../layout/CodeBlock";
import colors from "../../../style/colors";
import { getParameterAtInstant } from "../../../api/parameters";
import { MarkdownFormatter } from "../../../layout/MarkdownFormatter";
import { countryApiCall } from "../../../api/call";
import { getImpactReps } from "./ImpactTypes";
import ErrorComponent from "../../../layout/ErrorComponent";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDownOutlined, FileTextOutlined } from "@ant-design/icons";
import { Collapse } from "react-collapse";

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
  const [loading, setLoading] = useState(false);
  const [hasClickedGenerate, setHasClickedGenerate] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isError, setIsError] = useState(false);

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
      /{(.*?)}/g,
      (match, impactType) => `<abbr title="${impactType}"></abbr>`,
    );

  const onGenerate = async () => {
    setIsError(false);
    setHasClickedGenerate(true);
    setLoading(true);
    setAnalysis(""); // Reset analysis content

    const jsonObject = {
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

    const res = await countryApiCall(
      metadata.countryId,
      `/simulation-analysis`,
      jsonObject,
      "POST",
    );

    if (!res || !res.ok) {
      console.error("Error response within onGenerate");
      console.error(res);
      setLoading(false);
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
          if (data.prompt) {
            setPrompt(data.prompt);
          }
        }
      }
    }

    setAnalysis((analysis) => displayCharts(analysis).replaceAll("  ", " "));
    setLoading(false);
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
        {isError && (
          <ErrorComponent message="There was an error generating the analysis." />
        )}
      </div>
      <motion.div
        style={{
          margin: "20px 0",
          backgroundColor: "#fff",
        }}
      >
        <motion.div
          style={{
            border: "1px solid #E6E8EB",
            borderRadius: "12px",
            overflow: "hidden",
          }}
          whileHover={{
            boxShadow:
              "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={() => setShowPrompt(!showPrompt)}
            style={{
              width: "100%",
              padding: "16px 24px",
              backgroundColor: "#fff",
              border: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            whileHover={{ backgroundColor: "#f8f9fa" }}
            whileTap={{ backgroundColor: "#f1f3f5" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
              initial={false}
            >
              <FileTextOutlined
                style={{
                  fontSize: "20px",
                  color: showPrompt ? "#1A1F36" : "#697386",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontWeight: 500,
                    color: "#1A1F36",
                    fontSize: "15px",
                  }}
                >
                  Prompt Details
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#697386",
                    marginTop: "4px",
                  }}
                >
                  View the AI prompt used for this analysis
                </div>
              </div>
            </motion.div>
            <motion.span
              animate={{ rotate: showPrompt ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <CaretDownOutlined
                style={{
                  fontSize: "12px",
                  color: showPrompt ? "#1A1F36" : "#697386",
                }}
              />
            </motion.span>
          </motion.button>
          <Collapse isOpened={showPrompt}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  padding: "24px",
                  borderTop: "1px solid #E6E8EB",
                  backgroundColor: "#FAFAFA",
                }}
              >
                <CodeBlock lines={lines} language={"markdown"} data={prompt} />
              </div>
            </motion.div>
          </Collapse>
        </motion.div>
      </motion.div>
    </>
  );
}
