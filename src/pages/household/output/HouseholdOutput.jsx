import { useSearchParams } from "react-router-dom";
import BottomCarousel from "../../../layout/BottomCarousel";
import LoadingCentered from "../../../layout/LoadingCentered";
import useMobile from "../../../layout/Responsive";
import ResultsPanel from "../../../layout/ResultsPanel";
import EarningsVariation from "./EarningsVariation";
import HouseholdReproducibility from "./HouseholdReproducibility";
import MarginalTaxRates from "./MarginalTaxRates";
import NetIncomeBreakdown from "./NetIncomeBreakdown";
import PoliciesModelledPopup from "./PoliciesModelledPopup";
import HOUSEHOLD_OUTPUT_TREE from "./tree";
import {
  TwitterOutlined,
  FacebookFilled,
  LinkedinFilled,
  LinkOutlined,
} from "@ant-design/icons";
import React from 'react';
import {message} from 'antd';
import style from "../../../style";

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
    hasShownHouseholdPopup,
    setHasShownHouseholdPopup,
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
    policyLabel = `${reformLabel} (compared against ${reformLabel})`;
  }
  let pane;
  if (loading) {
    pane = (
      <>
        {focus === "householdOutput.netIncome" && (
          <PoliciesModelledPopup
            metadata={metadata}
            householdInput={householdInput}
            hasShownHouseholdPopup={hasShownHouseholdPopup}
            setHasShownHouseholdPopup={setHasShownHouseholdPopup}
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
    document.title = `${policyLabel} | Household net income | PolicyEngine`;
    pane = (
      <NetIncomeBreakdown
        metadata={metadata}
        householdInput={householdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        policyLabel={policyLabel}
      />
    );
  } else if (focus === "householdOutput.earnings") {
    document.title = `${policyLabel} | Earnings variation | PolicyEngine`;
    pane = (
      <EarningsVariation
        metadata={metadata}
        householdInput={householdInput}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        policy={policy}
      />
    );
  } else if (focus === "householdOutput.mtr") {
    document.title = `${policyLabel} | Marginal tax rates | PolicyEngine`;
    pane = (
      <MarginalTaxRates
        metadata={metadata}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        householdInput={householdInput}
        policyLabel={policyLabel}
        policy={policy}
      />
    );
  } else if (focus === "householdOutput.pythonReproducibility") {
    document.title = `${policyLabel} | Reproduce these results | PolicyEngine`;
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

  const url = encodeURIComponent(window.location.href);
  const link = (
    <a onClick={() => {
      navigator.clipboard.writeText(window.location.href);
      message.info('Link copied to clipboard');
    }}>
      <LinkOutlined style={{ fontSize: 23 }} />
    </a>
  );
  const encodedPolicyLabel = encodeURIComponent(policyLabel);
  const urlParams = new URLSearchParams(window.location.search);
  const householdId = urlParams.get('household');
  let twitter;
  if (reformLabel == "Current law"){
    twitter = (
      <a href={`https://twitter.com/intent/tweet?url=${url}&text=Household%20%23${householdId}%2C%20on%20PolicyEngine`} target="_blank" rel="noreferrer">
        <TwitterOutlined style={{ fontSize: 23 }} />
      </a>
    );
  }else{
    twitter = (
      <a href={`https://twitter.com/intent/tweet?url=${url}&text=Impacts%20of%20${encodedPolicyLabel}%20on%20Household%20%23${householdId}%2C%20on%20PolicyEngine`} target="_blank" rel="noreferrer">
        <TwitterOutlined style={{ fontSize: 23 }} />
      </a>
    );
  }
  
  const facebook = (
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer">
      <FacebookFilled style={{ fontSize: 23 }} />
    </a>
  );
  const linkedIn = (
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${(url)}`} target="_blank" rel="noreferrer">
      <LinkedinFilled style={{ fontSize: 23 }} />
    </a>
  );
  const commonStyle = {
    border: "1px solid #ccc", 
    borderRadius: "0px", 
    padding: "6px", 
    marginRight: "-1px",
  };
  const shareItems = [link, twitter, facebook, linkedIn];
  const shareDivs = shareItems.map((item, index) => (
    <div key={index} style={commonStyle}>
      {item}
    </div>
  ));

  pane = (
    <>
      <div style={{ display: "flex", flexDirection: "row", backgroundColor: style.colors.WHITE,
      justifyContent: "center", alignItems: "center", paddingBottom: 20,
     }}>
      <h6 style={{
        margin: 0,
        paddingRight: 20,
      }}><b>Share this result</b></h6>
     <div 
      style={{ 
        display: "flex", 
        flexDirection: "row",
      }}>
      {shareDivs}
      </div>
    </div>
      {pane}
      <BottomCarousel
        selected={focus}
        options={HOUSEHOLD_OUTPUT_TREE[0].children}
        bottomText={
          mobile
            ? null
            : "PolicyEngine results may not constitute exact tax liabilities or benefit entitlements."
        }
      />
    </>
  );

  return <ResultsPanel>{pane}</ResultsPanel>;
}
