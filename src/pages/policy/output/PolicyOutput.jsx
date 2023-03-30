import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams } from "../../../api/call";
import SearchOptions from "../../../controls/SearchOptions";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import BudgetaryImpact from "./BudgetaryImpact";
import PovertyImpact from "./PovertyImpact";
import DeepPovertyImpact from "./DeepPovertyImpact";
import PovertyImpactByGender from "./PovertyImpactByGender";
import RelativeImpactByDecile from "./RelativeImpactByDecile";
import AverageImpactByDecile from "./AverageImpactByDecile";
import IntraDecileImpact from "./IntraDecileImpact";
import Reproducibility from "./PolicyReproducibility";
import CliffImpact from "./CliffImpact";
import BottomCarousel from "../../../layout/BottomCarousel";
import getPolicyOutputTree from "./tree";
import InequalityImpact from "./InequalityImpact";
import { Result, Steps } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import useMobile from "../../../layout/Responsive";
import PolicyImpactPopup from "../../household/output/PolicyImpactPopup";
import AverageImpactByWealthDecile from "./AverageImpactByWealthDecile";
import RelativeImpactByWealthDecile from "./RelativeImpactByWealthDecile";
import IntraWealthDecileImpact from "./IntraWealthDecileImpact";
import DeepPovertyImpactByGender from "./DeepPovertyImpactByGender";
import Analysis from "./Analysis";

// import { useScreenshot } from 'use-react-screenshot'
import * as htmlToImage from "html-to-image"


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
    (searchParams.get("timePeriod") || "").toString() || options[0].value
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
  const imageRef = useRef(null)
  // const [image, takeScreenShot] = useScreenshot();
  const [imageBlob, setImageBlob] = useState(null)

  async function handleScreenshot() {
    // http://localhost:3000/us/policy?focus=policyOutput.netIncome&reform=8663&region=us&timePeriod=2023&baseline=2
    // takeScreenShot(imageRef.current)
    console.log('test')
    // console.log(window.location.href + "&embed")
    const imageOptions = { height: 650 }
    const imageBlob = (await htmlToImage.toBlob(imageRef.current, imageOptions))
    const imageUrl = window.URL.createObjectURL(imageBlob)
    console.log("image url", imageUrl, imageBlob)
    setImageBlob(imageUrl)
  }
  
  


  const {
    metadata,
    policy,
    hasShownPopulationImpactPopup,
    setHasShownPopulationImpactPopup,
  } = props;
  const selectedVersion = searchParams.get("version") || metadata.version;
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
  const mobile = useMobile();
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
      asyncApiCall(url, null, 3_000)
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
          } else {
            setImpact(data.result);
          }
        })
        .catch((err) => {
          setError(err);
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
        searchParams.get("timePeriod") || defaults.timePeriod
      );
      newSearch.set(
        "baseline",
        searchParams.get("baseline") || defaults.baseline
      );
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, timePeriod, reformPolicyId, baselinePolicyId]);

  if (error && (!error.baseline_economy || !error.reform_economy)) {
    return null;
  }

  if (error) {
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
  const skipImpacts = POLICY_OUTPUT_TREE[0].children.find(
    (item) => item.name === focus
  ).skipImpacts;

  if (!impact & !skipImpacts) {
    pane = <LoadingCentered message="Simulating your policy" />;
  } else if (focus === "policyOutput.netIncome") {
    pane = (
      <BudgetaryImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.decileRelativeImpact") {
    pane = (
      <RelativeImpactByDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.decileAverageImpact") {
    pane = (
      <AverageImpactByDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.intraDecileImpact") {
    pane = (
      <IntraDecileImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.povertyImpact") {
    pane = (
      <PovertyImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.deepPovertyImpact") {
    pane = (
      <DeepPovertyImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.genderPovertyImpact") {
    pane = (
      <PovertyImpactByGender
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.genderDeepPovertyImpact") {
    pane = (
      <DeepPovertyImpactByGender
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.inequalityImpact") {
    pane = (
      <InequalityImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.wealthDecileAverageImpact") {
    pane = (
      <AverageImpactByWealthDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.wealthDecileRelativeImpact") {
    pane = (
      <RelativeImpactByWealthDecile
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.intraWealthDecileImpact") {
    pane = (
      <IntraWealthDecileImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.codeReproducibility") {
    pane = <Reproducibility metadata={metadata} policy={policy} />;
  } else if (focus === "policyOutput.analysis") {
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
  }

  if (focus === "policyOutput.cliffImpact") {
    pane = <CliffImpact metadata={metadata} policyLabel={policyLabel} />;
  }

  const embed = new URLSearchParams(window.location.search).get("embed");
  const bottomElements =
    mobile & !embed ? null : metadata.countryId === "us" ? (
      <p>
        PolicyEngine US v{selectedVersion} estimates reform impacts using a
        static microsimulation over the 2021 Current Population Survey March
        Supplement.{" "}
        <a href="/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis">
          Read our caveats and data enhancement plan.
        </a>
      </p>
    ) : (
      <p>
        PolicyEngine UK v{selectedVersion} estimates reform impacts using a
        static microsimulation over{" "}
        <a href="/uk/blog/2022-03-07-how-machine-learning-tools-make-policyengine-more-accurate">
          an enhanced version of the 2019 Family Resources Survey
        </a>
      </p>
    );

  // If ?embed=True, just show `pane`, full screen.

  if (embed) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 1001,
            padding: 50,
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
      {pane}
      <BottomCarousel
        selected={focus}
        options={POLICY_OUTPUT_TREE[0].children}
        bottomText={bottomElements}
      />
    </>
  );

  return (
    <>
      <img height={300} src={imageBlob} ></img>
      <button onClick={handleScreenshot}>Test</button>
      <ResultsPanel ref={imageRef}>{pane}</ResultsPanel>;
      {/* <ResultsPanel>{pane}</ResultsPanel>; */}
    </>
  )
}
