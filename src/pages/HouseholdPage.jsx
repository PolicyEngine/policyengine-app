import ThreeColumnPage from "../layout/ThreeColumnPage";
import Menu from "../layout/Menu";
import { useSearchParams } from "react-router-dom";
import { createDefaultHousehold } from "../api/variables";
import { copySearchParams, countryApiCall } from "../api/call";
import { useEffect } from "react";
import VariableEditor from "./household/input/VariableEditor";
import LoadingCentered from "../layout/LoadingCentered";
import MaritalStatus from "./household/input/MaritalStatus";
import CountChildren from "./household/input/CountChildren";
import BiPanel from "../layout/BiPanel";
import HouseholdRightSidebar from "./household/HouseholdRightSidebar";
import PolicyRightSidebar from "./policy/PolicyRightSidebar";
import HouseholdIntro from "./household/HouseholdIntro";
import HouseholdOutput from "./household/output/HouseholdOutput";
import SearchOptions from "../controls/SearchOptions";
import Divider from "../layout/Divider";

const HOUSEHOLD_OUTPUT_TREE = [
  {
    name: "householdOutput",
    label: "Results",
    children: [
      {
        name: "householdOutput.netIncome",
        label: "Net income",
      },
      {
        name: "householdOutput.earnings",
        label: "Varying your earnings",
      },
      {
        name: "householdOutput.mtr",
        label: "Marginal tax rates",
      },
      {
        name: "householdOutput.pythonReproducibility",
        label: "Reproduce in Python",
      }
    ],
  },
];

function VariableSearch(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const options = Object.values(metadata.variables).map((variable) => ({
      value: variable.moduleName + "." + variable.name,
      label: variable.label,
    })).filter(option => !!option.label && !!option.value);
  return <SearchOptions
    options={options}
    defaultValue={null}
    style={{margin: 0, width: "100%"}}
    placeholder="Search for a variable"
    onSelect={(value) => {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("focus", value);
      setSearchParams(newSearch);
    }}
    />
}

function HouseholdLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();

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
          tree={metadata.variableTree}
          selected={searchParams.get("focus") || ""}
          onSelect={(focus) => {
            let newSearch = copySearchParams(searchParams);
            newSearch.set("focus", focus);
            setSearchParams(newSearch);
          }}
          />
        </div>
        <div style={{
            position: "absolute",
            bottom: 20,
            width: "calc(20% - 40px)",
            zIndex: 100,
          }}>
            <Divider />
            <VariableSearch metadata={metadata} />
          </div>
        </>
      }
      right={
        <Menu
          tree={HOUSEHOLD_OUTPUT_TREE}
          selected={searchParams.get("focus") || ""}
          onSelect={(focus) => {
            let newSearch = copySearchParams(searchParams);
            newSearch.set("focus", focus);
            setSearchParams(newSearch);
          }}
        />
      }
      leftTitle="Inputs"
      rightTitle="Outputs"
      leftNavigatedSelected={
        !(searchParams.get("focus") || "").startsWith("householdOutput")
      }
    />
  );
}

export function getDefaultHouseholdId(metadata) {
  // Creates the default household for the country, returning the household ID.
  const defaultHousehold = createDefaultHousehold(
    metadata.countryId,
    metadata.variables,
    metadata.entities
  );
  console.log(defaultHousehold);
  return countryApiCall(
    metadata.countryId,
    "/household",
    { data: defaultHousehold },
    "POST"
  )
    .then((res) => res.json())
    .then((dataHolder) => {
      return dataHolder.result.household_id;
    });
}

export default function HouseholdPage(props) {
  const { metadata, household, setHousehold, policy } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  let middle;
  const focus = searchParams.get("focus") || "";

  // If we've landed on the page without a focus, point at the intro page.
  useEffect(() => {
    if (!focus) {
      let newSearch = copySearchParams(searchParams);
      newSearch.set("focus", "intro");
      setSearchParams(newSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  // If we've landed on the page without a household, create a new one.
  useEffect(() => {
    if (!household.input && !searchParams.get("household")) {
      getDefaultHouseholdId(metadata).then((householdId) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("household", householdId);
        setSearchParams(newSearch);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!household.input]);

  if (!household.input || !household.baseline) {
    middle = <LoadingCentered />;
  } else if (focus.startsWith("input.") || focus.startsWith("gov.") || focus.startsWith("household.")) {
    middle = (
      <VariableEditor
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (focus === "structure.maritalStatus") {
    middle = (
      <MaritalStatus
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (focus === "structure.children") {
    middle = (
      <CountChildren
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (focus.startsWith("householdOutput.")) {
    middle = (
      <HouseholdOutput
        metadata={metadata}
        household={household}
        policy={policy}
      />
    );
  } else if (focus === "intro") {
    middle = <HouseholdIntro />;
  } else {
    middle = <LoadingCentered />;
  }
  return (
    <ThreeColumnPage
      left={<HouseholdLeftSidebar metadata={metadata} />}
      middle={middle}
      right={
        <BiPanel
          leftTitle="Household"
          rightTitle="Policy"
          left={
            <HouseholdRightSidebar metadata={metadata} household={household} />
          }
          right={<PolicyRightSidebar metadata={metadata} policy={policy} />}
          leftNavigatedSelected={true}
        />
      }
    />
  );
}
