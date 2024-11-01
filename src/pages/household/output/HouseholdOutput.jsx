import { useSearchParams } from "react-router-dom";
import LoadingCentered from "../../../layout/LoadingCentered";
import useMobile from "../../../layout/Responsive";
import ResultsPanel from "../../../layout/ResultsPanel";
import EarningsVariation from "./EarningsVariation";
import HouseholdReproducibility from "./HouseholdReproducibility";
import MarginalTaxRates from "./MarginalTaxRates";
import NetIncomeBreakdown from "./NetIncomeBreakdown";
import PoliciesModelledPopup from "../../../modals/PoliciesModelledPopup";
import React from "react";
import { message } from "antd";
import ResultActions from "layout/ResultActions";

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
  
    year,
  } = props;
  const mobile = useMobile();

  let reformLabel = policy.reform.label || `Policy #${reformPolicyId}`;
  let baselineLabel = policy.baseline.label || `Policy #${baselinePolicyId}`;
  if (!baselinePolicyId) {
    baselineLabel = "Current law";
  }
  let policyLabel;
  if (reformLabel === "Current law" && baselineLabel === "Current law") {
    policyLabel = "Current law";
  } else if (reformLabel !== "Current law" && baselineLabel === "Current law") {
    policyLabel = reformLabel;
  } else {
    policyLabel = `${reformLabel} (compared against ${baselineLabel})`;
  }
  let pane;
  if (loading) {
    pane = (
      <>
        {focus === "householdOutput.netIncome" && (
          <PoliciesModelledPopup
            metadata={metadata}
            householdInput={householdInput}
           
            year={year}
          />
        )}
        <LoadingCentered message="Computing your household's taxes and benefits" />
      </>
    );
  } else if (!householdBaseline) {
    pane = (
      <ResultsPanel message="Tell us more about your household to see your results here." />
    );
  } else if (focus === "householdOutput.netIncome") {
    pane = (
      <NetIncomeBreakdown
        metadata={metadata}
        householdInput={householdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        policyLabel={policyLabel}
        year={year}
      />
    );
  } else if (focus === "householdOutput.earnings") {
    pane = (
      <EarningsVariation
        metadata={metadata}
        householdInput={householdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        policy={policy}
        policyLabel={policyLabel}
        year={year}
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
        policy={policy}
        year={year}
      />
    );
  } else if (focus === "householdOutput.pythonReproducibility") {
    pane = (
      <HouseholdReproducibility
        metadata={metadata}
        policy={policy}
        policyLabel={policyLabel}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        householdInput={householdInput}
        year={year}
      />
    );
  }

  if (!mobile) {
    pane = <div>{pane}</div>;
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    message.info("Link copied to clipboard");
  }

  const url = encodeURIComponent(window.location.href);
  const encodedPolicyLabel = encodeURIComponent(policyLabel);
  const urlParams = new URLSearchParams(window.location.search);
  const householdId = urlParams.get("household");
  const twitterLink =
    reformLabel === "Current law"
      ? `https://twitter.com/intent/tweet?url=${url}&text=Household%20%23${householdId}%2C%20on%20PolicyEngine`
      : `https://twitter.com/intent/tweet?url=${url}&text=Impacts%20of%20${encodedPolicyLabel}%20on%20Household%20%23${householdId}%2C%20on%20PolicyEngine`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  return (
    <ResultsPanel>
      <ResultActions
        copyLink={copyLink}
        twitterLink={twitterLink}
        facebookLink={facebookLink}
        linkedInLink={linkedInLink}
      />
      {pane}
    </ResultsPanel>
  );
}
