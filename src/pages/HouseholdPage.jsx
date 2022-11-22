import ThreeColumnPage from "../layout/ThreeColumnPage";
import Menu from "../layout/Menu";
import { useSearchParams } from "react-router-dom";
import { createDefaultHousehold } from "../api/variables";
import { countryApiCall } from "../api/call";
import { useEffect } from "react";
import VariableEditor from "./household/input/VariableEditor";
import LoadingCentered from "../layout/LoadingCentered";
import MaritalStatus from "./household/input/MaritalStatus";
import CountChildren from "./household/input/CountChildren";
import BiPanel from "../layout/BiPanel";
import NetIncomeBreakdown from "./household/output/NetIncomeBreakdown";
import EarningsVariation from "./household/output/EarningsVariation";
import MarginalTaxRates from "./household/output/MarginalTaxRates";
import HouseholdRightSidebar from "./household/HouseholdRightSidebar";
import PolicyRightSidebar from "./policy/PolicyRightSidebar";
import HouseholdIntro from "./household/HouseholdIntro";

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
    ],
  },
];

function HouseholdLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <BiPanel
      left={
        <Menu
          tree={metadata.variableTree}
          selected={searchParams.get("focus") || ""}
          onSelect={(focus) => {
            let newSearchParams = { focus: focus };
            if (searchParams.get("household")) {
              newSearchParams.household = searchParams.get("household");
            }
            setSearchParams(newSearchParams);
          }}
        />
      }
      right={
        <Menu
          tree={HOUSEHOLD_OUTPUT_TREE}
          selected={searchParams.get("focus") || ""}
          onSelect={(focus) => {
            let newSearchParams = { focus: focus };
            if (searchParams.get("household")) {
              newSearchParams.household = searchParams.get("household");
            }
            setSearchParams(newSearchParams);
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
  const defaultHousehold = createDefaultHousehold(metadata.countryId, metadata.variables, metadata.entities);
  return countryApiCall(metadata.countryId, "/household", {data: defaultHousehold}, "POST")
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
      let newSearch = {};
      for (const [key, value] of searchParams) {
        newSearch[key] = value;
      }
      newSearch.focus = "intro";
      setSearchParams(newSearch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  // If we've landed on the page without a household, create a new one.
  useEffect(() => {
    if (!household.input && !searchParams.get("household")) {
      getDefaultHouseholdId(metadata).then(
        (householdId) => {
          let newSearch = {};
          for (const [key, value] of searchParams) {
            newSearch[key] = value;
          }
          newSearch.household = householdId;
          setSearchParams(newSearch);
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!household.input]);

  if (!household.input || !household.baseline) {
    middle = <LoadingCentered />;
  } else if (focus.startsWith("input.")) {
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
  } else if (focus === "householdOutput.netIncome") {
    middle = <NetIncomeBreakdown metadata={metadata} household={household} />;
  } else if (focus === "householdOutput.earnings") {
    middle = <EarningsVariation metadata={metadata} household={household} />;
  } else if (focus === "householdOutput.mtr") {
    middle = <MarginalTaxRates metadata={metadata} household={household} />;
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
