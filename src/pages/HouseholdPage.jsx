import ThreeColumnPage from "../layout/ThreeColumnPage";
import Menu from "../layout/Menu";
import { useSearchParams } from "react-router-dom";
import { createDefaultHousehold } from "../api/variables";
import { copySearchParams, countryApiCall } from "../api/call";
import { useEffect, useState } from "react";
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
import useMobile from "../layout/Responsive";
import { HEADER_HEIGHT } from "../style/spacing";
import { AnimatePresence, motion } from "framer-motion";
import useWindowHeight from "../layout/WindowHeight";
import Button from "../controls/Button";
import style from "../style";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import MarkdownPage from "../layout/MarkdownPage";

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
      },
    ],
  },
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
          <div
            style={{
              position: "absolute",
              bottom: 20,
              width: "calc(20% - 40px)",
              zIndex: 100,
            }}
          >
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

function MobileTreeNavigationLayer(props) {
  const { subtree, onExpand } = props;
  return <div
    style={{
      display: "flex",
      overflowX: "scroll",
    }}
  >
    {Object.values(subtree).map((node) => (
      <div
        key={node.name}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          minWidth: 100,
          maxWidth: 100,
          backgroundColor: style.colors.DARK_GRAY,
          margin: 10,
          borderRadius: 10,
          padding: 10,
          cursor: "pointer",
        }}
        onClick={() => onExpand(node.name)}
      >
        <h6 style={{margin: 0, color: "white"}}>{node.label}</h6>
      </div>
    ))}
  </div>
}

function MobileTreeNavigation(props) {
  const { tree, setExpanded } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedNames, setSelectedNames] = useState([]);
  let subLevels = [];
  let currentNode = tree;
  console.log(selectedNames);
  for (let i = 0; i < selectedNames.length; i++) {
    let children;
    if (currentNode.children) {
      children = currentNode.children;
    } else {
      children = currentNode;
    }
    currentNode = children.find((node) => node.name === selectedNames[i]);
    let onExpand;
    if (currentNode.children) {
      onExpand = (name) => {
        if (!currentNode.children.find(node => node.name === name).children) {
          // If the node is a leaf, don't expand it.
          let newSearch = copySearchParams(searchParams);
          newSearch.set("focus", name);
          setSearchParams(newSearch);
          setExpanded(false);
        } else if (selectedNames.includes(name)) {
          setSelectedNames(selectedNames.slice(0, selectedNames.indexOf(name)));
        } else {
          setSelectedNames(selectedNames.slice(0, i + 1).concat([name]));
        }
      };
    } else {
      onExpand = () => {};
    }
    subLevels.push(
      <motion.div
        key={currentNode.name}
        initial={{ height: 0 }}
        animate={{ height: 120 }}
        exit={{ height: 0 }}
        style={{
          overflow: "hidden",
        }}
      >
        <MobileTreeNavigationLayer
          key={i}
          subtree={currentNode.children}
          onExpand={onExpand}
        />
      </motion.div>
    )
  }
  return <div>
    <MobileTreeNavigationLayer subtree={tree} onExpand={(name) => {
        if (selectedNames.includes(name)) {
          setSelectedNames(selectedNames.slice(0, selectedNames.indexOf(name)));
        } else {
          setSelectedNames([name]);
        }
      }} />
    <AnimatePresence
      mode="wait"
    >
    {subLevels}
    </AnimatePresence>
  </div>
}

function MobileTreeNavigationHolder(props) {
  const { expanded, setExpanded, metadata, title } = props;
  // Try to find the current focus in the tree.
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  let currentNode = {children: metadata.variableTree};
  try {
    let stem = "";
    for (let name of focus.split(".")) {
      stem += name;
      currentNode = currentNode.children.find((node) => node.name === stem);
      stem += ".";
    }
  } catch (e) {
    currentNode = null;
  }
  const currentLabel = currentNode ? currentNode.label : "Select an input";
  if (expanded) {
    return <div style={{
      padding: 10,
    }}>
      <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={() => setExpanded(false)}>
        <h2 style={{margin: 0, paddingLeft: 10}}>{title}</h2>
        <CaretDownOutlined style={{marginLeft: "auto", marginTop: 5, fontSize: 20}} />
      </div>
      <MobileTreeNavigation tree={metadata.variableTree} setExpanded={setExpanded} />
    </div>
  } else {
    return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: 5}}>
        <h5 style={{margin: 0}}>{currentLabel}</h5>
        <CaretUpOutlined style={{marginLeft: "auto", fontSize: 20}} />
      </div>
  }
}

function MobileHouseholdPage(props) {
  const { mainContent, metadata } = props;
  const windowHeight = useWindowHeight();
  const [navigationExpanded, setNavigationExpanded] = useState(false);
  return <>
    <div style={{
      position: "absolute",
      top: HEADER_HEIGHT,
      maxHeight: windowHeight * 0.6,
      overflow: "scroll",
      width: "100%",
    }}>
      {mainContent}
    </div>
    <motion.div style={{
        position: "absolute",
        backgroundColor: style.colors.LIGHT_GRAY,
        width: "100%",
      }}
      animate={{
        height: navigationExpanded ? windowHeight * 0.6 : 50,
        top: HEADER_HEIGHT + !navigationExpanded * windowHeight * 0.6,
      }}
      onClick={
        !navigationExpanded ?
        () => setNavigationExpanded(true) :
        null
      }
      >
      <MobileTreeNavigationHolder title="Your inputs" metadata={metadata} expanded={navigationExpanded} setExpanded={setNavigationExpanded} />
    </motion.div>
  </>
}

function HouseholdFolderPage(props) {
  return <div>
    <h1>Household</h1>
  </div>
}

export default function HouseholdPage(props) {
  const { metadata, household, setHousehold, policy } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const mobile = useMobile();

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
  } else if (
    metadata.variablesInOrder.includes(focus)
  ) {
    middle = (
      <VariableEditor
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (Object.keys(metadata.variableModules).includes(focus)) {
    middle = <MarkdownPage
      title={metadata.variableModules[focus].label}
      >
        {metadata.variableModules[focus].description}
      </MarkdownPage>
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
  } else if (focus === "structure") {
    middle = <HouseholdFolderPage />;
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
  if (mobile) {
    return <MobileHouseholdPage mainContent={middle} metadata={metadata} />
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
