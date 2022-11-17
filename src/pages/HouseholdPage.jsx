import ThreeColumnPage from "../layout/ThreeColumnPage";
import Menu from "../layout/Menu";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { createDefaultHousehold } from "../api/variables";
import { apiCall } from "../api/call";
import { useEffect } from "react";
import VariableEditor from "./household/input/VariableEditor";
import LoadingCentered from "../layout/LoadingCentered";
import ErrorPage from "../layout/Error";
import MaritalStatus from "./household/input/MaritalStatus";
import CountChildren from "./household/input/CountChildren";
import BiPanel from "../layout/BiPanel";
import NetIncomeBreakdown from "./household/output/NetIncomeBreakdown";
import EarningsVariation from "./household/output/EarningsVariation";

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
    />
  );
}

function createHousehold(id, countryId, metadata) {
  // Fetches the household with the given ID if it exists, otherwise creates a new one.
  if (id) {
    return apiCall(`/${countryId}/household/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        return createDefaultHousehold(
          countryId,
          metadata.variables,
          metadata.entities
        );
      });
  } else {
    return new Promise((resolve) =>
      resolve(
        createDefaultHousehold(countryId, metadata.variables, metadata.entities)
      )
    );
  }
}

export default function HouseholdPage(props) {
  const { metadata } = props;

  const [household, setHouseholdData] = useState({
    input: null,
    computed: null,
    id: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorCreatingHousehold, setErrorCreatingHousehold] = useState(false);
  // Updating the household should update the household=id URL parameter
  const setHousehold = (newHousehold) => {
    setHouseholdData({
      input: newHousehold,
      computed: household.computed,
      id: household.id,
    });
    apiCall(`/${metadata.countryId}/calculate`, newHousehold)
      .then((res) => res.json())
      .then((data) => {
        setHouseholdData({
          input: newHousehold,
          computed: data,
          id: data.household_id,
        });
        let newSearch = { household: data.household_id };
        if (searchParams.get("focus")) {
          newSearch.focus = searchParams.get("focus");
        }
        setSearchParams(newSearch);
      })
      .catch((err) => {
        setErrorCreatingHousehold(true);
      });
  };

  useEffect(() => {
    if (!household.input && !errorCreatingHousehold) {
      createHousehold(
        searchParams.get("household"),
        metadata.countryId,
        metadata
      ).then((household) => {
        setHousehold(household);
      });
    }
    if (!searchParams.get("focus")) {
      setSearchParams({
        focus: "structure.maritalStatus",
        household: searchParams.get("household"),
      });
    }
  });

  let middle;
  const focus = searchParams.get("focus") || "";

  if (errorCreatingHousehold) {
    return (
      <ErrorPage message="We couldn't create a new household. Please try again later." />
    );
  }

  if (!household.input || !household.computed) {
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
  } else {
    middle = <LoadingCentered />;
  }
  return (
    <ThreeColumnPage
      left={<HouseholdLeftSidebar metadata={metadata} />}
      middle={middle}
      right={<BiPanel leftTitle="Household" rightTitle="Policy" />}
    />
  );
}
