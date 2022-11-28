import { useState } from "react";
import {
  formatVariableValue,
  getValueFromHousehold,
} from "../../../api/variables";
import ResultsPanel from "../../../layout/ResultsPanel";
import style from "../../../style";

function VariableArithmetic(props) {
  const { variableName, household, metadata, inverted, defaultExpanded } =
    props;
  const value =
    (inverted ? -1 : 1) *
    getValueFromHousehold(
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
    const reformValue =
      (inverted ? -1 : 1) *
      getValueFromHousehold(
        variableName,
        null,
        null,
        household.reform,
        metadata
      );
    const diff = reformValue - value;
    valueStr = diff > 0 ?
        `Your ${variable.label} rises by ${formatVariableValue(variable, diff, 0)}` :
        diff < 0 ?
          `Your ${variable.label} falls by ${formatVariableValue(variable, -diff, 0)}` :
          `Your ${variable.label} doesn't change`;
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
    valueStr = `Your ${variable.label} ${variable.label.endsWith("s") ? "are" : "is"} ${formatVariableValue(variable, Math.abs(value), 0)}`;
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
        <h2 style={{display: "flex"}}>
          {valueStr}
        </h2>
        <h5>{variable.documentation}</h5>
      </div>
      {expanded && (
        <div
          style={{
            margin: 20,
            marginBottom: 0,
            padding: 20,
            paddingBottom: 0,
            borderLeftWidth: 2,
            borderLeftStyle: "solid",
            borderLeftColor: style.colors.DARK_GRAY,
          }}
        >
          {adds.filter(shouldShowVariable).map((variable) => (
            <VariableArithmetic
              variableName={variable}
              household={household}
              metadata={metadata}
              key={variable}
              inverted={inverted}
            />
          ))}
          {subtracts.filter(shouldShowVariable).map((variable) => (
            <VariableArithmetic
              variableName={variable}
              household={household}
              metadata={metadata}
              inverted={!inverted}
              key={variable}
            />
          ))}
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
      <VariableArithmetic
        variableName="household_net_income"
        household={household}
        metadata={metadata}
        defaultExpanded={true}
      />
    </ResultsPanel>
  );
}
