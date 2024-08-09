import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { copySearchParams } from "../api/call";
import { findInTree } from "../api/variables";
import SearchOptions from "../controls/SearchOptions";
import FolderPage from "../layout/FolderPage";
import LoadingCentered from "../layout/LoadingCentered";
import MobileCalculatorPage from "layout/MobileCalculatorPage";
import useMobile from "../layout/Responsive";
import StackedMenu from "../layout/StackedMenu";
import ThreeColumnPage from "../layout/ThreeColumnPage";
import ParameterEditor from "./policy/input/ParameterEditor";
import PolicyOutput from "./policy/output/PolicyOutput";
import PolicyRightSidebar from "./policy/PolicyRightSidebar";
import ErrorComponent from "../layout/ErrorComponent";
import { getPolicyOutputTree } from "./policy/output/tree";
import { Helmet } from "react-helmet";
import SearchParamNavButton from "../controls/SearchParamNavButton";
import style from "../style";
import DeprecationModal from "../modals/DeprecationModal";

export function ParameterSearch(props) {
  const { metadata, callback } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const options = Object.values(metadata.parameters)
    .filter((parameter) => !parameter.parameter.includes("abolitions"))
    .filter((parameter) => parameter.type === "parameter")
    .map((parameter) => ({
      value: parameter.parameter,
      label: parameter.label,
    }))
    .filter((option) => !!option.label && !!option.value)
    .reverse();
  return (
    <SearchOptions
      options={options}
      defaultValue={null}
      style={{ margin: 0, width: "100%", backgroundColor: "transparent" }}
      placeholder="Search for a parameter"
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("focus", value);
        setSearchParams(newSearch);

        if (callback instanceof Function) {
          callback();
        }
      }}
    />
  );
}

function PolicyLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
  const selected = searchParams.get("focus") || "";
  const onSelect = (name) => {
    let newSearch = copySearchParams(searchParams);
    newSearch.set("focus", name);
    setSearchParams(newSearch);
  };
  const isOnOutput =
    window.location.search.includes("focus=policyOutput") ||
    window.location.search.includes("focus=householdOutput");
  // The menu, then the search bar anchored to the bottom
  return (
    <div style={{ backgroundColor: style.colors.LIGHT_GRAY }}>
      {!isOnOutput && (
        <div style={{ padding: 10 }}>
          <ParameterSearch metadata={metadata} />
        </div>
      )}
      <StackedMenu
        firstTree={metadata.parameterTree.children}
        selected={selected}
        onSelect={onSelect}
        secondTree={POLICY_OUTPUT_TREE[0].children}
      />
    </div>
  );
}

