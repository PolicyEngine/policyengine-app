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
  const {
    metadata,
    policy,
    householdInput,
    householdBaseline,
    householdReform,
    loading,
  } = props;
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
    pane = (
      <LoadingCentered message="Computing your household's taxes and benefits" />
    );
  } else if (!householdBaseline) {
    pane = (
      <ResultsPanel message="Tell us more about your household to see your results here." />
    );
  } else if (focus === "householdOutput.netIncome") {
    pane = (
      <NetIncomeBreakdown
        metadata={metadata}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "householdOutput.earnings") {
    pane = (
      <EarningsVariation
        metadata={metadata}
        householdInput={householdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
      />
    );
  } else if (focus === "householdOutput.mtr") {
    pane = (
      <MarginalTaxRates
        metadata={metadata}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        householdInput={householdInput}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "householdOutput.pythonReproducibility") {
    pane = (
      <HouseholdReproducibility
        metadata={metadata}
        policy={policy}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        householdInput={householdInput}
      />
    );
  }

  if (!mobile) {
    pane = (
      <div
        style={{
          height: `calc(100vh - 200px)`,
          overflow: "scroll",
        }}
      >
        {pane}
      </div>
    );
  }

  pane = (
    <>
      {pane}
      <BottomCarousel
        selected={focus}
        options={HOUSEHOLD_OUTPUT_TREE[0].children}
        bottomText="PolicyEngine results may not constitute exact tax liabilities or benefit
        entitlements."
      />
    </>
  );

  return <ResultsPanel>{pane}</ResultsPanel>;
}
