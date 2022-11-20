import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BiPanel from "../layout/BiPanel";
import Menu from "../layout/Menu";
import ResultsPanel from "../layout/ResultsPanel";
import ThreeColumnPage from "../layout/ThreeColumnPage";
import HouseholdRightSidebar from "./household/HouseholdRightSidebar";
import ParameterEditor from "./policy/input/ParameterEditor";
import PolicyOutput from "./policy/output/PolicyOutput";
import PolicyRightSidebar from "./policy/PolicyRightSidebar";

const POLICY_OUTPUT_TREE = [
  {
    name: "policyOutput",
    label: "Results",
    children: [
      {
        name: "policyOutput.netIncome",
        label: "Budgetary impact",
      },
      {
        name: "policyOutput.distributionalImpact",
        label: "Distributional impact",
      },
    ],
  },
];

function PolicyLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const tree = [
    {
      name: "policy",
      label: "Policy",
    },
    ...metadata.parameterTree,
  ];

  return (
    <BiPanel
      left={
        <Menu
          tree={tree}
          selected={searchParams.get("focus")}
          onSelect={(focus) => {
            let newSearchParams = {};
            for (const [key, value] of searchParams) {
              newSearchParams[key] = value;
            }
            newSearchParams.focus = focus;
            setSearchParams(newSearchParams);
          }}
        />
      }
      leftTitle="Parameters"
      right={
        <Menu
          tree={POLICY_OUTPUT_TREE}
          selected={searchParams.get("focus")}
          onSelect={(focus) => {
            let newSearchParams = {};
            for (const [key, value] of searchParams) {
              newSearchParams[key] = value;
            }
            newSearchParams.focus = focus;
            setSearchParams(newSearchParams);
          }}
        />
      }
      rightTitle="Impact"
      leftNavigatedSelected={
        !(searchParams.get("focus") || "").includes("policyOutput.")
      }
    />
  );
}

function HelpPage() {
  return (
    <ResultsPanel
      title="Create a new policy"
      description="Create a new policy by selecting a parameter from the left menu and changing its value."
    />
  );
}

export default function PolicyPage(props) {
  const { metadata, policy, setPolicy, household } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus") || "";

  useEffect(() => {
    if (!focus) {
      let newSearch = {};
      for (const [key, value] of searchParams) {
        newSearch[key] = value;
      }
      newSearch.focus = "policy";
      setSearchParams(newSearch);
    }
  });

  let middle = null;

  if (focus === "policy") {
    middle = <HelpPage />;
  } else if (Object.keys(metadata.parameters).includes(focus)) {
    middle = (
      <ParameterEditor
        parameterName={focus}
        metadata={metadata}
        policy={policy.policy}
        setPolicy={setPolicy}
      />
    );
  } else if (focus.includes("policyOutput.")) {
    middle = <PolicyOutput metadata={metadata} policy={policy} />;
  }

  return (
    <ThreeColumnPage
      left={<PolicyLeftSidebar metadata={metadata} />}
      middle={middle}
      right={
        <BiPanel
          leftTitle="Household"
          rightTitle="Policy"
          left={
            <HouseholdRightSidebar metadata={metadata} household={household} />
          }
          right={<PolicyRightSidebar metadata={metadata} policy={policy} setPolicy={setPolicy} />}
          leftNavigatedSelected={false}
        />
      }
    />
  );
}
