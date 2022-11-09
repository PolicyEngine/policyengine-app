import { useContext } from "react";
import PolicyEngineContext from "../../countries/PolicyEngine";
import RadioButton from "./RadioButton";

function getChildCount(householdData, country) {
    if (country === "uk") {
        return getUKChildCount(householdData);
    } else if (country === "us") {
        return getUSChildCount(householdData);
    }
}

function getUKChildCount(householdData) {
    return Object.keys(householdData.people).filter(
        (personId) => {
            return householdData.people[personId].age[2022] < 18;
        }
    ).length;
}

function getUSChildCount(householdData) {
    return; // TODO
}

function setChildCount(householdData, childCount, country, variables) {
    let newHouseholdData = JSON.parse(JSON.stringify(householdData));
    // While the number of children is too high, remove a child.
    while (getChildCount(newHouseholdData, country) > childCount) {
      newHouseholdData = removeChild(newHouseholdData, country);
    }
    // While the number of children is too low, add a child.
    while (getChildCount(newHouseholdData, country) < childCount) {
      newHouseholdData = addChild(newHouseholdData, country, variables);
    }
    return newHouseholdData;
}

function addChild(householdData, country, variables) {
    if (country === "uk") {
        return addUKChild(householdData, variables);
    } else if (country === "us") {
        return addUSChild(householdData, variables);
    }
}

function removeChild(householdData, country) {
    if (country === "uk") {
        return removeUKChild(householdData);
    } else if (country === "us") {
        return removeUSChild(householdData);
    }
}

function addUKChild(householdData, variables) {
  const newHouseholdData = JSON.parse(JSON.stringify(householdData));
  let newChild = {};
  const inputVariables = Object.values(variables).filter((variable) => (
    (variable.isInputVariable)
    && (variable.definitionPeriod == "year")
    && (["float", "int"].includes(variable.valueType))
    && (variable.entity == "person")
  ));
  const outputVariables = Object.values(variables).filter((variable) => (
    (!variable.isInputVariable)
    && (variable.definitionPeriod == "year")
    && (["float", "int"].includes(variable.valueType))
    && (variable.entity == "person")
  ));

  for (let variable of inputVariables) {
    newChild[variable.name] = { 2022: variable.defaultValue };
  }
  for (let variable of outputVariables) {
    newChild[variable.name] = { 2022: null };
  }
  newChild.age = {2022: 10};
  const numberOfChildren = getChildCount(householdData, "uk");
  // Name the new child "Your first child", "Your second child", etc.
  const childName = `Your ${
    ["first", "second", "third", "fourth", "fifth"][numberOfChildren]
  } child`;
  newHouseholdData.people[childName] = newChild;
  newHouseholdData.benunits["Your benefit unit"].members.push(childName);
  newHouseholdData.households["Your household"].members.push(childName);
  return newHouseholdData;
}

function removeUKChild(householdData) {
  const newHouseholdData = JSON.parse(JSON.stringify(householdData));
  const numberOfChildren = getChildCount(householdData, "uk");
  const childName = `Your ${
    ["first", "second", "third", "fourth", "fifth"][numberOfChildren - 1]
  } child`;
  delete newHouseholdData.people[childName];
  newHouseholdData.benunits["Your benefit unit"].members =
    newHouseholdData.benunits["Your benefit unit"].members.filter((member) => {
      return member !== childName;
    });
  newHouseholdData.households["Your household"].members =
    newHouseholdData.households["Your household"].members.filter((member) => {
      return member !== childName;
    });
  return newHouseholdData;
}

function addUSChild(householdData, variables) {
  return; // TODO
}

function removeUSChild(householdData) {
  return; // TODO
}


export default function ChildCountInput(props) {
  const PolicyEngine = useContext(PolicyEngineContext);
  return (
    <RadioButton
        selected={getChildCount(PolicyEngine.household.household, PolicyEngine.country)}
        onSelect={(children) => {
            PolicyEngine.setHouseholdData(setChildCount(PolicyEngine.household.household, children, PolicyEngine.country, PolicyEngine.variables))
        }}
        title="How many children do you have?"
        keys={[0, 1, 2, 3]}
        labels={["None", "1", "2", "3"]}
    />
  );
}
