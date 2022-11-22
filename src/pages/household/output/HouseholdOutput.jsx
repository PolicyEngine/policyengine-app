import { useSearchParams } from "react-router-dom";
import ResultsPanel from "../../../layout/ResultsPanel";
import PolicySearch from "../../policy/PolicySearch";
import EarningsVariation from "./EarningsVariation";
import MarginalTaxRates from "./MarginalTaxRates";
import NetIncomeBreakdown from "./NetIncomeBreakdown";

export default function HouseholdOutput(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const { metadata, policy, household } = props;

  let reformLabel = policy.reform.label || `Policy #${reformPolicyId}`;
  let baselineLabel = policy.baseline.label || `Policy #${baselinePolicyId}`;
  if (!baselinePolicyId) {
    baselineLabel = "Current law";
  }
  let policyLabel;
  if (reformLabel !== "Current law" && baselineLabel === "Current law") {
    policyLabel = reformLabel;
  } else {
    policyLabel = `${baselineLabel} → ${reformLabel}`;
  }
  let pane;

  if (focus === "householdOutput.netIncome") {
    pane = (
      <NetIncomeBreakdown
        metadata={metadata}
        household={household}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "householdOutput.earnings") {
    pane = <EarningsVariation metadata={metadata} household={household} />;
  } else if (focus === "householdOutput.mtr") {
    pane = <MarginalTaxRates metadata={metadata} household={household} />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h4>Comparing</h4>
        <PolicySearch metadata={metadata} policy={policy} target="reform" />
        <h4>against</h4>
        <PolicySearch metadata={metadata} policy={policy} target="baseline" />
      </div>
      <ResultsPanel>{pane}</ResultsPanel>
    </>
  );
}
