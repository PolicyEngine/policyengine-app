import { useState } from "react";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../../api/variables";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";

function VariableArithmetic(props) {
  const {
    variableName,
    household,
    metadata,
    inverted,
    defaultExpanded,
    childrenOnly,
  } = props;
  const value = getValueFromHousehold(
    variableName,
    null,
    null,
    household.baseline,
    metadata
  );
  let valueStr;
  let shouldShowVariable;
  const hasReform = household.reform !== null;
  const variable = metadata.variables[variableName];
  if (hasReform) {
    // Write the result in the form: £y (+£(y-x))
    const reformValue = getValueFromHousehold(
      variableName,
      null,
      null,
      household.reform,
      metadata
    );
    const diff = reformValue - value;
    valueStr =
      diff > 0
        ? `Your ${variable.label} rise${
            variable.label.endsWith("s") ? "" : "s"
          } by ${formatVariableValue(variable, diff, 0)}`
        : diff < 0
        ? `Your ${variable.label} fall${
            variable.label.endsWith("s") ? "" : "s"
          } by ${formatVariableValue(variable, -diff, 0)}`
        : `Your ${variable.label} ${variable.label.endsWith('s') ? 'don\'t' : 'doesn\'t'} change`;
    shouldShowVariable = (variableName) => {
      const isNonZeroInBaseline =
        getValueFromHousehold(
          variableName,
          null,
          null,
          household.baseline,
          metadata
        ) !== 0;
      const isNonZeroInReform =
        getValueFromHousehold(
          variableName,
          null,
          null,
          household.reform,
          metadata
        ) !== 0;
      return isNonZeroInBaseline || isNonZeroInReform;
    };
  } else {
    valueStr = `Your ${variable.label} ${
      variable.label.endsWith("s") ? "are" : "is"
    } ${formatVariableValue(variable, value, 0)}`;
    shouldShowVariable = (variableName) => {
      return (
        getValueFromHousehold(
          variableName,
          null,
          null,
          household.baseline,
          metadata
        ) !== 0
      );
    };
  }

  const [expanded, setExpanded] = useState(defaultExpanded);
  const adds = variable.adds || [];
  const subtracts = variable.subtracts || [];
  const expandable = adds.length + subtracts.length > 0;
  const childAddNodes = adds
    .filter(shouldShowVariable)
    .map((variable) => (
      <VariableArithmetic
        variableName={variable}
        household={household}
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
        household={household}
        metadata={metadata}
        inverted={!inverted}
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
          borderLeftColor: style.colors.DARK_GRAY,
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
        <h2 style={{ display: "flex", fontSize: 22 }}>{valueStr}</h2>
        {variable.documentation ? <h5 style={{fontSize: 18}}>{variable.documentation}</h5> : null}
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
            borderLeftColor: style.colors.DARK_GRAY,
          }}
        >
          {childNodes}
        </div>
      )}
    </div>
  );
}

export default function NetIncomeBreakdown(props) {
  const { metadata, household, policyLabel } = props;
  const hasReform = household.reform !== null;
  const getValue = (variable) =>
    getValueFromHousehold(variable, null, null, household.baseline, metadata);
  const getReformValue = (variable) =>
    getValueFromHousehold(variable, null, null, household.reform, metadata);
  const getValueStr = (variable) =>
    formatVariableValue(metadata.variables[variable], getValue(variable), 0);

  let title;

  if (hasReform) {
    const difference =
      getReformValue("household_net_income") - getValue("household_net_income");
    if (Math.abs(difference) < 0.01) {
      title = `${policyLabel} doesn't change your net income`;
    } else {
      title = `${policyLabel} ${
        difference > 0 ? "increases" : "decreases"
      } your net income by ${formatVariableValue(
        metadata.variables.household_net_income,
        Math.abs(difference),
        0
      )}`;
    }
  } else {
    title = `Your net income is ${getValueStr("household_net_income")}`;
  }

  return (
    <ResultsPanel
      title={title}
      description="Here's how we calculated your household's net income. Click on a section to see more details."
    >
      <div style={{ height: 10 }} />
      <VariableArithmetic
        variableName="household_net_income"
        household={household}
        metadata={metadata}
        defaultExpanded={true}
        childrenOnly
      />
    </ResultsPanel>
  );
}
