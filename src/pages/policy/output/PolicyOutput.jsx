import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams, apiCall } from "../../../api/call";
import SearchOptions from "../../../controls/SearchOptions";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import BudgetaryImpact from "./BudgetaryImpact";
import DetailedBudgetaryImpact from "./DetailedBudgetaryImpact";
import PovertyImpact from "./PovertyImpact";
import DeepPovertyImpact from "./DeepPovertyImpact";
import PovertyImpactByGender from "./PovertyImpactByGender";
import PovertyImpactByRace from "./PovertyImpactByRace";
import RelativeImpactByDecile from "./RelativeImpactByDecile";
import AverageImpactByDecile from "./AverageImpactByDecile";
import IntraDecileImpact from "./IntraDecileImpact";
import Reproducibility from "./PolicyReproducibility";
import CliffImpact from "./CliffImpact";
import BottomCarousel from "../../../layout/BottomCarousel";
import getPolicyOutputTree from "./tree";
import InequalityImpact from "./InequalityImpact";
import useMobile from "../../../layout/Responsive";
import PolicyImpactPopup from "../../household/output/PolicyImpactPopup";
import AverageImpactByWealthDecile from "./AverageImpactByWealthDecile";
import RelativeImpactByWealthDecile from "./RelativeImpactByWealthDecile";
import IntraWealthDecileImpact from "./IntraWealthDecileImpact";
import DeepPovertyImpactByGender from "./DeepPovertyImpactByGender";
import { Result, Steps, Progress, message } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import React from "react";
import Analysis from "./Analysis";
import style from "../../../style";
import { PovertyChangeProvider } from "./PovertyChangeContext";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import { useScreenshot } from "use-react-screenshot";
import ResultActions from "layout/ResultActions";

export function RegionSelector(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const options = metadata.economy_options.region.map((region) => {
    return { value: region.name, label: region.label };
  });
  const [value] = useState(searchParams.get("region") || options[0].value);

  return (
    <SearchOptions
      style={{ width: 250, marginRight: 10, marginLeft: 10 }}
      options={options}
      defaultValue={value}
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("region", value);
        setSearchParams(newSearch);
      }}
    />
  );
}

export function TimePeriodSelector(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const options = metadata.economy_options.time_period.map((time_period) => {
    return { value: time_period.name.toString(), label: time_period.label };
  });
  const [value] = useState(
    (searchParams.get("timePeriod") || "").toString() || options[0].value,
  );

  return (
    <SearchOptions
      style={{ width: 250, marginRight: 10, marginLeft: 10 }}
      options={options}
      defaultValue={value}
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("timePeriod", value);
        setSearchParams(newSearch);
      }}
    />
  );
}

