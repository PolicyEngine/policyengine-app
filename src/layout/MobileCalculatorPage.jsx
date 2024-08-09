// eslint-disable-next-line no-unused-vars
import { useEffect, useState, ReactComponentElement } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchOutlined } from "@ant-design/icons";
import { Drawer } from "antd";

import { formatVariableValue, getValueFromHousehold } from "../api/variables";
import { getPolicyOutputTree } from "pages/policy/output/tree";
import { copySearchParams } from "../api/call";
import SearchParamNavButton from "controls/SearchParamNavButton";
import HOUSEHOLD_OUTPUT_TREE from "../pages/household/output/tree";
import VariableSearch from "../pages/household/VariableSearch";
import { ParameterSearch } from "../pages/PolicyPage.jsx";
import PolicyRightSidebar from "../pages/policy/PolicyRightSidebar.jsx";
import { impactKeys } from "../pages/policy/output/ImpactTypes.jsx";

import style from "../style";
import colors from "../style/colors";
import spacing from "../style/spacing";

// Function to flatten the tree structure from which the currentNode is populated and include only leaf nodes. Current tree structure includes labels that are not in ImpactTypes.jsx.
function flattenTree(tree) {
  let flatTree = [];
  
  function traverse(node) {
    flatTree.push({ name: node.name, label: node.label });
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  
  tree.forEach(node => traverse(node));
  return flatTree;
}

// Helper function to adjust Focus when not in DOM
function getPreviousValidFocus(options, currentIndex, validFocusValues) {
  let previousIndex = currentIndex - 1;
  while (previousIndex >= 0) {
    const optionName = options[previousIndex].name.replace("policyOutput.", "");
    if (optionName === "policyBreakdown" || validFocusValues.includes(optionName)) {
      return options[previousIndex];
    }
    previousIndex -= 1;
  }
  return {}; // Return an empty object if no valid previous focus is found
}

// Helper function to adjust Focus when not in DOM
function getNextValidFocus(options, currentIndex, validFocusValues) {
  let nextIndex = currentIndex + 1;
  while (nextIndex <= options.length - 1) {
    const optionName = options[nextIndex].name.replace("policyOutput.", "");
    if (optionName === "policyBreakdown" || validFocusValues.includes(optionName)) {
      return options[nextIndex];
    }
    nextIndex += 1;
  }
  return {}; // Return an empty object if no valid previous focus is found
}

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
 * @param {Object} [props.policy] Required for "policy" type
 * @param {('household'|'policy')} props.type The type of page to be rendered
 * @returns {ReactComponentElement}
 */
export default function MobileCalculatorPage(props) {
  const {
    mainContent,
    metadata,
    type,
    householdInput,
    householdBaseline,
    autoCompute,
    policy,
  } = props;

  const [searchParams] = useSearchParams();
  const [bottomPadding, setBottomPadding] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  });

  const embed = searchParams.get("embed") !== null;
  if (type === "policy" && embed) {
    return mainContent;
  }

  return (
    <>
      <div
        style={{
          overflow: "scroll",
          width: "100%",
          padding: `20px 20px ${bottomPadding}px 20px`,
          minHeight: `calc(100vh - ${spacing.HEADER_HEIGHT}px)`,
        }}
      >
        {mainContent}
      </div>
      {((type === "household" && householdInput) || type === "policy") && (
        <MobileBottomMenu
          metadata={metadata}
          policy={policy}
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
    policy,
  } = props;
  const [searchParams] = useSearchParams();
  let hasReform = searchParams.get("reform") !== null;
  const focus = searchParams.get("focus") || "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuOpen() {
    setIsMenuOpen((prev) => !prev);
  }

  const buttonHeight = 60;
  const paddingHeight = 10;

  const animationVariants = {
    open: {
      transform: "translateY(0px)",
    },
    closed: {
      transform: `translateY(calc(100% - ${
        buttonHeight + 2 * paddingHeight
      }px))`,
    },
  };

  return (
    <motion.div
      className="mobile-bottom-bar"
      style={{
        padding: paddingHeight,
        backgroundColor: colors.LIGHT_GRAY,
        borderTop: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        position: "fixed",
        left: 0,
        zIndex: 5,
        gap: `calc(0.5 * ${paddingHeight}px)`,
        bottom: 0,
      }}
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
      variants={animationVariants}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <MobileTreeNavigationHolder
          metadata={metadata}
          type={type}
          buttonHeight={buttonHeight}
        />
        <MobileBottomNavButtons focus={focus} type={type} metadata={metadata} />
        {type === "policy" && (
          <PolicyDrawerButton
            metadata={metadata}
            policy={policy}
            buttonHeight={buttonHeight}
          />
        )}
        <MenuOpenCloseButton
          isMenuOpen={isMenuOpen}
          handleMenuOpen={handleMenuOpen}
          buttonHeight={buttonHeight}
        />
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
        policy={policy}
        handleMenuOpen={handleMenuOpen}
      />
    </motion.div>
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
  const { metadata, type, buttonHeight } = props;
  // Try to find the current focus in the tree.
  const [searchParams, setSearchParams] = useSearchParams();
  
  // eslint-disable-next-line no-console
  console.log('searchParams:', searchParams.toString());

  const focus = searchParams.get("focus");

  // eslint-disable-next-line no-console
  console.log('Focus:', focus);

  let currentNode;

  if (type === "household") {
    if (focus && focus.startsWith("householdOutput")) {
      currentNode = { children: HOUSEHOLD_OUTPUT_TREE };
    } else {
      currentNode = { children: [metadata.variableTree] };
    }
  }
  if (type === "policy") {
    const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
    if (focus && focus.startsWith("policyOutput")) {
      currentNode = { children: POLICY_OUTPUT_TREE };
    } else {
      currentNode = { children: [metadata.parameterTree] };
    }
  }

  // eslint-disable-next-line no-console
  console.log('Current Node:', currentNode);
  

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
        flexWrap: "wrap",
        minHeight: 0,
        maxHeight: buttonHeight,
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
            fontWeight: i === breadcrumbs.length - 1 ? "normal" : "lighter",
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
// This function creates navigation buttons of the 
function MobileBottomNavButtons({ focus, type, metadata }) {
  if (
    type === "household" &&
    !(focus && focus.startsWith("householdOutput."))
  ) {
    return null;
  }
  if (type === "policy" && !(focus && focus.startsWith("policyOutput."))) {
    return null;
  }

  let options = null;
  if (type === "household") {
    options = flattenTree(HOUSEHOLD_OUTPUT_TREE[0].children);


  }
  if (type === "policy") {
    const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
    options = flattenTree(POLICY_OUTPUT_TREE[0].children);
  }

  // eslint-disable-next-line no-console
  console.log('Options:', options);

  // define valid focus values for checking if focus for previous and next is valid
  const validFocusValues = impactKeys;
   // eslint-disable-next-line no-console
   console.log('Valid Focus Falues:', validFocusValues);

  // Define currentIndex after options is determined
  const currentIndex = options.map((option) => option.name).indexOf(focus);

  // Apply logic based on type
  let previous, next;

  if (type === "household") {
    previous = options[currentIndex - 1] || {};
    next = options[currentIndex + 1] || {};
  } else if (type === "policy") {
    previous = getPreviousValidFocus(options, currentIndex, validFocusValues) || {};
    next = getNextValidFocus(options, currentIndex, validFocusValues) || {};
  }

  


  



  // eslint-disable-next-line no-console
  console.log('Current Index:', currentIndex);
  
  // eslint-disable-next-line no-console
  console.log('Next value:', next);
  // eslint-disable-next-line no-console
  console.log('Previous value:', previous);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {previous.label ? (
        <SearchParamNavButton
          focus={previous.name}
          direction="left"
          style={{ padding: 0 }}
        />
      ) : (
        <div style={{ width: 60 }} />
      )}
      {}
      {next.label ? (
        <SearchParamNavButton
          focus={next.name}
          direction="right"
          style={{ padding: 0 }}
        />
      ) : (
        <div style={{ width: 60 }} />
      )}
    </div>
  );
}

function MenuOpenCloseButton({ isMenuOpen, handleMenuOpen, buttonHeight }) {
  return (
    <>
      <div
        style={{
          height: buttonHeight,
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
            fontSize: "30px",
          }}
        >
          {isMenuOpen ? "keyboard_arrow_down" : "keyboard_arrow_up"}
        </span>
      </div>
    </>
  );
}

function PolicyDrawerButton({ policy, metadata, buttonHeight }) {
  const [isPolicyDrawerOpen, setIsPolicyDrawerOpen] = useState(false);

  function handleClick() {
    setIsPolicyDrawerOpen((prev) => !prev);
  }

  return (
    <>
      <div
        style={{
          height: buttonHeight,
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
        onClick={handleClick}
      >
        <span
          className="material-symbols-outlined"
          alt="Open context menu"
          style={{
            objectFit: "contain",
            color: "white",
          }}
        >
          {isPolicyDrawerOpen ? "close" : "book"}
        </span>
      </div>
      <Drawer
        open={isPolicyDrawerOpen}
        onClose={(e) => handleClick(e)}
        placement="bottom"
        title="Your policy"
        height="min(100vh, auto)"
        style={{
          maxHeight: "100vh",
          overflow: "scroll",
          height: "unset",
        }}
        contentWrapperStyle={{
          maxHeight: "100vh",
        }}
      >
        <PolicyRightSidebar
          metadata={metadata}
          policy={policy}
          closeDrawer={handleClick}
          hideButtons
        />
      </Drawer>
    </>
  );
}

function OpenedNavigationMenu(props) {
  const {
    metadata,
    focus,
    hasReform,
    type,
    householdBaseline,
    householdReform,
    autoCompute,
    policy,
    handleMenuOpen,
  } = props;

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
          gap: "10px",
        }}
        initial={{
          opacity: 1,
          visibility: "hidden",
          y: "100%",
        }}
        animate={{
          opacity: 1,
          visibility: "visible",
          y: "0%",
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
        <SearchBar
          metadata={metadata}
          type={type}
          handleMenuOpen={handleMenuOpen}
        />
        <NavOptionsBar
          focus={focus}
          hasReform={hasReform}
          metadata={metadata}
          type={type}
          policy={policy}
          handleMenuOpen={handleMenuOpen}
        />
      </motion.div>
    </>
  );
}

function TopText(props) {
  let {
    type,
    metadata,
    hasReform,
    householdBaseline,
    householdReform,
    autoCompute,
  } = props;

  if (type !== "household") {
    return null;
  }

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
  return <h5 style={{ margin: 0 }}>{text}</h5>;
}

function DividerBar() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: colors.MEDIUM_DARK_GRAY,
        height: "1px",
      }}
    />
  );
}

