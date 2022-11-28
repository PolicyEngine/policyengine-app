import ThreeColumnPage from "../layout/ThreeColumnPage";
import { useSearchParams } from "react-router-dom";
import { createDefaultHousehold, findInTree, formatVariableValue, getValueFromHousehold } from "../api/variables";
import { copySearchParams, countryApiCall } from "../api/call";
import { useEffect } from "react";
import VariableEditor from "./household/input/VariableEditor";
import LoadingCentered from "../layout/LoadingCentered";
import MaritalStatus from "./household/input/MaritalStatus";
import CountChildren from "./household/input/CountChildren";
import HouseholdRightSidebar from "./household/HouseholdRightSidebar";
import HouseholdOutput from "./household/output/HouseholdOutput";
import SearchOptions from "../controls/SearchOptions";
import useMobile from "../layout/Responsive";
import style from "../style";
import FolderPage from "../layout/FolderPage";
import StackedMenu from "../layout/StackedMenu";
import NavigationButton from "../controls/NavigationButton";
import HouseholdIntro from "./household/HouseholdIntro";

const HOUSEHOLD_OUTPUT_TREE = [
  {
    name: "householdOutput",
    label: "Your household",
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
      },
    ],
  }
      
];

function VariableSearch(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const options = Object.values(metadata.variables)
    .map((variable) => ({
      value: variable.moduleName + "." + variable.name,
      label: variable.label,
    }))
    .filter((option) => !!option.label && !!option.value);
  return (
    <SearchOptions
      options={options}
      defaultValue={null}
      style={{ margin: 0, width: "100%" }}
      placeholder="Search for a variable"
      onSelect={(value) => {
        let newSearch = copySearchParams(searchParams);
        newSearch.set("focus", value);
        setSearchParams(newSearch);
      }}
    />
  );
}

function HouseholdLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("focus") || "";
  const onSelect = (name) => {
    let newSearch = copySearchParams(searchParams);
    newSearch.set("focus", name);
    setSearchParams(newSearch);
  };

  return (
    <div>
      <div style={{padding: 10}}><VariableSearch metadata={metadata} /></div>
      <StackedMenu
        firstTree={metadata.variableTree.children}
        selected={selected}
        onSelect={onSelect}
        secondTree={HOUSEHOLD_OUTPUT_TREE[0].children}
      />
    </div>
  );
}

