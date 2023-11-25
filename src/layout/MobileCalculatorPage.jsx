import { useEffect, useState, ReactComponentElement } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchOutlined } from "@ant-design/icons";

import {
  formatVariableValue,
  getValueFromHousehold,
} from "../api/variables";
import { copySearchParams } from "../api/call";
import NavigationButton from "../controls/NavigationButton";
import HOUSEHOLD_OUTPUT_TREE from "../pages/household/output/tree";
import VariableSearch from "../pages/household/VariableSearch";

import style from "../style";
import colors from "../redesign/style/colors";
import spacing from "../redesign/style/spacing";

/**
 * Layout component that overlays the household and policy pages on mobile
 * @param {Object} props 
 * @param {Object} props.metadata
 * @param {ReactComponentElement} props.mainContent The React component that would 
 * typically be displayed in the middle portion of the calculator on desktop
 * @param {Object} [props.householdInput] Required for "household" type
 * @param {Object} [props.householdBaseline] Required for "household" type
 * @param {Object} [props.householdReform] Required for "household" type
 * @param {boolean} [props.autoCompute] Required for "household" type
 * @param {('household'|'policy')} props.type The type of page to be rendered
 * @returns {ReactComponentElement}
 */
export default function MobileCalculatorPage(props) {
  const {
    metadata,
    householdInput,
    householdBaseline,
    householdReform,
    mainContent,
    autoCompute,
    type
  } = props;

  const [bottomPadding, setBottomPadding] = useState(0);

  useEffect(() => {
    const mobileBottomBar = document.querySelector(".mobile-bottom-bar");
    if (!mobileBottomBar) {
      return;
    }

    const bottomBarHeight = mobileBottomBar.offsetHeight;

    // If it changed, update bottomPadding
    if (bottomBarHeight !== bottomPadding) {
      setBottomPadding(bottomBarHeight);
    }
  });

  // Scroll to top every time a user opens a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <>
      <div
        style={{
          overflow: "scroll",
          width: "100%",
          padding: `20px 20px ${bottomPadding}px 20px`,
          minHeight: `calc(100vh - ${spacing.HEADER_HEIGHT}px)`
        }}
      >
        {mainContent}
      </div>
      {type === "household" && householdInput && (
        <MobileBottomMenu
          metadata={metadata}
          householdBaseline={householdBaseline}
          autoCompute={autoCompute}
          type={type}
        />
      )}
    </>
  );
}

/**
 * React component for bottom menu on mobile
 * @param {Object} props 
 * @param {Object} props.metadata
 * @param {('household'|'policy')} props.type
 * @param {Object} [props.householdBaseline] Only required for "household" type
 * @param {Object} [props.householdReform] Only required for "household" type
 * @param {Object} [props.autCompute] Only required for "household" type
 * @returns 
 */
function MobileBottomMenu(props) {
  const { 
    metadata, 
    type,
    householdBaseline, 
    householdReform, 
    autoCompute,
  } = props;
  const [searchParams] = useSearchParams();
  let hasReform = searchParams.get("reform") !== null;
  const focus = searchParams.get("focus") || "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuOpen() {
    setIsMenuOpen(prev => !prev);
  }

  return (
    <div
      className="mobile-bottom-bar"
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
        left: 0,
        bottom: 0,
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
        <MobileTreeNavigationHolder metadata={metadata} type={type}/>
        <MobileBottomNavButtons focus={focus} type={type}/>
        <MenuOpenCloseButton isMenuOpen={isMenuOpen} handleMenuOpen={handleMenuOpen}/>
      </div>
      <OpenedNavigationMenu 
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        autoCompute={autoCompute}
        isMenuOpen={isMenuOpen} 
        metadata={metadata}
        focus={focus}
        hasReform={hasReform}
        type={type}
      />
    </div>
  );
}

/**
 * Function to build a breadcrumb trail based upon an output tree;
 * currently not extensible for future tree versions
 * @param {Object} props 
 * @param {Object} props.metadata
 * @param {String} props.type
 * @returns {ReactComponentElement}
 */
function MobileTreeNavigationHolder(props) {
  const { metadata, type } = props;
  // Try to find the current focus in the tree.
  const [searchParams, setSearchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  let currentNode;

  if (type === "household") {
    if (focus && focus.startsWith("householdOutput")) {
      currentNode = { children: HOUSEHOLD_OUTPUT_TREE };
    } else {
      currentNode = { children: [metadata.variableTree] };
    }
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

// This function will run into merge conflicts with a button refactor (PR #867),
// and is dependent upon that refactor for even spacing and styling
function MobileBottomNavButtons({focus, type}) {
  if (
    type === "household" &&
    !(focus && focus.startsWith("householdOutput."))
  ) {
    return null;
  }

  let options = null;
  if (type === "household") {
    options = HOUSEHOLD_OUTPUT_TREE[0].children;
  }
  const currentIndex = options.map((option) => option.name).indexOf(focus);
  const previous = options[currentIndex - 1] || {};
  const next = options[currentIndex + 1] || {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      {previous.label ? (
        <NavigationButton
          focus={previous.name}
          text="left"
          style={{ padding: 0 }}
        />
      ) : (
        <div style={{ width: 80 }} />
      )}
      {}
      {next.label ? (
        <NavigationButton
          focus={next.name}
          text={"right"}
          style={{ padding: 0 }}
        />
      ) : (
        <div style={{ width: 80 }} />
      )}
    </div>
  );
}

function MenuOpenCloseButton({isMenuOpen, handleMenuOpen}) {
  return (
    <>
      <div
        style={{
          height: 54,
          width: 60,
          minWidth: 60,
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
    hasReform,
    type,
    householdBaseline,
    householdReform,
    autoCompute
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
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px"
        }}
        initial={{
          opacity: 1,
          visibility: "hidden",
          y: "100%"
        }}
        animate={{
          opacity: 1,
          visibility: "visible",
          y: "0%"
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <DividerBar />
        <TopText 
          type={type} 
          metadata={metadata}
          hasReform={hasReform}
          householdBaseline={householdBaseline}
          householdReform={householdReform}
          autoCompute={autoCompute}
        />
        <SearchBar metadata={metadata} type={type}/>
        <NavOptionsBar 
          focus={focus} 
          hasReform={hasReform}
          metadata={metadata}
          type={type}
        />
      </motion.div>
    </>
  )
}

function TopText(props) {
  let {
    type,
    metadata,
    hasReform,
    householdBaseline,
    householdReform,
    autoCompute
  } = props;

  if (type !== "household") {
    return null;
  }

  const [searchParams] = useSearchParams();

  // let hasReform = searchParams.get("reform") !== null;
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
    <h5 style={{margin: 0}}>
      {text}
    </h5>
  );
}

function DividerBar() {
  return (
    <div 
      style={{
        width: "100%",
        backgroundColor: colors.MEDIUM_DARK_GRAY,
        height: "1px"
      }}
    />
  )
}

function SearchBar({metadata, type}) {
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
      {type === "household" &&
        <VariableSearch metadata={metadata} />
      }
      <SearchOutlined
        style={{
          fontSize: 20,
          color: style.colors.BLACK,
          display: "block",
          width: "60px",
          flexShrink: 0
        }}
      />
    </div>
  );
}

function NavOptionsBar(props) {
  const {
    focus, 
    hasReform, 
    metadata,
    type
  } = props;

  let buttonsJSX = null;

  if (type === "household") {
    buttonsJSX = (
      <>
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
      </>
    );
  }

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
      {buttonsJSX}
    </div>
  );
}