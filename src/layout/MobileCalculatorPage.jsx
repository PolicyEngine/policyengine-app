// eslint-disable-next-line no-unused-vars
import { useEffect, useState, ReactComponentElement } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchOutlined } from "@ant-design/icons";
import { Drawer } from "antd";

import { formatVariableValue, getValueFromHousehold } from "../api/variables";
import getPolicyOutputTree from "../pages/policy/output/tree";
import { copySearchParams } from "../api/call";
import SearchParamNavButton from "controls/SearchParamNavButton";
import HOUSEHOLD_OUTPUT_TREE from "../pages/household/output/tree";
import VariableSearch from "../pages/household/VariableSearch";
import { ParameterSearch } from "../pages/PolicyPage.jsx";
import PolicyRightSidebar from "../pages/policy/PolicyRightSidebar.jsx";

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

  const embed = searchParams.get("embed") !== null;
  if (type === "policy" && embed) {
    return mainContent;
  }

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
        gap: "5px",
      }}
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
        <MobileTreeNavigationHolder metadata={metadata} type={type} />
        <MobileBottomNavButtons focus={focus} type={type} metadata={metadata} />
        {type === "policy" && (
          <PolicyDrawerButton metadata={metadata} policy={policy} />
        )}
        <MenuOpenCloseButton
          isMenuOpen={isMenuOpen}
          handleMenuOpen={handleMenuOpen}
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
  if (type === "policy") {
    const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
    if (focus && focus.startsWith("policyOutput")) {
      currentNode = { children: POLICY_OUTPUT_TREE };
    } else {
      currentNode = { children: [metadata.parameterTree] };
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
        flexWrap: "wrap",
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
    options = HOUSEHOLD_OUTPUT_TREE[0].children;
  }
  if (type === "policy") {
    const POLICY_OUTPUT_TREE = getPolicyOutputTree(metadata.countryId);
    options = POLICY_OUTPUT_TREE[0].children;
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
        alignItems: "center",
        gap: "10px"
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

function MenuOpenCloseButton({ isMenuOpen, handleMenuOpen }) {
  return (
    <>
      <div
        style={{
          height: 60,
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
            fontSize: "30px"
          }}
        >
          {isMenuOpen ? "keyboard_arrow_down" : "keyboard_arrow_up"}
        </span>
      </div>
    </>
  );
}

function PolicyDrawerButton({ policy, metadata }) {
  const [isPolicyDrawerOpen, setIsPolicyDrawerOpen] = useState(false);

  function handleClick() {
    setIsPolicyDrawerOpen((prev) => !prev);
  }

  return (
    <>
      <div
        style={{
          height: 60,
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
    isMenuOpen,
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
        focus: "policyOutput",
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
