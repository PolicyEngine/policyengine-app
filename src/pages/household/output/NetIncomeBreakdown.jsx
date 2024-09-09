import {
  CaretDownFilled,
  CaretUpFilled,
  PlusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tooltip, Modal, Button } from "antd";
import { useState } from "react";
import { getParameterAtInstant } from "../../../api/parameters";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../../api/variables";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";
import useDisplayCategory from "../../../hooks/useDisplayCategory";
import { Helmet } from "react-helmet";
import React from "react";

const UpArrow = () => (
  <CaretUpFilled
    style={{
      color: style.colors.BLUE,
      display: "inline-flex",
      alignItems: "center",
    }}
  />
);
const DownArrow = () => (
  <CaretDownFilled
    style={{
      color: style.colors.DARK_GRAY,
      display: "inline-flex",
      alignItems: "center",
    }}
  />
);

// The arrows are used to differentiate increases or decreases
// to net income for colorblind users.
const nodeArrow = (nodeSign) => (nodeSign ? <UpArrow /> : <DownArrow />);
const nodeColor = (nodeSign) =>
  nodeSign ? style.colors.BLUE : style.colors.DARK_GRAY;
const nodeStyle = (nodeSign) => ({
  color: nodeColor(nodeSign),
  alignItems: "center",
  display: "inline-flex",
});