export function getDefaultHouseholdId(metadata) {
  // Creates the default household for the country, returning the household ID.
  const defaultHousehold = createDefaultHousehold(
    metadata.countryId,
    metadata.variables,
    metadata.entities
  );
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

function MobileTreeNavigationHolder(props) {
  const { metadata } = props;
  // Try to find the current focus in the tree.
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  let currentNode;
  if (focus && focus.startsWith("householdOutput")) {
    currentNode = { children: HOUSEHOLD_OUTPUT_TREE };
  } else {
    currentNode = {children: [metadata.variableTree]};
  }
  let breadcrumbs = [];
  try {
    let stem = "";
    for (let name of focus.split(".")) {
      stem += name;
      const fixedStem = stem;
      currentNode = currentNode.children.find((node) => node.name === fixedStem);
      breadcrumbs.push({
        name: stem,
        label: currentNode.label,
      });
      stem += ".";
    }
  } catch (e) {
    currentNode = null;
  }
  return <div style={{display: "flex", overflowX: "scroll", justifyContent: "center", alignItems: "center", height: "100%", padding: 15, backgroundColor: style.colors.LIGHT_GRAY}}>
      {breadcrumbs.map((breadcrumb, i) => (
        <h5
          key={breadcrumb.name}
          style={{
            margin: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            let newSearch = copySearchParams(searchParams);
            newSearch.set("focus", breadcrumb.name);
            setSearchParams(newSearch);
          }}
        >
          {breadcrumb.label}
          {i < breadcrumbs.length - 1 && <span style={{color: style.colors.DARK_GRAY, paddingRight: 5}}> &gt; </span>}
        </h5>
      ))}
    </div>
}

function MobileBottomMenu(props) {
  const { metadata, household } = props;
  const [searchParams] = useSearchParams();
  const hasReform = searchParams.get("reform") !== null;
  const focus = searchParams.get("focus") || "";
  const getValue = (variable) =>
    getValueFromHousehold(variable, null, null, household.baseline, metadata);
  const getReformValue = (variable) =>
    getValueFromHousehold(variable, null, null, household.reform, metadata);
    const getValueStr = (variable) =>
      formatVariableValue(metadata.variables[variable], getValue(variable), 0);
  let text;
  if (hasReform) {
    const difference =
      getReformValue("household_net_income") - getValue("household_net_income");
    if (Math.abs(difference) < 0.01) {
      text = `Your net income doesn't change`;
    } else {
      text = `Your net income ${
        difference > 0 ? "increases" : "decreases"
      } by ${formatVariableValue(
        metadata.variables.household_net_income,
        Math.abs(difference),
        0
      )}`;
    }
  } else {
    text = `Your net income is ${getValueStr("household_net_income")}`;
  }
  return <div style={{
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
  }}>
    <div>
    <h5 style={{marginBottom: 20}}>{text}</h5>
    {
      focus && focus.startsWith("householdOutput") && <NavigationButton text="Edit my household" focus="input" />
    }
    {
      focus && !focus.startsWith("householdOutput") && <NavigationButton text="See my household details" focus="householdOutput.netIncome" />
    }
    {
      !hasReform && <NavigationButton text="Create a reform" focus="gov" target={`/${metadata.countryId}/policy`} />
    }
    {
      hasReform && <NavigationButton text="Edit my reform" focus="gov" target={`/${metadata.countryId}/policy`} />
    }

    </div>
  </div>
}

function MobileHouseholdPage(props) {
  const { metadata, household, mainContent } = props;
  return <>
    <div style={{
      overflow: "scroll",
      width: "100%",
      padding: 20,
      height: "50vh",
    }}>
      {mainContent}
    </div>
    <MobileTreeNavigationHolder title="Your inputs" metadata={metadata}/>
    { household.input && <MobileBottomMenu metadata={metadata} household={household} /> }
  </>
}

export default function HouseholdPage(props) {
  const { metadata, household, setHousehold, policy } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const mobile = useMobile();

  let middle;
  const focus = searchParams.get("focus") || "";

  // If we've landed on the page without a focus, point at the intro page.
  useEffect(() => {
    if (focus === "") {
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
  } else if (
    Object.keys(metadata.variables).includes(focus.split(".")[focus.split(".").length - 1])
  ) {
    middle = (
      <VariableEditor
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (Object.keys(metadata.variableModules).includes(focus) || ["input", "input.household"].includes(focus)) {
    const node = findInTree({ children: [metadata.variableTree]}, focus);
    middle = <FolderPage 
      label={node.label} 
      children={node.children} 
      description={metadata.variableModules[focus] && metadata.variableModules[focus].description}
    />;
    } else if (focus === "input.household.maritalStatus") {
    middle = (
      <MaritalStatus
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
    } else if (focus === "intro") {
      middle = <HouseholdIntro />;

    } else if (focus === "input.household.children") {
    middle = (
      <CountChildren
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (focus && focus.startsWith("householdOutput.")) {
    middle = (
      <HouseholdOutput
        metadata={metadata}
        household={household}
        policy={policy}
      />
    );
  } else if (focus === "householdOutput") {
    middle = <FolderPage
      label="Household results"
      children={HOUSEHOLD_OUTPUT_TREE[0].children}
    />;
  } else {
    middle = <LoadingCentered />;
  }
  if (mobile) {
    return <MobileHouseholdPage mainContent={middle} metadata={metadata} household={household} />
  }
  return (
    <ThreeColumnPage
      left={<HouseholdLeftSidebar metadata={metadata} />}
      middle={middle}
      right={
        <HouseholdRightSidebar metadata={metadata} household={household} />
      }
    />
  );
}
