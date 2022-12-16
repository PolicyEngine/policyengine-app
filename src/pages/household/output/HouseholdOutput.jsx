import { useSearchParams } from "react-router-dom";
import BottomCarousel from "../../../layout/BottomCarousel";
import LoadingCentered from "../../../layout/LoadingCentered";
import useMobile from "../../../layout/Responsive";
import ResultsPanel from "../../../layout/ResultsPanel";
import EarningsVariation from "./EarningsVariation";
import HouseholdReproducibility from "./HouseholdReproducibility";
import MarginalTaxRates from "./MarginalTaxRates";
import NetIncomeBreakdown from "./NetIncomeBreakdown";
import HOUSEHOLD_OUTPUT_TREE from "./tree";

export default function HouseholdOutput(props) {
  const [searchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const reformPolicyId = searchParams.get("reform");
  const baselinePolicyId = searchParams.get("baseline");
  const { metadata, policy, household, loading } = props;
  const mobile = useMobile();

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
  if (loading) {
    pane = <LoadingCentered message="Computing your household's taxes and benefits" />;
  } else if (focus === "householdOutput.netIncome") {
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
    pane = (
      <MarginalTaxRates
        metadata={metadata}
        household={household}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "householdOutput.pythonReproducibility") {
    pane = (
      <HouseholdReproducibility
        metadata={metadata}
        policy={policy}
        household={household}
      />
    );
  }

  if (!mobile) {
    pane = <div
      style={{
        height: `calc(100vh - 200px)`,
        overflow: "scroll",
      }}
    >
      {pane}
    </div>;
  }

  pane = (
    <>
      {pane}
      <BottomCarousel
        selected={focus}
        options={HOUSEHOLD_OUTPUT_TREE[0].children}
      />
    </>
  );

  return <ResultsPanel>{pane}</ResultsPanel>;
}