function VariableArithmetic(props) {
  const {
    variableName,
    householdBaseline,
    householdReform,
    isAdd,
    metadata,
    defaultExpanded,
    childrenOnly,
    forceShowChildValuesIfZero,
    year,
  } = props;

  let nodeSign = isAdd;
  const value = getValueFromHousehold(
    variableName,
    null,
    null,
    householdBaseline,
    metadata,
  );
  let valueStr;
  let shouldShowVariable;
  const hasReform = householdReform !== null;
  const variable = metadata.variables[variableName];
  const displayCategory = useDisplayCategory();

  let doesIncomeChange = false;
  if (hasReform) {
    // Write the result in the form: £y (+£(y-x))
    const reformValue = getValueFromHousehold(
      variableName,
      null,
      null,
      householdReform,
      metadata,
    );
    const diff = reformValue - value;
    doesIncomeChange = diff !== 0;
    // When not calculating reforms,
    // every node is either just
    // adding or subtracting from their
    // parent. Tax credits subtract
    // from their tax parents for example.
    // The sign of the node is synonymous
    // with whether it's an addition
    // or subtraction in the variable
    // arithmetic.
    // However, once we start applying
    // reforms then the sign is also influenced
    // by whether the reform is increasing
    // or decreasing its value.
    if (!childrenOnly) nodeSign ^= diff < 0;
    valueStr =
      diff > 0 ? (
        <>
          Your {variable.label} rise{variable.label.endsWith("s") ? "" : "s"}{" "}
          by&nbsp;
          {nodeArrow(nodeSign)}&nbsp;
          <span style={nodeStyle(nodeSign)}>
            {formatVariableValue(variable, diff, 0)}
          </span>
        </>
      ) : diff < 0 ? (
        <>
          Your {variable.label} fall{variable.label.endsWith("s") ? "" : "s"}{" "}
          by&nbsp;
          {nodeArrow(nodeSign)}&nbsp;
          <span style={nodeStyle(nodeSign)}>
            {formatVariableValue(variable, -diff, 0)}
          </span>
        </>
      ) : (
        `Your ${variable.label} ${
          variable.label.endsWith("s") ? "don't" : "doesn't"
        } change`
      );
    shouldShowVariable = (variableName) => {
      const isNonZeroInBaseline =
        getValueFromHousehold(
          variableName,
          null,
          null,
          householdBaseline,
          metadata,
        ) !== 0;
      const isNonZeroInReform =
        getValueFromHousehold(
          variableName,
          null,
          null,
          householdReform,
          metadata,
        ) !== 0;
      return (
        isNonZeroInBaseline || isNonZeroInReform || forceShowChildValuesIfZero
      );
    };
  } else {
    valueStr = (
      <>
        {`Your ${variable.label} ${
          variable.label.endsWith("s") ? "are" : "is"
        }`}
        &nbsp;
        {nodeArrow(nodeSign)}&nbsp;
        <span
          style={{
            color: nodeColor(nodeSign),
          }}
        >
          {formatVariableValue(variable, value, 0)}
        </span>
      </>
    );
    shouldShowVariable = (variableName) => {
      return (
        getValueFromHousehold(
          variableName,
          null,
          null,
          householdBaseline,
          metadata,
        ) !== 0 || forceShowChildValuesIfZero
      );
    };
  }

  const [expanded, setExpanded] = useState(defaultExpanded);
  let adds = variable.adds || [];
  // Check if 'adds' is a string
  if (typeof adds === "string") {
    // adds is a parameter name (e.g. income.tax.groups). Find its value
    const parameter = metadata.parameters[adds];
    adds = getParameterAtInstant(parameter, `${year}-01-01`);
  }
  let subtracts = variable.subtracts || [];
  // Check if 'subtracts' is a string
  if (typeof subtracts === "string") {
    // subtracts is a parameter name (e.g. income.tax.groups). Find its value
    const parameter = metadata.parameters[subtracts];
    subtracts = getParameterAtInstant(parameter, `${year}-01-01`);
  }
  const childAddNodes = adds.filter(shouldShowVariable).map((variable) => (
    <VariableArithmetic
      variableName={variable}
      householdBaseline={householdBaseline}
      householdReform={householdReform}
      metadata={metadata}
      key={variable}
      year={year}
      // Every node increases (positive),
      // decreases (negative), or does nothing
      // to income (neutral).
      // Neutral nodes do not have children.
      // Child nodes are influenced by their parents
      // unless they are direct children of the root.
      // Children of a positive parent keep their sign,
      // and children of a negative parent are flipped.
      isAdd={childrenOnly || isAdd}
    />
  ));
  const childSubtractNodes = subtracts
    .filter(shouldShowVariable)
    .map((variable) => (
      <VariableArithmetic
        year={year}
        variableName={variable}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        metadata={metadata}
        isAdd={!(childrenOnly || isAdd)}
        key={variable}
      />
    ));
  const childNodes = childAddNodes.concat(childSubtractNodes);
  const expandable =
    (!hasReform || doesIncomeChange) &&
    adds.length + subtracts.length > 0 &&
    childNodes.length > 0;

  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (childrenOnly) {
    return (
      <div
        style={{
          margin: 10,
          marginBottom: 0,
          padding: 10,
          paddingBottom: 0,
          borderLeftWidth: 2,
          borderLeftStyle: "solid",
          borderLeftColor: nodeColor(nodeSign),
        }}
      >
        {childNodes}
      </div>
    );
  }
  return (
    <div
      style={{
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          cursor: expandable ? "pointer" : "default",
        }}
        onClick={() => {
          if (expandable) {
            setExpanded(!expanded);
          }
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Tooltip
            id="documentation"
            title={variable.documentation}
            overlayStyle={variable.documentation ? {} : { display: "none" }}
            overlayInnerStyle={{ backgroundColor: style.colors.BLUE }}
          >
            <h2
              aria-describedby="documentation"
              style={{
                display: "inline-flex",
                fontSize: displayCategory === "mobile" ? 18 : 22,
                margin: 0,
              }}
            >
              {valueStr}
            </h2>
          </Tooltip>

          {expandable && (
            <PlusCircleOutlined
              style={{
                fontSize: 14,
                marginLeft: 10,
                color: style.colors.DARK_GRAY,
                transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          )}

          {!expandable && (
            <div
              style={{
                position: "relative",
                marginLeft: "8px",
              }}
              className="info-icon-wrapper"
            >
              <InfoCircleOutlined
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  color: style.colors.DARK_GRAY,
                  cursor: "pointer", // Pointer cursor to indicate it's interactable
                }}
              />
              <Button
                style={{
                  position: "absolute",
                  top: "100%", // Position below the icon
                  left: 0,
                  padding: "5px 10px",
                  borderWidth: 1,
                  borderColor: nodeColor(nodeSign),
                  cursor: "pointer",
                  zIndex: 1, // Ensure the button appears above other content
                }}
                className="explain-ai-button"
                onClick={showModal} // Show modal when button is clicked
              >
                Explain with AI
              </Button>
            </div>
          )}
        </div>
      </div>
      {expanded && (
        <div
          style={{
            margin: 10,
            marginBottom: 0,
            padding: 10,
            paddingBottom: 0,
            borderLeftWidth: 2,
            borderLeftStyle: "solid",
            borderLeftColor: nodeColor(nodeSign),
          }}
        >
          {childNodes}
        </div>
      )}
      <Modal
        title="Explanation"
        visible={isModalVisible}
        onCancel={handleCancel} // Hide the modal on cancel/close
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p>
          <strong>Earned Income Tax Credit (EITC):</strong> The EITC is a
          refundable tax credit for low to moderate-income working individuals
          and families in the United States. In this simulation, the EITC amount
          is <strong>$6,960</strong>.
        </p>

        <h4>Main factors leading to this result:</h4>
        <ul>
          <li>The household has 2 qualifying children</li>
          <li>The filer&apos;s adjusted earnings are $20,000</li>
          <li>The filer is eligible for the EITC</li>
        </ul>

        <h4>Key thresholds and rules:</h4>
        <ul>
          <li>
            The maximum EITC for a family with 2 children in 2024 is{" "}
            <strong>$6,960</strong>
          </li>
          <li>
            The phase-in rate for 2 children is <strong>40%</strong>
          </li>
          <li>
            The phase-out starts at <strong>$22,720</strong> for single filers
            with 2 children
          </li>
        </ul>

        <p>
          In this case, the filer&apos;s income of <strong>$20,000</strong> is
          high enough to receive the maximum EITC but not high enough to trigger
          the phase-out. The credit is fully phased in (40% * $20,000 = $8,000,
          which exceeds the maximum of $6,960).
        </p>

        <h4>Changes that could affect this result:</h4>
        <ul>
          <li>
            <strong>Higher income:</strong> If the filer&apos;s income exceeded{" "}
            <strong>$22,720</strong>, the credit would start to phase out
          </li>
          <li>
            <strong>Fewer children:</strong> This would lower the maximum credit
            and change phase-in/out rates
          </li>
          <li>
            <strong>Filing jointly:</strong> This would increase the phase-out
            threshold, potentially allowing a higher income before reduction
          </li>
        </ul>
      </Modal>
    </div>
  );
}

export default function NetIncomeBreakdown(props) {
  const { metadata, householdBaseline, householdReform, policyLabel, year } =
    props;
  const hasReform = !!householdReform;
  const getValue = (variable) =>
    getValueFromHousehold(variable, null, null, householdBaseline, metadata);
  const getReformValue = (variable) =>
    getValueFromHousehold(variable, null, null, householdReform, metadata);
  const getValueStr = (variable) =>
    formatVariableValue(metadata.variables[variable], getValue(variable), 0);

  let title;

  let isAdd = true;
  if (hasReform) {
    const difference =
      getReformValue("household_net_income") - getValue("household_net_income");
    if (Math.abs(difference) < 0.01) {
      title = <>{policyLabel} doesn&apos;t change your net income</>;
    } else {
      isAdd = difference > 0;
      title = (
        <>
          {policyLabel} {isAdd ? "increases" : "decreases"} your net income
          by&nbsp;
          {nodeArrow(isAdd)}&nbsp;
          <span style={nodeStyle(isAdd)}>
            {formatVariableValue(
              metadata.variables.household_net_income,
              Math.abs(difference),
              0,
            )}
          </span>
        </>
      );
    }
  } else {
    title = <>Your net income is {getValueStr("household_net_income")}</>;
  }

  return (
    <>
      <Helmet>
        <title>{`${policyLabel} | Household net income | PolicyEngine`}</title>
      </Helmet>
      <ResultsPanel
        title={title}
        description="Here's how we calculated your household's net income. Click on a section to see the breakdown. Hover to see more details."
      >
        <div style={{ height: 10 }} />
        <VariableArithmetic
          year={year}
          variableName="household_net_income"
          householdBaseline={householdBaseline}
          householdReform={householdReform}
          metadata={metadata}
          isAdd
          defaultExpanded={true}
          forceShowChildValuesIfZero={true}
          childrenOnly
        />
      </ResultsPanel>
    </>
  );
}
