import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { asyncApiCall, copySearchParams } from "../../../api/call";
import SearchOptions from "../../../controls/SearchOptions";
import ErrorPage from "../../../layout/Error";
import LoadingCentered from "../../../layout/LoadingCentered";
import ResultsPanel from "../../../layout/ResultsPanel";
import BudgetaryImpact from "./BudgetaryImpact";
import PovertyImpact from "./PovertyImpact";
import DeepPovertyImpact from "./DeepPovertyImpact";
import RelativeImpactByDecile from "./RelativeImpactByDecile";
import AverageImpactByDecile from "./AverageImpactByDecile";
import IntraDecileImpact from "./IntraDecileImpact";
import Reproducibility from "./PolicyReproducibility";
import CliffImpact from "./CliffImpact";
import BottomCarousel from "../../../layout/BottomCarousel";
import POLICY_OUTPUT_TREE from "./tree";
import InequalityImpact from "./InequalityImpact";
import { Result, Steps } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

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
  const { metadata, policy } = props;
  useEffect(() => {
    if (!!region && !!timePeriod && !!reformPolicyId && !!baselinePolicyId) {
      const url = `/${metadata.countryId}/economy/${reformPolicyId}/over/${baselinePolicyId}?region=${region}&time_period=${timePeriod}`;
      setImpact(null);
      setError(null);
      asyncApiCall(url, null, 3_000)
        .then((data) => {
          if (data.status === "error") {
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

  if (error) {
    const baselineOK = error.baseline_economy.status === "ok";
    const reformOK = error.reform_economy.status === "ok";
    return <Result
      status="error"
      title="Something went wrong"
      subTitle={
        <div>
        <Steps
          direction="vertical"
        >
          <Steps.Item
            title="Baseline economy"
            description={
              baselineOK ?
                "We simulated the baseline economy without error." :
                error.baseline_economy.message
            }
            status={baselineOK ? "finish" : "wait"}
            icon={
              baselineOK ?
                <CheckCircleFilled style={{fontSize: 20, color: "green"}} /> :
                <CloseCircleFilled style={{fontSize: 20, color: "red"}} />
            }
          />
          <Steps.Item
            title="Reformed economy"
            description={
              reformOK ?
                "We simulated the reformed economy without error." :
                error.reform_economy.message
            }
            status="wait"
            icon={
              baselineOK ?
                <CheckCircleFilled style={{fontSize: 20, color: "green"}} /> :
                <CloseCircleFilled style={{fontSize: 20, color: "red"}} />
            }
          />
        </Steps>
        </div>
      }
    />
  }

  if (!reformPolicyId) {
    return <ErrorPage message="No policy selected." />;
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

  if (!impact) {
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
  } else if (focus === "policyOutput.inequalityImpact") {
    pane = (
      <InequalityImpact
        metadata={metadata}
        impact={impact}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "policyOutput.cliffImpact") {
    pane = <CliffImpact metadata={metadata} policyLabel={policyLabel} />;
  } else if (focus === "policyOutput.codeReproducibility") {
    pane = <Reproducibility metadata={metadata} policy={policy} />;
  }

  pane = (
    <>
      {pane}
      <BottomCarousel
        selected={focus}
        options={POLICY_OUTPUT_TREE[0].children}
        bottomText={
          metadata.countryId === "us" ?
            <p>PolicyEngine estimates reform impacts using a static microsimulation over the 2021 Current Population Survey March Supplement. <a href="/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis">Read our caveats and data enhancement plan.</a></p> :
            <p>PolicyEngine estimates reform impacts using a static microsimulation over <a href="/uk/blog/2022-03-07-how-machine-learning-tools-make-policyengine-more-accurate">an enhanced version of the 2019 Family Resources Survey</a></p>
        }
      />
    </>
  );

  return <ResultsPanel>{pane}</ResultsPanel>;
}
