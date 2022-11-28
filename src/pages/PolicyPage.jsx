import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { copySearchParams } from "../api/call";
import SearchOptions from "../controls/SearchOptions";
import BiPanel from "../layout/BiPanel";
import Divider from "../layout/Divider";
import LoadingCentered from "../layout/LoadingCentered";
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
        name: "policyOutput.decileRelativeImpact",
        label: "Relative impact by decile",
      },
      {
        name: "policyOutput.decileAverageImpact",
        label: "Average impact by decile",
      },
      {
        name: "policyOutput.intraDecileImpact",
        label: "Outcomes by income decile",
      },
      {
        name: "policyOutput.povertyImpact",
        label: "Poverty impact",
      },
      {
        name: "policyOutput.cliffImpact",
        label: "Cliff impact",
      },
      {
        name: "policyOutput.codeReproducibility",
        label: "Reproduce in Python",
      },
    ],
  },
];

function ParameterSearch(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const options = Object.values(metadata.parameters)
    .filter((parameter) => parameter.type === "parameter")
    .map((parameter) => ({
      value: parameter.parameter,
      label: parameter.label,
    }))
    .filter((option) => !!option.label && !!option.value);
  return (
    <SearchOptions
      options={options}
      defaultValue={null}
      style={{ margin: 0, width: "100%" }}
      placeholder="Search for a parameter"
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("focus", value);
        setSearchParams(newSearch);
      }}
    />
  );
}

function PolicyLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const tree = metadata.parameterTree;
  // The menu, then the search bar anchored to the bottom
  return (
    <BiPanel
      left={
        <>
          <div
            style={{
              overflow: "scroll",
              height: "80%",
            }}
          >
            <Menu
              tree={tree}
              selected={searchParams.get("focus")}
              onSelect={(focus) => {
                let newSearch = copySearchParams(searchParams);
                newSearch.set("focus", focus);
                setSearchParams(newSearch);
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              width: "calc(20% - 40px)",
              zIndex: 100,
            }}
          >
            <Divider />
            <ParameterSearch metadata={metadata} />
          </div>
        </>
      }
      leftTitle="Parameters"
      right={
        <Menu
          tree={POLICY_OUTPUT_TREE}
          selected={searchParams.get("focus")}
          onSelect={(focus) => {
            let newSearch = copySearchParams(searchParams);
            newSearch.set("focus", focus);
            setSearchParams(newSearch);
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
      let newSearch = copySearchParams(searchParams);
      newSearch.set("focus", "policy");
      setSearchParams(newSearch);
    }
  });

  // If we've landed on the page without a reform policy, create a new one.
  useEffect(() => {
    if (!policy.reform.data && !searchParams.get("reform")) {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("reform", metadata.countryId === "us" ? 2 : 1);
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!policy.reform.data]);

  let middle = null;

  if (!policy.reform.data) {
    middle = <LoadingCentered />;
  } else if (focus === "policy") {
    middle = <HelpPage />;
  } else if (Object.keys(metadata.parameters).includes(focus) && metadata.parameters[focus].type === "parameter") {
    middle = (
      <ParameterEditor
        parameterName={focus}
        metadata={metadata}
        policy={policy}
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
          right={
            <PolicyRightSidebar
              metadata={metadata}
              policy={policy}
              setPolicy={setPolicy}
            />
          }
          leftNavigatedSelected={false}
        />
      }
    />
  );
}
