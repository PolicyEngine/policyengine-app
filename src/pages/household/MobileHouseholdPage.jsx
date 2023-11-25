import { useSearchParams } from "react-router-dom";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../api/variables";
import { copySearchParams } from "../../api/call";
import { useEffect, useState } from "react";
import style from "../../style";
<<<<<<< HEAD
import SearchParamNavButton from "../../controls/SearchParamNavButton";
=======
import { motion } from "framer-motion";
import NavigationButton from "../../controls/NavigationButton";
>>>>>>> 4f288cd (feat: (Unfinished) mobile bottom bar)
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import HOUSEHOLD_OUTPUT_TREE from "../household/output/tree";
import VariableSearch from "../household/VariableSearch";
import colors from "../../redesign/style/colors";

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
        (node) => node.name === fixedStem,
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
        padding: 5,
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap"
      }}
    >
      {breadcrumbs.map((breadcrumb, i) => (
        <h5
          key={breadcrumb.name}
          id={i === breadcrumbs.length - 1 ? "current-breadcrumb" : null}
          style={{
            cursor: "pointer",
            fontSize: "min(0.85rem, 20px)",
            whiteSpace: "wrap",
            margin: 0,
            fontWeight: i === breadcrumbs.length - 1 ? "normal" : "lighter"
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
                paddingLeft: 5,
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

function MobileBottomMenu(props) {
  const { metadata, householdBaseline, householdReform, autoCompute } = props;
  const [searchParams] = useSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuOpen() {
    setIsMenuOpen(prev => !prev);
  }

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
        0,
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
        padding: "10px",
        backgroundColor: colors.LIGHT_GRAY,
        borderTop: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 5,
        gap: "5px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MobileTreeNavigationHolder metadata={metadata} />
        {/* Left and right buttons*/}
        <MenuOpenCloseButton isMenuOpen={isMenuOpen} handleMenuOpen={handleMenuOpen}/>
      </div>
    <OpenedNavigationMenu 
      isMenuOpen={isMenuOpen} 
      metadata={metadata}
      focus={focus}
      hasReform={hasReform}
    />

{/*
      <div>
        <h5 style={{ marginBottom: 20 }}>{text}</h5>
        {focus && focus.startsWith("householdOutput") && (
          <SearchParamNavButton
            type="primary"
            text="Edit my household"
            focus="input"
            style={{ margin: "20px auto 10px" }}
          />
        )}
        {focus && !focus.startsWith("householdOutput") && (
          <SearchParamNavButton
            type="primary"
            text="See my household details"
            focus="householdOutput"
            style={{ margin: "20px auto 10px" }}
          />
        )}
        {!hasReform && (
          <SearchParamNavButton
            text="Create a reform"
            focus="gov"
            target={`/${metadata.countryId}/policy`}
            style={{ margin: "20px auto 10px" }}
          />
        )}
        {hasReform && (
          <SearchParamNavButton
            text="Edit my reform"
            focus="gov"
            target={`/${metadata.countryId}/policy`}
            style={{ margin: "20px auto 10px" }}
          />
        )}
      </div>
*/}
    </div>
  );
}

function MenuOpenCloseButton({isMenuOpen, handleMenuOpen}) {
  return (
    <>
      <div
        style={{
          height: 50,
          width: 50,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          padding: 15,
          color: "white",
          backgroundColor: colors.TEAL_ACCENT,
          fontSize: 20,
          cursor: "pointer",
        }}
        onClick={handleMenuOpen}
      >
        <span
          className="material-symbols-outlined"
          alt="Open context menu"
          style={{
            objectFit: "contain",
            color: "white",
          }}
        >
          {isMenuOpen ? "close" : "menu"}
        </span>
      </div>
    </>
  );
}

function OpenedNavigationMenu(props) {
  const {
    isMenuOpen, 
    metadata, 
    focus,
    hasReform
  } = props;

  if (!isMenuOpen) {
    return null;
  }
  return (
    <>
      <motion.div
        style={{
          paddingTop: "5px",
          paddingBottom: "5px",
          width: "100%",
          zIndex: -1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px"
        }}
        initial={{
          opacity: 0,
          visibility: "hidden"
        }}
        animate={{
          opacity: 1,
          visibility: "visible"
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <SearchBar metadata={metadata} />
        <NavOptionsBar 
          focus={focus} 
          hasReform={hasReform}
          metadata={metadata}
        />
      </motion.div>
    </>
  )
}

function SearchBar({metadata}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "10px"
      }}
    >
      <VariableSearch metadata={metadata} />
      <SearchOutlined
        style={{
          fontSize: 20,
          color: style.colors.BLACK,
          display: "block",
          width: "50px",
          flexShrink: 0
        }}
      />
    </div>
  );
}

function NavOptionsBar(props) {
  const {focus, hasReform, metadata} = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "5px",
        flexWrap: "wrap"
      }}
    >
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
  );
}