import { useSearchParams } from "react-router-dom";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../api/variables";
import { copySearchParams } from "../../api/call";
import { useEffect, useState } from "react";
import style from "../../style";
import NavigationButton from "../../controls/NavigationButton";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import HOUSEHOLD_OUTPUT_TREE from "../household/output/tree";
import VariableSearch from "../household/VariableSearch";

function MobileTreeNavigationHolder(props) {
  const { metadata } = props;
  // Try to find the current focus in the tree.
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  let currentNode;
  if (focus && focus.startsWith("householdOutput")) {
    currentNode = { children: HOUSEHOLD_OUTPUT_TREE };
  } else {
    currentNode = { children: [metadata.variableTree] };
  }
  useEffect(() => {
    // On load, scroll the current breadcrumb into view.
    const breadcrumb = document.getElementById("current-breadcrumb");
    // Smoothly scroll the breadcrumb into view, with padding.
    if (breadcrumb) {
      breadcrumb.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [focus]);
  let breadcrumbs = [];
  try {
    let stem = "";
    for (let name of focus.split(".")) {
      stem += name;
      const fixedStem = stem;
      currentNode = currentNode.children.find(
        (node) => node.name === fixedStem
      );
      breadcrumbs.push({
        name: stem,
        label: currentNode.label,
      });
      stem += ".";
    }
  } catch (e) {
    currentNode = null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 15,
        backgroundColor: style.colors.LIGHT_GRAY,
        height: 50,
        alignItems: "center",
        width: "100%",
      }}
    >
      {breadcrumbs.map((breadcrumb, i) => (
        <h5
          key={breadcrumb.name}
          id={i === breadcrumbs.length - 1 ? "current-breadcrumb" : null}
          style={{
            cursor: "pointer",
            fontSize: 18,
            maxHeight: 20,
            maxWidth: 200,
            paddingLeft: 10,
            paddingRight: 10,
            whiteSpace: "nowrap",
            margin: 0,

          }}
          onClick={() => {
            let newSearch = copySearchParams(searchParams);
            newSearch.set("focus", breadcrumb.name);
            setSearchParams(newSearch);
          }}
        >
          {breadcrumb.label}
          {i < breadcrumbs.length - 1 && (
            <span
              style={{
                color: style.colors.DARK_GRAY,
                paddingRight: 5,
                paddingLeft: 10,
              }}
            >
              {"/"}
            </span>
          )}
        </h5>
      ))}
    </div>
  );
}

function MobileMiddleBar(props) {
  const { metadata } = props;
  const [searchMode, setSearchMode] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "85%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!searchMode ? (
          <MobileTreeNavigationHolder metadata={metadata} />
        ) : (
          <VariableSearch metadata={metadata} />
        )}
      </div>
      <div
        style={{
          width: "15%",
          backgroundColor: style.colors.LIGHT_GRAY,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!searchMode ? (
          <SearchOutlined
            style={{
              fontSize: 20,
              color: style.colors.BLACK,
            }}
            onClick={() => setSearchMode(!searchMode)}
          />
        ) : (
          <CloseOutlined
            style={{
              fontSize: 20,
              color: style.colors.BLACK,
            }}
            onClick={() => setSearchMode(!searchMode)}
          />
        )}
      </div>
    </div>
  );
}

function MobileBottomMenu(props) {
  const { metadata, householdBaseline, householdReform, autoCompute } = props;
  const [searchParams] = useSearchParams();
  let hasReform = searchParams.get("reform") !== null;
  const focus = searchParams.get("focus") || "";
  const getValue = (variable) =>
    getValueFromHousehold(variable, null, null, householdBaseline, metadata);
  const getReformValue = (variable) =>
    getValueFromHousehold(variable, null, null, householdReform, metadata);
  const getValueStr = (variable) =>
    formatVariableValue(metadata.variables[variable], getValue(variable), 0);
  let text;
  try {
    getReformValue("household_net_income");
  } catch (e) {
    hasReform = false;
  }
  if (hasReform && autoCompute) {
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
  } else if (autoCompute) {
    text = `Your net income is ${getValueStr("household_net_income")}`;
  } else {
    text = "";
  }
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "25vh",
      }}
    >
      <div>
        <h5 style={{ marginBottom: 20 }}>{text}</h5>
        {focus && focus.startsWith("householdOutput") && (
          <NavigationButton primary text="Edit my household" focus="input" />
        )}
        {focus && !focus.startsWith("householdOutput") && (
          <NavigationButton
            primary
            text="See my household details"
            focus="householdOutput"
          />
        )}
        {!hasReform && (
          <NavigationButton
            text="Create a reform"
            focus="gov"
            target={`/${metadata.countryId}/policy`}
          />
        )}
        {hasReform && (
          <NavigationButton
            text="Edit my reform"
            focus="gov"
            target={`/${metadata.countryId}/policy`}
          />
        )}
      </div>
    </div>
  );
}

export default function MobileHouseholdPage(props) {
  const {
    metadata,
    householdInput,
    householdBaseline,
    mainContent,
    autoCompute,
  } = props;
  return (
    <>
      <div
        style={{
          overflow: "scroll",
          width: "100%",
          padding: 20,
          height: "60vh",
        }}
      >
        {mainContent}
      </div>
      <MobileMiddleBar metadata={metadata} />
      {householdInput && (
        <MobileBottomMenu
          metadata={metadata}
          householdBaseline={householdBaseline}
          autoCompute={autoCompute}
        />
      )}
    </>
  );
}
