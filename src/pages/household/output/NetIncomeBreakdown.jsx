import {
  CaretDownFilled,
  CaretUpFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import { getParameterAtInstant } from "../../../api/parameters";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../../api/variables";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";

const UpArrow = () => <CaretUpFilled style={{ color: style.colors.GREEN }} />;

const DownArrow = () => (
  <CaretDownFilled style={{ color: style.colors.DARK_RED }} />
);

// The arrows are used to differentiate increases or decreases
// to net income for colorblind users.
const labelArrow = (isAdd) => (isAdd ? <UpArrow /> : <DownArrow />);
const labelDownArrow = (isAdd) => (isAdd ? <DownArrow /> : <UpArrow />);
const labelColor = (isAdd) =>
  isAdd ? style.colors.GREEN : style.colors.DARK_RED;
const labelSubColor = (isAdd) =>
  isAdd ? style.colors.DARK_RED : style.colors.GREEN;
const labelAddStyle = (isAdd) => {
  return {
    color: labelColor(isAdd),
  };
};
const labelSubStyle = (isAdd) => {
  return {
    color: labelSubColor(isAdd),
  };
};

function VariableArithmetic(props) {
  const {
    variableName,
    householdBaseline,
    householdReform,
    inverted,
    metadata,
    defaultExpanded,
    childrenOnly,
  } = props;
  let isAdd = inverted;
  const value = getValueFromHousehold(
    variableName,
    null,
    null,
    householdBaseline,
    metadata
  );
  let valueStr;
  let shouldShowVariable;
  const hasReform = householdReform !== null;
  const variable = metadata.variables[variableName];

  let doesIncomeChange = false;
  if (hasReform) {
    // Write the result in the form: £y (+£(y-x))
    const reformValue = getValueFromHousehold(
      variableName,
      null,
      null,
      householdReform,
      metadata
    );
    const diff = reformValue - value;
    doesIncomeChange = diff != 0;
    valueStr =
      diff > 0 ? (
        <>
          Your {variable.label} rise{variable.label.endsWith("s") ? "" : "s"}{" "}
          by&nbsp;
          {labelArrow(isAdd)}&nbsp;
          <span style={labelAddStyle(isAdd)}>
            {formatVariableValue(variable, diff, 0)}
          </span>
        </>
      ) : diff < 0 ? (
        <>
          Your {variable.label} fall{variable.label.endsWith("s") ? "" : "s"}{" "}
          by&nbsp;
          {labelDownArrow(isAdd)}&nbsp;
          <span style={labelSubStyle(isAdd)}>
            {formatVariableValue(variable, -diff, 0)}
          </span>
        </>
      ) : (
        `Your ${variable.label} ${
          variable.label.endsWith("s") ? "don't" : "doesn't"
        } change`
      );
    if (!childrenOnly) isAdd ^= diff < 0;
    shouldShowVariable = (variableName) => {
      const isNonZeroInBaseline =
        getValueFromHousehold(
          variableName,
          null,
          null,
          householdBaseline,
          metadata
        ) !== 0;
      const isNonZeroInReform =
        getValueFromHousehold(
          variableName,
          null,
          null,
          householdReform,
          metadata
        ) !== 0;
      return isNonZeroInBaseline || isNonZeroInReform;
    };
  } else {
    valueStr = (
      <>
        {`Your ${variable.label} ${
          variable.label.endsWith("s") ? "are" : "is"
        }`}
        &nbsp;
        {labelArrow(isAdd)}&nbsp;
        <span
          style={{
            color: labelColor(isAdd),
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
          metadata
        ) !== 0
      );
    };
  }

  const [expanded, setExpanded] = useState(defaultExpanded);
  let adds = variable.adds || [];
  // Check if 'adds' is a string
  if (typeof adds === "string") {
    // adds is a parameter name (e.g. income.tax.groups). Find its value
    const parameter = metadata.parameters[adds];
    adds = getParameterAtInstant(parameter, "2023-01-01");
  }
  let subtracts = variable.subtracts || [];
  // Check if 'subtracts' is a string
  if (typeof subtracts === "string") {
    // subtracts is a parameter name (e.g. income.tax.groups). Find its value
    const parameter = metadata.parameters[subtracts];
    subtracts = getParameterAtInstant(parameter, "2023-01-01");
  }
  const expandable = doesIncomeChange && adds.length + subtracts.length > 0;
  const childAddNodes = adds
    .filter(shouldShowVariable)
    .map((variable) => (
      <VariableArithmetic
        variableName={variable}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        metadata={metadata}
        key={variable}
        inverted={inverted}
      />
    ));
  const childSubtractNodes = subtracts
    .filter(shouldShowVariable)
    .map((variable) => (
      <VariableArithmetic
        variableName={variable}
        householdBaseline={householdBaseline}
        householdReform={householdReform}
        metadata={metadata}
        // This is a hard condition to write
        // simply. Do a logic table to convince
        // yourself of its correctness.
        inverted={!(childrenOnly || inverted)}
        key={variable}
      />
    ));
  const childNodes = childAddNodes.concat(childSubtractNodes);

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
          borderLeftColor: labelColor(isAdd),
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
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <Tooltip
            title={variable.documentation}
            overlayStyle={variable.documentation ? {} : { display: "none" }}
            overlayInnerStyle={{ backgroundColor: style.colors.BLUE }}
          >
            <h2 style={{ display: "flex", fontSize: 22, margin: 0 }}>
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
            borderLeftColor: labelColor(isAdd),
          }}
        >
          {childNodes}
        </div>
      )}
    </div>
  );
}

export default function NetIncomeBreakdown(props) {
  const { metadata, householdBaseline, householdReform, policyLabel } = props;
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
          {labelArrow(isAdd)}&nbsp;
          <span style={{ color: labelColor(isAdd) }}>
            {formatVariableValue(
              metadata.variables.household_net_income,
              Math.abs(difference),
              0
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
      <ResultsPanel
        title={title}
        description="Here's how we calculated your household's net income. Click on a section to see the breakdown. Hover to see more details."
      >
        <div style={{ height: 10 }} />
        <VariableArithmetic
          variableName="household_net_income"
          householdBaseline={householdBaseline}
          householdReform={householdReform}
          metadata={metadata}
          inverted={isAdd}
          defaultExpanded={true}
          childrenOnly
        />
      </ResultsPanel>
    </>
  );
}