export default function PolicyPage(props) {
  const { metadata, policy, userProfile, setPolicy } = props;
  const mobile = useMobile();

  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus") || "";

  const isOutput = focus.includes("policyOutput");
  // Evaluate if policy is deprecated or not
  const isPolicyDeprecated = checkIsPolicyDeprecated(metadata, policy);
  let deprecatedParams = [];
  if (isPolicyDeprecated) {
    deprecatedParams = findDeprecatedParams(metadata, policy);
  }

  const countryVersion = metadata.version;

  useEffect(() => {
    if (!focus) {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("focus", "gov");
      setSearchParams(newSearch, { replace: true });
    }
  });

  // If we've landed on the page without a reform policy, create a new one.
  useEffect(() => {
    if (!policy.reform.data && !searchParams.get("reform")) {
      let newSearch = copySearchParams(searchParams);
      newSearch.set(
        "reform",
        metadata.countryId === "us" ? 2 : metadata.countryId === "uk" ? 1 : 3,
      );
      setSearchParams(newSearch, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!policy.reform.data]);

  let middle = null;

  if (!policy.reform.data) {
    middle = <LoadingCentered />;
  } else if (isPolicyDeprecated) {
    middle = (
      <>
        <DeprecationModal oldPolicy={policy} countryVersion={countryVersion} metadata={metadata} deprecatedParams={deprecatedParams}/>
        <ErrorComponent message="This policy is deprecated" />
      </>
    );
  } else if (
    Object.keys(metadata.parameters).includes(focus) &&
    metadata.parameters[focus].type === "parameter"
  ) {
    middle = (
      <ParameterEditor
        parameterName={focus}
        metadata={metadata}
        policy={policy}
        setPolicy={setPolicy}
      />
    );
  } else if (Object.keys(metadata.parameters).includes(focus)) {
    const node = findInTree({ children: [metadata.parameterTree] }, focus);
    middle = (
      <FolderPage label={node.label} metadata={metadata} inPolicySide>
        {node.children}
      </FolderPage>
    );
  } else if (isOutput) {
    middle = (
      <>
        <PolicyOutput
          metadata={metadata}
          policy={policy}
          userProfile={userProfile}
        />
      </>
    );
  }

  if (mobile) {
    return (
      <>
        <Helmet>
          <title>Policy | PolicyEngine</title>
        </Helmet>
        <MobileCalculatorPage
          mainContent={middle}
          metadata={metadata}
          policy={policy}
          type="policy"
        />
      </>
    );
  }

  const hasHousehold = searchParams.get("household") !== null;
  const hideButtons = false;
  // eslint-disable-next-line no-unused-vars
  const bottomBar = (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 10,
        width: "100%",
        height: 100,
        zIndex: 1001,
        // shadow
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h5 style={{ fontFamily: "Roboto Serif", marginBottom: 0 }}>
          Your reform has 2 provisions.
        </h5>
        <SearchParamNavButton
          type="primary"
          text="Estimate economic effects"
          focus="policyOutput.policyBreakdown"
          style={{ padding: 10, margin: 10, paddingLeft: 0, paddingRight: 0 }}
        />
        <h5 style={{ fontFamily: "Roboto Serif", marginBottom: 0 }}> or </h5>
        <SearchParamNavButton
          type="secondary"
          text="Enter your household"
          focus="gov"
          style={{ padding: 10, margin: 10, paddingLeft: 0, paddingRight: 0 }}
        />
      </div>
      {false && !hideButtons && focus && focus.startsWith("policyOutput") && (
        <SearchParamNavButton
          type="primary"
          text="Edit my policy"
          focus="gov"
          style={{ margin: "20px auto 10px" }}
        />
      )}
      {false && !hideButtons && focus && !focus.startsWith("policyOutput") && (
        <SearchParamNavButton
          type="primary"
          text="Calculate economic impact"
          //onClick={confirmEconomicImpact}
          style={{ margin: "20px auto 10px" }}
        />
      )}
      {false && !hideButtons && !hasHousehold && (
        <SearchParamNavButton
          type="secondary"
          text="Enter my household"
          focus="intro"
          style={{ margin: "20px auto 10px" }}
          target={`/${metadata.countryId}/household`}
        />
      )}
      {false && !hideButtons && hasHousehold && (
        <SearchParamNavButton
          type="secondary"
          text="Calculate my household impact"
          focus="householdOutput.netIncome"
          target={`/${metadata.countryId}/household`}
          style={{ margin: "20px auto 10px" }}
        />
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Policy | PolicyEngine</title>
      </Helmet>
      <ThreeColumnPage
        enableLeftCollapse
        enableCenterCollapse
        leftCollapseTitle="Policy settings"
        centerCollapseTitle={isOutput ? "Policy impacts" : "Policy parameters"}
        middle={<PolicyLeftSidebar metadata={metadata} />}
        right={middle}
        left={
          <PolicyRightSidebar
            metadata={metadata}
            policy={policy}
            setPolicy={setPolicy}
            isPolicyDeprecated={isPolicyDeprecated}
          />
        }
      />
    </>
  );
}

export function checkIsPolicyDeprecated(metadata, policy) {

  // Iterate over baseline and reform
  const baselineAndReform = Object.values(policy)
  for (const item of baselineAndReform) {
    // Iterate over each provision

    // Handle current law, where data is null, and handle empty object
    if (!item.data || Object.keys(item.data).length === 0) {
      continue;
    } else {
      for (const provision in item.data) {
        if (!Object.keys(metadata.parameters).includes(provision)) {
          return true;
        }
      }

    }

  }

  return false;

}

export function findDeprecatedParams(metadata, policy) {
  const deprecatedParams = [];
  const baselineAndReform = Object.values(policy)

  for (const item of baselineAndReform) {
    // Iterate over each provision

    // Handle current law, where data is null, and handle empty object
    if (!item.data || Object.keys(item.data).length === 0) {
      continue;
    } else {
      for (const provision in item.data) {
        if (!Object.keys(metadata.parameters).includes(provision)) {
          deprecatedParams.push(provision);
        }
      }
    }
  }
  return deprecatedParams;
}