export default function PolicyOutput(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const region = searchParams.get("region");
  const timePeriod = searchParams.get("timePeriod");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const [impact, setImpact] = useState(null);
  const [error, setError] = useState(null);
  const imageRef = useRef(null);
  const [preparingForScreenshot, setPreparingForScreenshot] = useState(false);
  const [, takeScreenShot] = useScreenshot();
  const [averageImpactTime, setAverageImpactTime] = useState(20);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    if (preparingForScreenshot) {
      setTimeout(() => {
        takeScreenShot(imageRef.current).then((img) => {
          setPreparingForScreenshot(false);
          // send a request to /image with the image
          // The filename should be the current path (including query strings), but with /, &, ? etc. replaced with _
          const filename =
            (window.location.pathname + window.location.search)
              .replaceAll("/", "_")
              .replaceAll("&", "_")
              .replaceAll("?", "_")
              .replaceAll("=", "_")
              .replaceAll(".", "_") + ".png";
          fetch("/image", {
            method: "POST",
            body: JSON.stringify({
              filename,
              image: img,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Something went wrong");
            }
          });
        });
      }, 1000);
    }
  }, [preparingForScreenshot, takeScreenShot]);

  const {
    metadata,
    policy,
    hasShownPopulationImpactPopup,
    setHasShownPopulationImpactPopup,
  } = props;
  const selectedVersion = searchParams.get("version") || metadata.version;
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
  const mobile = useMobile();
  const skipImpacts = POLICY_OUTPUT_TREE[0].children.find(
    (item) => item.name === focus,
  ).skipImpacts;
  useEffect(() => {
    if (
      !!region &&
      !!timePeriod &&
      !!reformPolicyId &&
      !!baselinePolicyId &&
      focus !== "policyOutput.cliffImpact"
    ) {
      const url = `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}?region=${region}&time_period=${timePeriod}&version=${selectedVersion}`;
      setImpact(null);
      setError(null);
      // start counting (but stop when the API call finishes)
      const interval = setInterval(() => {
        setSecondsElapsed((secondsElapsed) => secondsElapsed + 1);
      }, 1000);
      apiCall(url, null)
        .then((res) => res.json())
        .then((intermediateData) => {
          if (averageImpactTime === 20) {
            console.log(intermediateData);
            setAverageImpactTime(intermediateData.average_time || 20);
          }
        });
      asyncApiCall(url, null, 1_000, 1_000)
        .then((data) => {
          if (data.status === "error") {
            if (!data.result.baseline_economy) {
              data.result.baseline_economy = {
                status: "error",
                message: "An error outside the baseline economy computation.",
              };
            }
            if (!data.result.reform_economy) {
              data.result.reform_economy = {
                status: "error",
                message: "An error outside the baseline economy computation.",
              };
            }
            if (data.message) {
              data.result.message = data.message;
            }
            setError(data.result);
            setSecondsElapsed(0);
            clearInterval(interval);
          } else {
            setImpact(data.result);
            setSecondsElapsed(0);
            clearInterval(interval);
          }
        })
        .catch((err) => {
          setError(err);
          setSecondsElapsed(0);
          clearInterval(interval);
        });
    } else {
      const defaults = {
        region: metadata.economy_options.region[0].name,
        timePeriod: metadata.economy_options.time_period[0].name,
        baseline: metadata.current_law_id,
      };
      let newSearch = copySearchParams(searchParams);
      // Set missing query parameters to their defaults.
      newSearch.set("region", searchParams.get("region") || defaults.region);
      newSearch.set(
        "timePeriod",
        searchParams.get("timePeriod") || defaults.timePeriod,
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline,
      );
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

  if (error && (!error.baseline_economy || !error.reform_economy)) {
    return null;
  }

  if (error & !skipImpacts) {
    const baselineOK = error.baseline_economy.status === "ok";
    const reformOK = error.reform_economy.status === "ok";
    return (
      <Result
        status="error"
        title="Something went wrong"
        subTitle={
          <div>
            <Steps direction="vertical">
              <Steps.Item
                title="Baseline economy"
                description={
                  baselineOK
                    ? "We simulated the baseline economy without error."
                    : error.baseline_economy.message
                }
                status={baselineOK ? "finish" : "wait"}
                icon={
                  baselineOK ? (
                    <CheckCircleFilled
                      style={{ fontSize: 20, color: "green" }}
                    />
                  ) : (
                    <CloseCircleFilled style={{ fontSize: 20, color: "red" }} />
                  )
                }
              />
              <Steps.Item
                title="Reformed economy"
                description={
                  reformOK
                    ? "We simulated the reformed economy without error."
                    : error.reform_economy.message
                }
                status="wait"
                icon={
                  baselineOK ? (
                    <CheckCircleFilled
                      style={{ fontSize: 20, color: "green" }}
                    />
                  ) : (
                    <CloseCircleFilled style={{ fontSize: 20, color: "red" }} />
                  )
                }
              />
              {error.message ? (
                <Steps.Item
                  title="Comparison"
                  description={error.message}
                  status="wait"
                  icon={
                    <CloseCircleFilled style={{ fontSize: 20, color: "red" }} />
                  }
                />
              ) : null}
            </Steps>
          </div>
        }
      />
    );
  }

  if (!reformPolicyId) {
    return (
      <ResultsPanel
        style={{ paddingTop: 50 }}
        title="Your policy is empty"
        description="You haven't added any reforms to your policy yet. Change policy parameters and see the results here."
      />
    );
  }

  let reformLabel = policy.reform.label || `Policy #${reformPolicyId}`;
  let baselineLabel = policy.baseline.label || `Policy #${baselinePolicyId}`;
  let policyLabel;
  if (reformLabel !== "Current law" && baselineLabel === "Current law") {
    policyLabel = reformLabel;
  } else {
    policyLabel = `${baselineLabel} → ${reformLabel}`;
  }
  let pane;
  const filename = /policyOutput\.(.+)/.exec(focus)[1] + `${policyLabel}`;
  let showFileDownloadButtons = !mobile;
  let getCsvData;

  if (!impact && !skipImpacts) {
    // Show a Progress bar that fills up over time, taking 100 seconds to fill.
    pane = (
      <div style={{ textAlign: "center", paddingTop: 50 }}>
        <LoadingCentered message="Simulating the impact of your policy..." />
        <Progress
          showInfo={false}
          percent={
            averageImpactTime
              ? Math.min(90, (secondsElapsed / averageImpactTime) * 100)
              : 0
          }
          strokeColor={style.colors.BLUE}
        />
        <p>
          This usually takes around {Math.round(averageImpactTime / 5) * 5}{" "}
          seconds, but may take longer.
        </p>
      </div>
    );
  } else if (focus === "policyOutput.netIncome") {
    document.title = `${policyLabel} | Budgetary impact | PolicyEngine`;
    const props = BudgetaryImpact.getProps(impact);
    pane = (
      <BudgetaryImpact.Chart
        {...props}
        metadata={metadata}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => BudgetaryImpact.getCsvData(props);
  } else if (focus === "policyOutput.detailedBudgetaryImpact") {
    document.title = `${policyLabel} | Detailed budgetary impact | PolicyEngine`;
    pane = (
      <DetailedBudgetaryImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => DetailedBudgetaryImpact.getCsvData(impact, metadata);
  } else if (focus === "policyOutput.decileRelativeImpact") {
    document.title = `${policyLabel} | Relative impact by decile | PolicyEngine`;
    pane = (
      <RelativeImpactByDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => RelativeImpactByDecile.getCsvData(impact);
  } else if (focus === "policyOutput.decileAverageImpact") {
    document.title = `${policyLabel} | Average impact by decile | PolicyEngine`;
    pane = (
      <AverageImpactByDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => AverageImpactByDecile.getCsvData(impact);
  } else if (focus === "policyOutput.intraDecileImpact") {
    document.title = `${policyLabel} | Income intra-decile impact | PolicyEngine`;
    pane = (
      <IntraDecileImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => IntraDecileImpact.getCsvData(impact);
  } else if (focus === "policyOutput.povertyImpact") {
    document.title = `${policyLabel} | Poverty impact | PolicyEngine`;
    pane = (
      <PovertyChangeProvider>
        <PovertyImpact
          metadata={metadata}
          impact={impact}
          policyLabel={policyLabel}
        />
      </PovertyChangeProvider>
    );
    getCsvData = () => PovertyImpact.getCsvData(impact);
  } else if (focus === "policyOutput.deepPovertyImpact") {
    document.title = `${policyLabel} | Deep poverty impact | PolicyEngine`;
    const props = DeepPovertyImpact.getProps(impact);
    pane = (
      <PovertyChangeProvider>
        <DeepPovertyImpact.Chart
          {...props}
          metadata={metadata}
          policyLabel={policyLabel}
        />
      </PovertyChangeProvider>
    );
    getCsvData = () => DeepPovertyImpact.getCsvData(props);
  } else if (focus === "policyOutput.genderPovertyImpact") {
    document.title = `${policyLabel} | Gender poverty impact | PolicyEngine`;
    pane = (
      <PovertyChangeProvider>
        <PovertyImpactByGender
          metadata={metadata}
          impact={impact}
          policyLabel={policyLabel}
        />
      </PovertyChangeProvider>
    );
    getCsvData = () => PovertyImpactByGender.getCsvData(impact);
  } else if (focus === "policyOutput.genderDeepPovertyImpact") {
    document.title = `${policyLabel} | Gender deep poverty impact | PolicyEngine`;
    const props = DeepPovertyImpactByGender.getProps(impact);
    pane = (
      <PovertyChangeProvider>
        <DeepPovertyImpactByGender.Chart
          metadata={metadata}
          impact={impact}
          policyLabel={policyLabel}
        />
      </PovertyChangeProvider>
    );
    getCsvData = () => DeepPovertyImpactByGender.getCsvData(props);
  } else if (focus === "policyOutput.racialPovertyImpact") {
    document.title = `${policyLabel} | Racial poverty impact | PolicyEngine`;
    pane = (
      <PovertyChangeProvider>
        <PovertyImpactByRace
          metadata={metadata}
          impact={impact}
          policyLabel={policyLabel}
        />
      </PovertyChangeProvider>
    );
    getCsvData = () => PovertyImpactByRace.getCsvData(impact);
  } else if (focus === "policyOutput.inequalityImpact") {
    document.title = `${policyLabel} | Inequality impact | PolicyEngine`;
    pane = (
      <InequalityImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => InequalityImpact.getCsvData(impact);
  } else if (focus === "policyOutput.wealthDecileAverageImpact") {
    document.title = `${policyLabel} | Average impact by wealth decile | PolicyEngine`;
    pane = (
      <AverageImpactByWealthDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => AverageImpactByWealthDecile.getCsvData(impact);
  } else if (focus === "policyOutput.wealthDecileRelativeImpact") {
    document.title = `${policyLabel} | Relative impact by wealth decile | PolicyEngine`;
    pane = (
      <RelativeImpactByWealthDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => RelativeImpactByWealthDecile.getCsvData(impact);
  } else if (focus === "policyOutput.intraWealthDecileImpact") {
    document.title = `${policyLabel} | Wealth intra-decile impact | PolicyEngine`;
    pane = (
      <IntraWealthDecileImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
    getCsvData = () => IntraWealthDecileImpact.getCsvData(impact);
  } else if (focus === "policyOutput.cliffImpact") {
    document.title = `${policyLabel} | Cliff impact | PolicyEngine`;
    pane = <CliffImpact metadata={metadata} policyLabel={policyLabel} />;
    getCsvData = () => CliffImpact.getCsvData(impact);
  } else if (focus === "policyOutput.codeReproducibility") {
    document.title = `${policyLabel} | Reproduce these results | PolicyEngine`;
    pane = <Reproducibility metadata={metadata} policy={policy} />;
    showFileDownloadButtons = false;
  } else if (focus === "policyOutput.analysis") {
    document.title = `${policyLabel} | Analysis | PolicyEngine`;
    pane = (
      <Analysis
        impact={impact}
        metadata={metadata}
        policy={policy}
        region={region}
        timePeriod={timePeriod}
        policyLabel={policyLabel}
      />
    );
    showFileDownloadButtons = false;
  }

  async function downloadPng() {
    const downloadableContent = document.getElementById("downloadable-content");
    if (downloadableContent) {
      const paddedDiv = document.createElement("div");
      paddedDiv.style.padding = "20px";
      paddedDiv.style.backgroundColor = "white";
      paddedDiv.style.display = "inline-block";
      paddedDiv.style.boxSizing = "content-box"; // Add this line
      paddedDiv.appendChild(downloadableContent.cloneNode(true));

      document.body.appendChild(paddedDiv);

      const canvas = await html2canvas(paddedDiv);

      document.body.removeChild(paddedDiv);
      canvas.toBlob((blob) => {
        saveAs(blob, filename + ".png");
      });
    }
  }

  function downloadCsv() {
    const data = getCsvData();
    if (data !== null) {
      const csvContent = data
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", filename);
      tempLink.style.display = "none";
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      URL.revokeObjectURL(url);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    message.info("Link copied to clipboard");
  }

  const url = encodeURIComponent(window.location.href);
  const encodedPolicyLabel = encodeURIComponent(policyLabel);
  const twitterLink = `https://twitter.com/intent/tweet?url=${url}&text=${encodedPolicyLabel}%2C%20on%20PolicyEngine`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  const embed = new URLSearchParams(window.location.search).get("embed");
  const bottomElements =
    mobile & !embed ? null : metadata.countryId === "us" ? (
      <p>
        PolicyEngine US v{selectedVersion} estimates reform impacts using
        microsimulation.{" "}
        <a
          href="/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis"
          target="_blank"
        >
          Learn more
        </a>
      </p>
    ) : (
      <p>
        PolicyEngine UK v{selectedVersion} estimates reform impacts using
        microsimulation.{" "}
        <a href="/uk/blog/2022-03-07-how-machine-learning-tools-make-policyengine-more-accurate">
          Learn more
        </a>
      </p>
    );

  // If ?embed=True, just show `pane`, full screen.

  if (embed || preparingForScreenshot) {
    return (
      <>
        <div
          ref={imageRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: embed ? "100%" : 800 * 1.5,
            height: embed ? "100%" : 418 * 1.5,
            zIndex: 1001,
            padding: embed ? 0 : 50,
            paddingBottom: embed ? 0 : 100,
          }}
        >
          {pane}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
        />
      </>
    );
  }

  pane = (
    <>
      <PolicyImpactPopup
        metadata={metadata}
        hasShownPopulationImpactPopup={hasShownPopulationImpactPopup}
        setHasShownPopulationImpactPopup={setHasShownPopulationImpactPopup}
      />
      {!preparingForScreenshot && impact && (
        <ResultActions
          {...(showFileDownloadButtons
            ? { downloadPng: downloadPng, downloadCsv: downloadCsv }
            : {})}
          copyLink={copyLink}
          twitterLink={twitterLink}
          facebookLink={facebookLink}
          linkedInLink={linkedInLink}
        />
      )}
      {pane}
      {!preparingForScreenshot && (
        <BottomCarousel
          selected={focus}
          options={POLICY_OUTPUT_TREE[0].children}
          bottomText={bottomElements}
        />
      )}
    </>
  );

  return (
    <div>
      <ResultsPanel ref={imageRef}>{pane}</ResultsPanel>
    </div>
  );
}