function SearchBar({ metadata, type, handleMenuOpen }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        paddingRight: "10px",
      }}
    >
      {type === "household" && (
        <VariableSearch metadata={metadata} callback={handleMenuOpen} />
      )}
      {type === "policy" && (
        <ParameterSearch metadata={metadata} callback={handleMenuOpen} />
      )}
      <SearchOutlined
        style={{
          fontSize: 20,
          color: style.colors.BLACK,
          display: "block",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function NavOptionsBar(props) {
  const { focus, type, metadata, hasReform, handleMenuOpen } = props;

  let buttonData = [];

  if (type === "household") {
    if (focus && focus.startsWith("householdOutput")) {
      buttonData.push({
        text: "Edit my household",
        focus: "input",
      });
    } else if (focus) {
      buttonData.push({
        text: "See my household details",
        focus: "householdOutput",
      });
    }

    if (hasReform) {
      buttonData.push({
        text: "Edit my reform",
        focus: "gov",
        target: `/${metadata.countryId}/policy`,
      });
    } else {
      buttonData.push({
        text: "Create a reform",
        focus: "gov",
        target: `/${metadata.countryId}/policy`,
      });
    }
  }

  if (type === "policy") {
    if (focus && focus.startsWith("policyOutput")) {
      buttonData.push({
        text: "Edit my policy",
        focus: "gov",
      });
    } else if (focus) {
      buttonData.push({
        text: "Calculate economic impact",
        focus: "policyOutput.policyBreakdown",
      });
    }

    if (hasReform) {
      buttonData.push({
        text: "Calculate my household impact",
        focus: "input",
        target: `/${metadata.countryId}/household`,
      });
    } else {
      buttonData.push({
        text: "Enter my household",
        focus: "input",
        target: `/${metadata.countryId}/household`,
      });
    }
  }

  const buttonsJSX = buttonData.map((item, index) => {
    return (
      <SearchParamNavButton
        key={index}
        primary
        text={item.text}
        focus={item.focus}
        target={item.target}
        moreOnClick={handleMenuOpen}
      />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "5px",
        flexWrap: "wrap",
      }}
    >
      {buttonsJSX}
    </div>
  );
}
